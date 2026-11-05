import mongoose from 'mongoose';
import debug from 'debug';
import config from 'config';

const log = debug("app:main");

function db():void{
  mongoose.connect(config.get('db.adress'))
  .then(()=> debug('connect to mongodb'))
  .catch(()=> debug('cannot connct to mongodb'));
}

export default db;