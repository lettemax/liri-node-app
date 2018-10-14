
// Load the NPM Package inquirer
// var inquirer = require("inquirer");

// code to read and set any environment variables with the dotenv package
require("dotenv").config();

// import the keys.js file and store it in a variable
var keys = require("./keys.js");

// import spotify api
var Spotify = require('node-spotify-api');

// access spotify keys
var spotify = new Spotify({
    id: "309b33aec54045deb9a830b891adca2d",
    secret: "3d9b6092e10c4a44876880d718a96ab4"
});

// variable to store 3rd argument (api)
var command = process.argv[2];

// variable to store 4th argument (search parameter)
var search = process.argv[3];

// Include the request npm package (Don't forget to run "npm install request" in this folder first!)
var request = require("request");

// If the user searched for a concert 
if (command=="concert-this") {
    // Then run a request to the Bands in Town API with the artist specified
    request("https://rest.bandsintown.com/artists/"+search+"/events?app_id=codingbootcamp", function(error, response, body) {

        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {
            // Parse the body of the site and recover just the venue name
            // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
            console.log("The venue is: " + JSON.parse(body)[0].venue.name);
            // Parse the body of the site and recover just the venue location
            console.log("The venue is in: " + JSON.parse(body)[0].venue.city);
            // Parse the body of the site and recover just the date of the event
            console.log("The concert is on: " + JSON.parse(body)[0].datetime.split("T")[0]);
        } else if (error) {
            console.log("Error occurred: " + error);
        }
    });
} else if (command=="spotify-this-song") {
    spotify.search({ type: 'track', query: search }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        } else if (data.tracks.items[0]=="undefined") {
            // handle case that search has no results
            console.log("Artist: Ace of Base")
            console.log("Song: The Sign")
            console.log("Preview link: https://open.spotify.com/album/5UwIyIyFzkM7wKeGtRJPgB")
            console.log("Album: The Sign")
        }
    // log the artist name
    console.log("Artist: "+data.tracks.items[0].artists[0].name);
    // the song title
    console.log("Song: "+data.tracks.items[0].name);
    // the preview url
    console.log("Preview link: "+data.tracks.items[0].preview_url);
    // the album title
    console.log("Album: "+data.tracks.items[0].album.name);
    });

} else if (command=="movie-this") {
    // Then run a request to the Bands in Town API with the artist specified
    request("https://rest.bandsintown.com/artists/"+search+"/events?app_id=codingbootcamp", function(error, response, body) {

        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {
            // Parse the body of the site and recover just the imdbRating
            // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
            console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
        } else if (error) {
            console.log(error);
        }
    });

} else if (command=="do-what-it-says") {
    // Then run a request to the Bands in Town API with the artist specified
    request("https://rest.bandsintown.com/artists/"+search+"/events?app_id=codingbootcamp", function(error, response, body) {

        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {
            // Parse the body of the site and recover just the imdbRating
            // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
            console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
        } else if (error) {
            console.log(error);
        }
    });

}









