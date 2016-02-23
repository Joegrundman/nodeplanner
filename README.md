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
Perhaps best not to look too closely at the gulpfile - it may only be understandable by me.

there are two target build folders

one inside the main warplanner folder, another in a parallel directory named stage. stage has a separate git repo for pushing to paas.

the one inside warplanner is for testing the build.

there are several different gulp commands - mostly they simply pipe from dev to build

`gulp pipe-server` pipes app.js and package.json
`gulp pipe-style-all` pipes the whole public stylsheets directory
`gulp pipe-style` pipes the styles.css file
`gulp pipe-html` pipes the html files
`gulp pipe-static` pipes the static files
`gulp usemin` concatenates the javascripts into bundle.js and pipes them 
and in index, removes references to javascripts and replaces with single reference to bundle

`gulp build` does all these in sequence BUT BADLY
because gulp usemin runs before gulp pipe-html is finished 

so until i fix this properly

after `gulp build` is finished, run `gulp usemin`



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
