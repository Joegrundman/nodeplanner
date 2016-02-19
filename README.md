WARPLANNER 2 FOR NODE
=====================

A browser based tool to play Bruce Harper's A World At War

Not finished
____________

Installation
------------

You must have node installed.

To install, clone the repo, navigate a terminal to the directory and type 

`npm install`

once the dependencies are installed

`npm start`

and navigate the browser to

`localhost:3000`

press the **play** button to go to the game screen

use 

`npm run dev` 
to use nodemon to auto-restart the server after changes

Build
-----

At the moment, a very simple build system has been implemented. 

On `index.html`, for development, all the scripts are individually sourced.
Performance is pretty slow in this state

One copy of, the concatenated javascript file is found in 
´public/dist/wp.min.js´

this one is useful for checking the quality of the concatenated file without shifting to production settings

On `index.html`, comment out all the javascripts (but not the libraries like jquery)
and uncomment out the line:

`<script src="dist/Min/wp.min.js"></script>`

the files are not actually minified, just concatenated and stripped of comments. 
Uglify doesn't yet seem to play nicely with es6 classes, and i don't currently want to use babel to uglifyall the way back into es5

the other concatenated file is found in 
`build/Min`

this folder also has a copy of the styles and a repeat of the content folder, and is accessed when node environment variable is set to `production`

to concatenate your new javascripts into a new wp.min.js
run:
`gulp concat`

to run in development mode
`npm run dev`

to run in production mode
`npm run production`

Unit Tests
----------
I have written about a hundred simple unit tests using karma-jasmine
It helped somewhat with refactoring from es4 to es6, but it is also so i can demonstrate my unit testing skillz

To run the karma-jasmine tests, run
`npm test`

Jsdoc
-----

jsdocs are implemented with DocStrap slate to keep a unified theme with the warplanner ui
The main reason is that my first paid programming job has a good chance of writing documentation and doctests for a hightech scientific simulation software
so i thought it would be helpful if i had some done, but who knows, maybe documentation really is awesome!

to serve up the docs, navigate to the `./out` directory and run a simple server
(unless i am missing something and i don't need to do all that)
If you have python installed, you can make server with
`python -m http.server 8000`

and then navigate to 
`localhost:8000`

to see the documents

to build documentation with additional doc comments you need jsdoc installed globally
`npm install -g jsdoc`

then from the warplanner directory
`npm run jsdoc`


Germany Safe
------------

Since i have been advised that i cannot be showing swastikas to german employers, 
i have used a SFW version of the german flag. To go back to authentic, go to

content/flags and find the germany flags.

Rename all the germany.jpg files as germany-safe.jpg etc

rename all the germany-unsafe.jpg as germany.jpg
