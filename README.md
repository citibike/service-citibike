# service-citibike

Wrapper microservice for Citibike Feed service. 

##Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 
See deployment for notes on how to deploy the project on a live system.

###Prerequisites
* Install [Node.js] (https://nodejs.org/en/download/) - Runtime for your application.
* [Clone] (https://git-scm.com/docs/git-clone) code to your local pc or development location : `git clone <.git path>` 

###Installing

[Add required dependencies] (https://docs.npmjs.com/getting-started/installing-npm-packages-locally) - `npm install ` from your application root folder.

### configuration or api keys for local 
Keep a file name `notToCommit.js` inside `src/config/` folder for local testing. It should not be committed and required values need to be available on cloud (`environment variable or services`). 

notToCommit.js - 
```
'use strict';

let dummyData = {
    mongoUrl: 'your mongo db url '
}
module.exports = dummyData;

```
Application config-settings -   `src/config/settings.js` already have code to load required parameters from notToCommit file when running on local in place of cloud. 

###run
From your application root folder`npm start`

###Swagger Rest api
Application URL/documentation - Look on `src\config\settings.js` file for local port number cloud url/port settings. 

`http://localhost:3000/documentation`

## Deployment - PCF 
[cf push](https://docs.cloudfoundry.org/devguide/deploy-apps/deploy-app.html) -f manifest.yml   

