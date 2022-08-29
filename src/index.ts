//~Dotenv
import 'dotenv/config';

//~Import modules
import express from 'express';
const app = express();
//! export for test JEST
export { app };
    
import { router } from './app/routes/index.js';
//! Be careful, when create import in TS file, import js file !!
import { ErrorApi } from './app/services/errorHandler.js';

//~Debug
import debug from 'debug';
const logger = debug('EntryPoint');

//~ Encoding
//accept Content-type: application/json
app.use(express.json());
// accept Content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({
extended: true
}));

//~Router
app.use(router);

//~ Error 404 NOT Found
app.use((req, res) => {
  throw new ErrorApi(`Page Not Found !`, req, res, 404);
});

//~ Launch Server
if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT ?? 3000;

  app.listen(PORT, () => {
    logger(`🚀\x1b[1;35m Launch server on http://localhost:${PORT}\x1b[0m`);
  });
}
