
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

// fs is a core Node package for reading and writing files
var fs = require("fs");

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
            for (var i = 0; i<JSON.parse(body).length; i++) {
                console.log("The venue is: " + JSON.parse(body)[i].venue.name);
                // Parse the body of the site and recover just the venue location
                console.log("The venue is in: " + JSON.parse(body)[i].venue.city);
                // Parse the body of the site and recover just the date of the event
                console.log("The concert is on: " + JSON.parse(body)[i].datetime.split("T")[0]);
                // log a dashed line
                console.log("-----------");
                // Next, we store the text given to us from the query
                var text = "The venue is: " + JSON.parse(body)[i].venue.name + "\n"
                            + "The venue is in: " + JSON.parse(body)[i].venue.city + "\n"
                            + "The concert is on: " + JSON.parse(body)[i].datetime.split("T")[0] + "\n";

                // Next, we append the text into the "log.txt" file.
                // If the file didn't exist, then it gets created on the fly.
                fs.appendFile("log.txt", text, function(err) {

                // If an error was experienced we will log it.
                if (err) {
                    console.log(err);
                }

                // If no error is experienced, we'll log the phrase "Content Added" to our node console.
                else {
                    console.log("Content added to log.txt");
                }

                });
            }
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

        // Next, we store the text given to us from the query
        var text = "Artist: " + data.tracks.items[0].artists[0].name + "\n"
        + "Song: " + data.tracks.items[0].name + "\n"
        + "Preview link: " + data.tracks.items[0].preview_url + "\n"
        + "Album: " + data.tracks.items[0].album.name + "\n";

        // Next, we append the text into the "log.txt" file.
        // If the file didn't exist, then it gets created on the fly.
        fs.appendFile("log.txt", text, function(err) {

            // If an error was experienced we will log it.
            if (err) {
            console.log(err);
            }

            // If no error is experienced, we'll log the phrase "Content Added" to our node console.
            else {
            console.log("Content added to log.txt");
            }

        });
    });

} else if (command=="movie-this") {
    // Then run a request to the Bands in Town API with the artist specified
    request("http://www.omdbapi.com/?apikey=trilogy&t="+search, function(error, response, body) {

        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {
            // log the movie title
            console.log("Movie title: "+JSON.parse(body).Title);
            // the release year
            console.log("Released: "+JSON.parse(body).Year);
            // imdb rating
            console.log("IMDB rating: "+JSON.parse(body).imdbRating);
            // rotten tomatoes rating
            if (JSON.parse(body).Ratings[1]) {
                console.log("Rotten Tomatoes: "+JSON.parse(body).Ratings[1].Value);
            } else {
                console.log("Rotten Tomatoes rating unavailable");
            }
            // country of production
            console.log("Produced in: "+JSON.parse(body).Country);
            // language of movie
            console.log("Language: "+JSON.parse(body).Language);
            // plot description
            console.log("Plot: "+JSON.parse(body).Plot);
            // actors
            console.log("Actors: "+JSON.parse(body).Actors);

            // Next, we store the text given to us from the query
            // rotten tomatoes rating
            if (JSON.parse(body).Ratings[1]) {
                var text = "Movie title: " + JSON.parse(body).Title + "\n"
                        + "Released: " + JSON.parse(body).Year + "\n"
                        + "IMDB rating: " + JSON.parse(body).imdbRating + "\n"
                        + "Rotten Tomatoes: " + JSON.parse(body).Ratings[1].Value + "\n";
                        + "Produced in: " + JSON.parse(body).Country + "\n"
                        + "Language: " + JSON.parse(body).Language + "\n"
                        + "Plot: " + JSON.parse(body).Plot + "\n"
                        + "Actors: " + JSON.parse(body).Actors + "\n";
            } else {
                var text = "Movie title: " + JSON.parse(body).Title + "\n"
                + "Released: " + JSON.parse(body).Year + "\n"
                + "IMDB rating: " + JSON.parse(body).imdbRating + "\n"
                + "Rotten Tomatoes rating unavailable" + "\n";
                + "Produced in: " + JSON.parse(body).Country + "\n"
                + "Language: " + JSON.parse(body).Language + "\n"
                + "Plot: " + JSON.parse(body).Plot + "\n"
                + "Actors: " + JSON.parse(body).Actors + "\n";
            }
            

            // Next, we append the text into the "log.txt" file.
            // If the file didn't exist, then it gets created on the fly.
            fs.appendFile("log.txt", text, function(err) {

                // If an error was experienced we will log it.
                if (err) {
                console.log(err);
                }

                // If no error is experienced, we'll log the phrase "Content Added" to our node console.
                else {
                console.log("Content added to log.txt");
                }
            });
        } else if (error) {
            console.log(error);
        }
    });

} else if (command=="do-what-it-says") {

    // This block of code will read from the "movies.txt" file.
    // It's important to include the "utf8" parameter or the code will provide stream data (garbage)
    // The code will store the contents of the reading inside the variable "data"
    fs.readFile("random.txt", "utf8", function(error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }

        // We will then print the contents of data
        console.log(data);

        // Then split it to get arguments
        command = data.split(',"')[0];
        search = data.split(',"')[1].split('"')[0];

        // We will then do the query
        // If the user searched for a concert 
        // If the user searched for a concert 
        if (command=="concert-this") {
            // Then run a request to the Bands in Town API with the artist specified
            request("https://rest.bandsintown.com/artists/"+search+"/events?app_id=codingbootcamp", function(error, response, body) {

                // If the request is successful (i.e. if the response status code is 200)
                if (!error && response.statusCode === 200) {
                    // Parse the body of the site and recover just the venue name
                    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
                    for (var i = 0; i<JSON.parse(body).length; i++) {
                        console.log("The venue is: " + JSON.parse(body)[i].venue.name);
                        // Parse the body of the site and recover just the venue location
                        console.log("The venue is in: " + JSON.parse(body)[i].venue.city);
                        // Parse the body of the site and recover just the date of the event
                        console.log("The concert is on: " + JSON.parse(body)[i].datetime.split("T")[0]);
                        // log a dashed line
                        console.log("-----------");
                        // Next, we store the text given to us from the query
                        var text = "The venue is: " + JSON.parse(body)[i].venue.name + "\n"
                                    + "The venue is in: " + JSON.parse(body)[i].venue.city + "\n"
                                    + "The concert is on: " + JSON.parse(body)[i].datetime.split("T")[0] + "\n";

                        // Next, we append the text into the "log.txt" file.
                        // If the file didn't exist, then it gets created on the fly.
                        fs.appendFile("log.txt", text, function(err) {

                        // If an error was experienced we will log it.
                        if (err) {
                            console.log(err);
                        }

                        // If no error is experienced, we'll log the phrase "Content Added" to our node console.
                        else {
                            console.log("Content added to log.txt");
                        }

                        });
                    }
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
                console.log("Album: "+ data.tracks.items[0].album.name);
                // Next, we store the text given to us from the query
                var text = "Artist: " + data.tracks.items[0].artists[0].name + "\n"
                + "Song: " + data.tracks.items[0].name + "\n"
                + "Preview link: " + data.tracks.items[0].preview_url + "\n"
                + "Album: " + data.tracks.items[0].album.name + "\n";

                // Next, we append the text into the "log.txt" file.
                // If the file didn't exist, then it gets created on the fly.
                fs.appendFile("log.txt", text, function(err) {

                    // If an error was experienced we will log it.
                    if (err) {
                    console.log(err);
                    }

                    // If no error is experienced, we'll log the phrase "Content Added" to our node console.
                    else {
                    console.log("Content added to log.txt");
                    }
                });
            });

        } else if (command=="movie-this") {
            // Then run a request to the Bands in Town API with the artist specified
            request("http://www.omdbapi.com/?apikey=trilogy&t="+search, function(error, response, body) {

                // If the request is successful (i.e. if the response status code is 200)
                if (!error && response.statusCode === 200) {
                    // log the movie title
                    console.log("Movie title: "+JSON.parse(body).Title);
                    // the release year
                    console.log("Released: "+JSON.parse(body).Year);
                    // imdb rating
                    console.log("IMDB rating: "+JSON.parse(body).imdbRating);
                    // rotten tomatoes rating
                    if (JSON.parse(body).Ratings[1]) {
                        console.log("Rotten Tomatoes: "+JSON.parse(body).Ratings[1].Value);
                    } else {
                        console.log("Rotten Tomatoes rating unavailable");
                    }
                    // country of production
                    console.log("Produced in: "+JSON.parse(body).Country);
                    // language of movie
                    console.log("Language: "+JSON.parse(body).Language);
                    // plot description
                    console.log("Plot: "+JSON.parse(body).Plot);
                    // actors
                    console.log("Actors: "+JSON.parse(body).Actors);

                    // Next, we store the text given to us from the query
                    // rotten tomatoes rating
                    if (JSON.parse(body).Ratings[1]) {
                        var text = "Movie title: " + JSON.parse(body).Title + "\n"
                                + "Released: " + JSON.parse(body).Year + "\n"
                                + "IMDB rating: " + JSON.parse(body).imdbRating + "\n"
                                + "Rotten Tomatoes: " + JSON.parse(body).Ratings[1].Value + "\n";
                                + "Produced in: " + JSON.parse(body).Country + "\n"
                                + "Language: " + JSON.parse(body).Language + "\n"
                                + "Plot: " + JSON.parse(body).Plot + "\n"
                                + "Actors: " + JSON.parse(body).Actors + "\n";
                    } else {
                        var text = "Movie title: " + JSON.parse(body).Title + "\n"
                        + "Released: " + JSON.parse(body).Year + "\n"
                        + "IMDB rating: " + JSON.parse(body).imdbRating + "\n"
                        + "Rotten Tomatoes rating unavailable" + "\n";
                        + "Produced in: " + JSON.parse(body).Country + "\n"
                        + "Language: " + JSON.parse(body).Language + "\n"
                        + "Plot: " + JSON.parse(body).Plot + "\n"
                        + "Actors: " + JSON.parse(body).Actors + "\n";
                    }
                    

                    // Next, we append the text into the "log.txt" file.
                    // If the file didn't exist, then it gets created on the fly.
                    fs.appendFile("log.txt", text, function(err) {

                        // If an error was experienced we will log it.
                        if (err) {
                        console.log(err);
                        }

                        // If no error is experienced, we'll log the phrase "Content Added" to our node console.
                        else {
                        console.log("Content added to log.txt");
                        }
                    });
                } else if (error) {
                    console.log(error);
                }

            }); 
        }
    });
}









