# test-case-aq
The task: create the API that interacts with https://api.footprintnetwork.org API and returns the total emission per country per year.
Use the methods:
* GET 'https://api.footprintnetwork.org/v1/countries'
* GET `https://api.footprintnetwork.org/v1/data/${countryCode}/all/EFCpc`

additional requirements:
* work around the third-party API rate limit (unknown) 
* set a global request timeout = 180 sec
* create the robust method contracts
* cover the implementation with tests
* check the solution with load tests

<br>
<p style="display: block; width: 100%; text-align:left;">
  <a href="https://nodejs.org/en/about" target="_blank"><img src="https://img.shields.io/badge/Node.js-v20.18.1-blue?logo=nodedotjs" alt="Node.js Version" /></a>
  <a href="https://ecma-international.org/" target="_blank"><img src="https://img.shields.io/badge/JavaScript-ECMA412-blue?logo=javascript" alt="JavaScript Version" /></a>
  <a href="" target="_blank"><img src="https://img.shields.io/badge/covarage-100%25-%2300c642?style=flat" alt="Coverage" /></a>
  <a href="" rel="nofollow"><img src="https://img.shields.io/badge/istall_size-140%20KB-%23ebdb32?style=flat" alt="install size"></a>
</p>

## Contents

1. [Stack](#stack)
2. [Launch](#launch)
3. [Tests](#tests)

## Stack

<div>
    <div>
          <div style="display: flex; flex-wrap: wrap; height: 300px;">
            <div style="width: 40%; height: fit-content;"><a href="https://nodejs.org/en/about" target="_blank"><img src="https://img.shields.io/badge/Node.js-v20.14.0-blue?style=for-the-badge&logo=nodedotjs" alt="Node.js Version" /></a></div>
            <div style="width: 40%; height: fit-content;"><a href="https://expressjs.com/" target="_blank"><img src="https://img.shields.io/badge/@babel/core-v7.26.0-blue?style=for-the-badge&logo=babel" alt="Babel Version" /></a></div>
            <div style="width: 40%; height: fit-content;"><a href="https://babeljs.io/" target="_blank"><img src="https://img.shields.io/badge/express-v4.21.2-blue?style=for-the-badge&logo=express" alt="Express Version" /></a></div>
            <div style="width: 40%; height: fit-content;"><a href="https://www.npmjs.com/package/joi" target="_blank"><img src="https://img.shields.io/badge/Joi-v17.13.3-blue?style=for-the-badge" alt="Joi Version" /></a></div>
            <div style="width: 40%; height: fit-content;"><a href="https://ecma-international.org/" target="_blank"><img src="https://img.shields.io/badge/JavaScript-ECMA412-blue?style=for-the-badge&logo=javascript" alt="JavaScript Version" /></a></div>
            <div style="width: 40%; height: fit-content;"><a href="https://www.npmjs.com/package/fastq" target="_blank"><img src="https://img.shields.io/badge/fastq-v1.18.0-blue?style=for-the-badge" alt="Fastq Version" /></a></div>
            <div style="width: 40%; height: fit-content;"><a href="https://mochajs.org/" target="_blank"><img src="https://img.shields.io/badge/Mocha-v11.1.0-blue?style=for-the-badge&logo=mocha" alt="Mocha Version" /></a></div>
            <div style="width: 40%; height: fit-content;"><a href="https://www.chaijs.com/" target="_blank"><img src="https://img.shields.io/badge/Chai-v5.1.2-blue?style=for-the-badge&logo=chai" alt="Mocha Version" /></a></div>
            <div style="width: 40%; height: fit-content;"><a href="https://www.npmjs.com/package/sinon" target="_blank"><img src="https://img.shields.io/badge/Sinon-v19.0.2-blue?style=for-the-badge" alt="Sinon Version" /></a></div>
          </div>
    </div>
</div>

## Launch

1. Install <a href="https://nodejs.org/en" target="_blank">Node</a> Node >=20.14.0
2. Install dependencies:
``` bash
$ npm i
```
3. Copy environment variables:
``` bash
$ cp .env.sample .env
```
4. Get a secret <a href="https://share.doppler.com" target="_blank">here</a>
5. Set the FOOTPRINT_API_KEY = yourSecret (.env file)
6. Run the application using package.json scripts, e.g:
``` bash
$ npm run start
```
## Tests

1. Run the tests using the command:
``` bash
$ npm run test
```
