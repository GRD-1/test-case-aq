import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import router from './router';
import exceptionFilter from './middleware/exception-filter';
import { validateEnvVars } from './utils/validate-env';

dotenv.config();
validateEnvVars();

const app = express();
const urlencodedParser = express.urlencoded({ extended: false });

app.use(bodyParser.json());
app.use('/', urlencodedParser, router);
app.use(exceptionFilter);

app.listen(process.env.APP_PORT, () => {
  console.log(`app is listening on port ${process.env.APP_PORT}`);
});
