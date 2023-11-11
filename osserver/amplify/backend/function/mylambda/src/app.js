/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/




const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const axios = require('axios')
const ENDPOINT =
  'https://search-vote-test-zd-puuszg4vile2k6mpdoqopdqp7q.aos.ap-northeast-1.on.aws/receipts_test'
const username = 'zhengda',
  password = '!!Zhengda2023!!'

// export async function postData(data = {}) {
//   return axios.get(ENDPOINT, {
//     headers: {
//       'Content-Type': 'application/json',
//       // 'Content-Type': 'application/x-www-form-urlencoded',
//       Authorization: 'Basic emhlbmdkYTohIVpoZW5nZGEyMDIzISE=',
//     },
//   })
// }

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});


app.get('/items', function(req, res) {
  res.json({success: 'get call succeed!', url: req.url});
});

app.get('/data', async function(req, res) {
  let result;
  try{
    result = await axios.get(ENDPOINT).json();
  }catch(e){
    result = e.message;
  }
  res.json(result);
});

app.post('/data', function(req, res) {
  const body = req.body;
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
