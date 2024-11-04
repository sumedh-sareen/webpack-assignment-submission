# webpack-assignment-submission
# Project - Webpack - Evaluate New Article with NLP

The following application uses MeaningCloud Natural Language Processing API to analyse the sentiment provided in the text in the text field, or the URL of the article supplied to it and shows it on the webpage. 

Webpack was used to configure the development and production environment, with their separate configurations (dev-server for development, and service workers for production, as an example).


Some key packages used:
- Webpack
- Jest for testing
- Google Workbox for serving the page offline 
- Sass for convenient styling
- Express for locally hosting the backend and handling the API key
- .env for securely handling the API key 
- clean webpack plugin for hot reload during dev work 
- Other plugins and loaders to ensure proper transpiling of code that runs in any browser

## Running the application
1. Running the dev environment:
<code>npm run build-dev</code>
2. Running the production environment:
<code>npm run build-prod</code>
