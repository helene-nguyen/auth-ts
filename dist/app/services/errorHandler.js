import { errorLoggerHandling } from './errorLoggerHandling.js';
class ErrorApi extends Error {
    constructor(message, req, res, statusCode = 500) {
        super(message);
        res.status(statusCode).json({ "message": message });
        errorLoggerHandling(message, req);
    }
}
export { ErrorApi };
//# sourceMappingURL=errorHandler.js.map