# DripCheck
DripCheck was our submission for nwHacks2024!
## Inspiration
With recent erratic Vancouver weather, people have been struggling to dress for the weather while still being able to express themselves through their own personal styles. Between checking our weather apps and staring at our closets every single morning, finding the right drip is draining people's time. That is why we created DripCheck - to solve chronic indecision and to help people's styles shine regardless of the weather.
## What it does
DripCheck is a web app that uses ChatGPT 3.5 and DALL·E 3 to generate the perfect outfit recommendation given the user's preferences and location and weather data.
Once you open the web app, select either your current location or the location of where you're going that day. Then type in an optional prompt to give your outfit some personal flare. After hitting "Get My Drip", DripCheck will generate an image of your outfit via ChatGPT and DALL·E 3.
## How we built it
We first implemented React's geolocation library to get the user's current latitude and longitude. We then passed the location data to the Open Weather API, which gets the current weather conditions at the given location. We then concatenated the weather data with the user's text input and some metadata to create a single string prompt that would be passed to ChatGPT.

After some discussion with William, a nwHacks mentor, we decided to create a backend server from which to call the ChatGPT and DALL·E 3 APIs in order to keep our api keys safe. We did so by utilizing ExpressJS to handle requests for our api endpoints. As a result, we were able to get outfit recommendations from ChatGPT. Subsequently, we passed those recommendations into DALL·E 3 to generate images of them, which we sent to the frontend via image urls in json form.

The front end was entirely created using React, HTML, and CSS.
## Challenges we ran into
- All of us were quite new to React, so we had to learn a lot to create our frontend
- With so many API calls, we struggled with managing api keys and waiting for asynchronous calls
- We weren't expecting to need an express server, so quickly coding one up was also a challenge
- The Google Maps API was particularly difficult to use and integrate with the rest of our app
## Accomplishments that we're proud of
- Creating an intuitive and aesthetic frontend using React
- Creating a working backend Express server to protect our api keys
- Dealing with multiple API interactions and asynchronous calls
- Successfully building and implementing the Google Maps API
## What we learned
- How to use React and Express
- How to force many asynchronous API calls to behave synchronously
- The importance of protecting your api keys
## What's next for DripCheck
- Faster loading time
- Implementation of future weather forecast and outfit looks
- Converting latitude and longitude into an address using the Google Maps Places API for more user readability
- Adding the ability to save past outfits, potentially using a database

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `node backend/server.js`

Runs the backend server.
