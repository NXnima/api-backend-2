import 'express-async-error';
import debug from 'debug';
debug("app:main");
import winston from 'winston';

function logging() { 
  winston.add(new winston.transports.File({filename:'logfile.log'}))
  process.on('uncaughtException' , (ex : Error)=>{
    debug(ex.message);
    winston.error(ex.message , ex);
    process.exit(1);
  })

  process.on('unhandledRejection' , (ex : Error)=>{
    debug(ex.message);
    winston.error(ex.message , ex);
    process.exit(1);
  })

}

export default logging;