import 'dotenv/config';
import express from 'express';
const app = express();
export { app };
import { router } from './app/routes/index.js';
import { ErrorApi } from './app/services/errorHandler.js';
import debug from 'debug';
const logger = debug('EntryPoint');
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(router);
app.use((req, res) => {
    throw new ErrorApi(`Page Not Found !`, req, res, 404);
});
if (process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT ?? 3000;
    app.listen(PORT, () => {
        logger(`🚀\x1b[1;35m Launch server on http://localhost:${PORT}\x1b[0m`);
    });
}
//# sourceMappingURL=index.js.map