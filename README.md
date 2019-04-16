
# PhotoBook Maker App

React front end for a collaborative photobook maker.

## URL 
Navigate to: http://52.183.38.255/ to access our live Photobook App

### Local Setup

##### Env Variables
- This is optional, the app comes preconfigured
- Set the env variable REACT_APP_DATA_SERVICE to the url of your dataservice
- Set the env PORT to 3000 (so it won't conflict with the dataservice)

##### Patch
Patch json1 by a adding the following to type exports

`uri: "http://sharejs.org/types/JSONv1",`

##### Starting
`npm install`

`npm run start`
