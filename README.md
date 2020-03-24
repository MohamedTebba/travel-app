# Project Description
A travel application, that includes a simple form where you enter the location you are traveling to and the date with the time you are leaving. If the trip is within a week, you will get the current weather forecast. If the trip is in the future, you will get a predicted forecast.

## Other Features
- Remove a trip.
- Local Storage is used to save data.
- Packing list for selected trip.
- Multiple trips can be added.
- Traditional signin and signup form.

# Project Instructions
- `npm run dev` or `yarn dev`: to run development mode
- `npm run prod` or `yarn prod`: to build the production version of the project
- `npm run start` or `yarn start`: to run the express server
- `npm run test` or `yarn start`: to test the project functionallities

## Getting started
- execute the command: `npm install` to install the required packages.

## Setting up the API

### Step 1: Signup for the APIs keys
First, you will need to go [here](http://www.geonames.org/export/web-services.html). Signing up will get you the Geonames API key which is a user name.
Second, you will need to go [here](https://darksky.net/dev). Signing up will get you an the Dark Sky API key.
Finaly, you will need to go [here](https://pixabay.com/api/docs/). Signing up will get you an the Pixabay API key.

### Step 2: Environment Variables
Next you need to declare your API keys, which will look something like this:
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
USER_NAME=*************************
DARKSKY_KEY=***********************
PIXABAY_KEY=***********************
```