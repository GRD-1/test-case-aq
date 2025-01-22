import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import router from '../../src/router.js';
import exceptionFilter from '../../src/middleware/exception-filter.js';
import { validateEnvVars } from '../../src/utils/validate-env.js';
import FootprintApi from '../../src/footprintApi.js';

dotenv.config();
validateEnvVars();

const app = express();
const urlencodedParser = express.urlencoded({ extended: false });

app.use(bodyParser.json());
app.use('/', urlencodedParser, router);
app.use(exceptionFilter);

const server = app.listen(process.env.APP_PORT, () => {
  console.log(`app is listening on port ${process.env.APP_PORT}`);
});

export const application = server;
export const footprintApi = FootprintApi.getInstance();
