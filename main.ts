import  express from 'express';
import router from './src/routes/mainRouter.js';
import db from './startup/db.js';
import config from "./startup/config.js";
import logging from "./startup/logging.js";

const app = express();
app.use(express.json());
config(app , express);

db();
logging();

app.use('/api' , router);

const port = process.env.PORT || 3000;
app.listen(port , ()=> console.log(`listen on port ${port}`));