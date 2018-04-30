# JamMate

[Try JamMate now!](https://jam-mate.herokuapp.com "JamMate")

# Screenshots

![screen shot 2018-04-11 at 8 05 57 am](https://user-images.githubusercontent.com/36775791/38625455-5ce785e6-3d5f-11e8-897d-99672047af8c.png)
![screen shot 2018-04-11 at 8 06 07 am](https://user-images.githubusercontent.com/36775791/38625459-5d27066c-3d5f-11e8-8041-fbfd5d280ffc.png)

# What is it?

JamMate is an app made to connect you with local musicians who are looking to find new people to play music with. Whether your intention is to add members to an existing band, join another person's group, or to simply find a new like-minded friend to play music with, JamMate can quickly expose you to the individuals near you.

# Proposal

The goal was to provide, at-a-glance, a fast answer to knowing who is nearby you looking to play music, what instruments they would like to play, and if the genres of music they are interested in mesh with what you would like to play. Inspired by all of the dating apps that have been connecting individuals with others with the perspective of romantic-compatibility, JamMate instead finds ways to find musicians match up their interests with others to ease the process of finding bandmates or jam-mates.

# Technology

JS, HTML, CSS, Bootstrap, Response, Express, MongoDB/Mongoose, Jquery

# Approach Taken

Proximity of user creates search results within 15 miles of the user. This is based off of each user's profile, in which they enter their zipcode. API handles the calculation, matching all users that are within the 15 miles, and returns users. 

# Unsolved

Would like to create more robust messaging within-app. Also, filtering search results of users based on instrument or genres they are interested in are works in progress and not in production at this time. 

