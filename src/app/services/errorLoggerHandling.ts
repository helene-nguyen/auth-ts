//~import modules
import { formattedDate } from '../utils/formattedDate.js';
import * as fs from 'fs';
import { Request } from 'express';

//~ resolve __dirname
import { resolve, join } from 'path';
const __dirname = resolve(`./src/app/services`);
// resolve will define your root file

//~ Logger
import debug from 'debug';
const logger = debug('ErrorHandling');
/**
 * Manage error
 */
function errorLoggerHandling(message : string, req: Request) {
  const actualDate = new Date();

  // format error message : Date + url + message
  const logMessage = `${actualDate.toLocaleString()} - ${req.url} - ${message}\r`;

  // date format YYYY-MONTH-DD
  const fileName = `${formattedDate}.log`;

  // create a log and write it in your file
  fs.appendFile(join(__dirname, `../../../logs/${fileName}`), logMessage, (error) => {
    if (error) logger(error);
  });
}

export { errorLoggerHandling };
