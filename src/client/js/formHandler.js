async function handleSubmit(event) {
    event.preventDefault()

    let formText = document.getElementById('sentiment').value

    if(formText=='') { // only give results for non-empty text fields
        alert("Error: Please enter a valid text")
    } else {

        Client.checkForName(formText)

        // create space for data to be printed
        const results =  document.getElementById('results')
        for (let index = 0; index < 5; index++) {
            const spanForData = document.createElement('span');
            results.appendChild(spanForData);
            results.children[index].id = 'result-span-' + index;
        }
        console.log(results);
    
    
        // js object that will be sent as json to the server
        const dataToBeSent = {text:formText};
    
        console.log("::: Form Submitted :::")
        const requestOptions = {
            method: 'POST',
            mode: 'cors',
            credentials: 'same-origin', // since sending to the local server first
            headers: {
                'Content-Type': 'application/json',
            }, 
            body: JSON.stringify(dataToBeSent) // matching the content-type header (converting to json before sending)
        }
        // this needs to be a post request where we send the text to be analysed
        const serverResponse = await fetch('http://localhost:8080/receiveSentiment', requestOptions)
        try {
            const response = await serverResponse.json();
            console.log(response);
            
            document.getElementById('result-span-0').innerHTML = 'Polarity: ' + response.polarity;
            document.getElementById('result-span-1').innerHTML = 'Agreement: ' + response.agreement;
            document.getElementById('result-span-2').innerHTML = 'Subjectivity: ' + response.subjectivity;
            document.getElementById('result-span-3').innerHTML = 'Confidence: ' + response.confidence;
            document.getElementById('result-span-4').innerHTML = 'Irony: ' + response.irony;
    
            return response;
        }
        catch(error) {
            console.log("error", error);    
        }
    }

   }

export { handleSubmit } // source file being exported, so it can be added to client/index.js to build the dependency tree
