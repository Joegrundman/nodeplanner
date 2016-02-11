*** WARPLANNER 2 FOR NODE***
============================

A browser based tool to play Bruce Harper's A World At War

Not finished
____________

You must have node installed.

To install, clone the repo, navigate a terminal to the directory and type 

`npm install`

once the dependencies are installed

`npm start`

and navigate the browser to

`localhost:3000`

press the **play** button to go to the game screen

--------------------------------------------------

the index file can draw on the concatenated files using 
´dist/wp.min.js´

the files are not actually minified, just concatenated and stripped of comments. 
Uglify doesn't yet play nicely with es6, and i don't yet want to use babel to uglify into es5

to use the main files instead of wp.min.js,

go to 

`views/index.html`

comment out the script tag pulling wp.min.js, and uncomment the other source files


