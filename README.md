# Musical PlayLand 🎵
Interactive Musical Web app with creative playable features🎆

# Demonstration

https://github.com/hswon30/musical_playland/assets/97964329/d4f7e20b-5d36-479e-b67b-0cd501e0e774




# Architecture  :white_check_mark:
(ALL) List of technologies, description of system architecture/application used for the project
* Pandas (Python) for data cleaning & pre-processing 
* MySQL
* DataGrip
* AWS
* HTML
* CSS
* Bootstrap
* Node.js (Express.js)
* React

# Web App description :sparkles:

**Main page** - The default page for the website. The menu bar on top of the page has a main link, link to the About page, and three icons each routed to one of the three main functionalities of the website. The user can search for a song here or go directly to the search page.

**Who sang it better** – Game quiz that displays a random track name that is sung by more than one artist and prompts the user to guess which rendition of the track is the most popular, based on the track popularity metrics.

**Search page** - The user is able to search for his/her favorite artist and/or song in the search bar, then listen to track previews of the search results while seeing which album(s) the tracks are from.

**WordCloud page** - Upon landing on this page, the user is shown a snapshot of the most popular songs on Spotify at the time the dataset was collected. Additionally, the user is able to search for their favorite artist, producing a colorful word cloud of track names and the associated albums. 

**About page** - General info about the team, Database Demons, and its members.

# Build Instructions
1. Before building, please ensure that the Application Structure contains the following folders and files. See the accompanying descriptions for context.
   1. Server Folder (/server):
      1. .gitignore: A gitignore file for the Node application. Read more on .gitignore files here.
      2. config.json: Holds the RDS connection credentials/information and application configuration settings (like port and host). 
      3. package.json: maintains the project dependency tree; defines project properties, scripts, etc 
      4. package-lock.json: saves the exact version of each package in the application dependency tree for installs and maintenance. 
      5. routes.js: where the code for the API routes’ handler functions go. 
      6. server.js: the code for the routed HTTP application. It imports routes.js and maps each route function to an API route and type (like GET, POST, etc). It also ‘listens’ to a specific port on a host using the parameters in config.json
   2. Server Tests Folder (/server/__tests__): 
      1. results.json: stores (some) expected results for the tests in a json encoding. 
      2. tests.js
   3. Client Folder (/client)
      1. .gitignore: a gitignore file for the client application. 
      2. package.json: maintains the project dependency tree; defines project properties, scripts, etc 
      3. package-lock.json: saves the exact version of each package in the application dependency tree for installs and maintenance 
   4. Client Public Folder (/client/public): this folder contains static files like index.html file and other assets for specifying web page titles, crawlability, etc.
   5. Client Source Folder (/client/src): this folder contains the main source code for the React application. 
      1. config.json: holds server connection information (like port and host). Could be replaced by a .env file, but students find this easier to manage 
      2. fetcher.js: contains helper functions that wrap calls to API routes. improved testability, reusability, and usability 
      3. index.js: this the main JavaScript entry point to the application and stores the main DOM render call in React. For this application, page routing via components and imports for stylesheets are also embedded in this file. 
   6. Pages Folder (/client/src/pages): this folder contains files for React components corresponding to the pages in the application (see the sections below for more details). 
   7. Component Folder (/client/src/components): similar to the /pages folder, but this folder contains files for React components corresponding to smaller, reusable components, especially those used by pages. 
2. Cd into server using `cd server` command on the command line
3. Install npm package manager using `npm install` command.
4. Cd into the client folder from the root directory using `cd client` and repeat step #3.
5. In the client folder, install the react word cloud package using the command: `npm install react-cloud --force`. Please note that the installation will need to be forced given that the package has a dependency on an older version of react (v16).
6. In both the client and server folders on the command line, run `npm start`. The webpage should pop up momentarily after.

<h3>Edit notes</h3>
The contents of this repository were copied from a private team repository containing sensitive private information. Due to security concerns, all commit history had to be rebased. The most efficient way to do so was to set up a brand new repository without the git history associated with the original project. 
