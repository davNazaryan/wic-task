import express from "express";
import helmet from "helmet";  // compresses requests
import bodyParser from "body-parser";
import cors from "cors";

// Controller
import controller from "./controller";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(helmet());
app.use(cors());

// Showing stack errors
app.set('showStackError', true);

// getData endpoint
app.get('/get_data/:searchStr?', controller);

// Use helmet to secure Express headers
app.use(helmet());

app.use((err, req, res, next) => {
    if (err.name === 'StatusError') {
        res.send(err.status, err.message);
    } else {
        next(err);
    }
});
app.use((req, res, next) => { // 404 route
    res.status(404).end();
});

/* Error handler */
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    return res.send({ error: err.name, message: err.message });
});

export default app;
