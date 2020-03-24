# Project Description
A travel application, that includes a simple form where you enter the location you are traveling to and the date with the time you are leaving. If the trip is within a week, you will get the current weather forecast. If the trip is in the future, you will get a predicted forecast.

## Other Features


# Project Instructions
- `npm run dev` or `yarn dev`: to run development mode
- `npm run prod` or `yarn prod`: to build the production version of the project
- `npm run start` or `yarn start`: to run the express server
- `npm run test` or `yarn start`: to test the project functionallities

## Getting started
- execute the command: `npm install` to install the required packages.

## Setting up the API

### Step 1: Signup for the APIs keys
First, you will need to go [here](https://developer.aylien.com/signup). Signing up will get you an API key. Don't worry, at the time of this course, the API is free to use up to 1000 requests per day or 333 intensive requests. It is free to check how many requests you have remaining for the day.

### Step 2: Environment Variables
Next we need to declare our API keys, which will look something like this:
```
// set aylien API credentias
var textapi = new aylien({
  application_id: "your-api-id",
  application_key: "your-key"
});
```
- [ ] Create a new ```.env``` file in the root of the project
- [ ] Fill the .env file with your API keys like this:
```
API_ID=**************************
API_KEY=**************************
```