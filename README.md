Favorite Buoys is a demo using ReactJS, Google Maps, Gulp, Webpack, ES6, and Babel.

This is my first React app. Actually, all of this is new to me except for ES6.

The app loads in buoy data from the National Data Buoy Center. It allows users to view all buoys within a 300-mile radius
of Boston and choose favorite buoys that they can view on a Google Map. The faved buoys are stored using cookies.

The app is not responsive and is optimized for viewports of 1100px width or greater. It has only been checked on Chrome;
there may be layout or javascript issues on other browsers. Generally, the layout is fairly rough. I focused more on the scripting and setup of the React components. I also had grander plans for the map, but just getting the markers to appear and disappear correctly was quite a task. There's certainly a lot of opportunity to make the map more informative and interactive.

Unfortunately, the RSS feed server does not support cross-origin requests, and so a Chrome Add-On is required to make the app
work. I realize this isn't a good solution, but I don't think the cross-origin problem was meant to be a part of the challenge,
so the add-on seems like an OK workaround.

To install the Chrome Add-On:

* https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en
* Once the add-on is running, you can view the app running here: http://www.comfypants.org/favorite-buoys/
* Turn off the add-on when you're not using it, because it'll prevent certain sites from working properly, including GitHub!

Local installation:

* Clone the repo. From the home directory, install the node_modules: `npm install`
* Start the web server and watch CSS, HTML, and other files: `gulp`
* Use webpack to watch JSX files: `npm run dev`
* Browse to the app at `http://localhost:1337`
