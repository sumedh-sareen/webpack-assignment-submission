var path = require('path')
const express = require('express')
// enable environment variables below
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const bodyParser = require('body-parser')


// const mockAPIResponse = require('./mockAPI.js');

const app = express()

app.use(express.static('dist'))
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false })); // using body-parser as middleware for post requests
app.use(bodyParser.json()); // only looks at json content types

console.log(__dirname)

// helper function for the post request 
const sendToSentiment = async (url = '', postData = {}) => {
    const params = new URLSearchParams(postData);

    const postReq = await fetch(url,  {
        method: 'POST',
        redirect: 'follow',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${postData.key}`
        }, 
        // body: JSON.stringify(postData) // matching the content-type header (converting to json before sending)
        body: params.toString() // Convert postData to form-urlencoded

    })
    // console.log(postData);
    

    try {
        const postResponse = await postReq.json();
        console.log(postResponse);
        displayData = postResponse;
        
    }
    catch(error) {
        console.log("Error", error);
        
    }
}

let displayData = {};

app.get('/', function (req, res) {
    res.sendFile('dist/index.html') // to be compatible with the new distribution folder resultant index.html file
    // res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})


app.get('/test', function (req, res) {


    // only send response once received from the sentiment analysis API
    res.send("placeholder")
})

app.post('/receiveSentiment', async function(request, response) {
    
    const textValue = await request.body.text; // await request text from the client side
   
    // send bodyObject with API key to the sentiment analysis API
    sendToSentiment('https://api.meaningcloud.com/sentiment-2.1', {key: process.env.API_KEY, txt: textValue, lang: "en"})


    // only for testing for now. will be added a fetch request to the sentiment analysis api
    response.send({polarity: displayData.score_tag, agreement: displayData.agreement, subjectivity: displayData.subjectivity, confidence: displayData.confidence, irony: displayData.irony});
})



