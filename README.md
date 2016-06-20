#### Pinterest Image Slider

A simple application that lets you log in to your Pinterest account and fetches all your public boards. Then you can select a board and set the time each image will be displayed, After pressing the 'start' button an infinite slideshow containing all images in that board will start. Between the consecutive images a short cross-fade is displayed.

1. Login to Pinterest and allow the app to read your public boards
2. Your public boards will be displayed in a drop down menu
3. After selecting a board you can optionally adjust interval setting
4. Press 'start' and the app starts displaying all images in the chosen board
5. The slide show loops: after the last image the show will start again with the first image



#### Installation

This application is made with React and 3 different techniques for state management: Flux, Redux and Relay/GrahpQL. Each version is put in their own folder, to install and run a version:

 - `cd` to the folder of the version that you want to run
 - `npm install` install all dependencies
 - `npm run watch` starts watchify
 - `npm run build` builds and minifies the code and generates a source map
 - start a local webserver `npm run start-ssl`
 - for the Relay/GraphQL version only: if you change something in the file /data/schema.js you might need to run `npm run update-schema` as well

Note that the [Pinterest API](https://developers.pinterest.com/docs/getting-started/introduction/) requires a https connection, so you have to start a local webserver with a key and a certificate:

`ws --key server.key --cert server.crt`

For generating a key and a certificate read the information on [npm](https://www.npmjs.com/package/local-web-server).

Linux users might value this information on [Stackoverflow](http://stackoverflow.com/questions/7580508/getting-chrome-to-accept-self-signed-localhost-certificate) about getting Chrome to accept self-signed certificates.


#### Setting up your own app

The key in the [code](https://github.com/abudaan/pinterest-slider/blob/master/js/util/pdk_wrapper.js#L2) only works for https://localhost:8000. Should you wish to run the application from a different domain please use your own key. Consult the [developer documentation](https://developers.pinterest.com/docs/api/overview/) on the Pinterest site.
