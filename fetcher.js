const request = require('request');
const fs = require('fs');


const url = process.argv[2];
const filePath = process.argv[3];


const write = (filePath, content, callback) => {
  fs.writeFile(filePath, content, error => {
    if (error) {
      callback(error);
      return;
    }
    callback(null);
  });
};

const fetch = (location, callback) => {
  request(location, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    callback(null, body);
  });
};


fetch(url, (error, data) => {
  if (error) {
    console.log("There was an error: ", error);
    return;
  }
  write(filePath, data, (error) => {
    if (error) {
      console.log("There was an error: ", error);
    }
    const fileSize = data.length
    console.log(`Downloaded and saved ${fileSize} bytes to ${filePath}`);
  });
});





