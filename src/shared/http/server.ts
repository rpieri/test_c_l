import 'reflect-metadata'
import 'dotenv/config'
import express, {NextFunction, Request, Response} from 'express';
import 'express-async-errors'
import cors from 'cors';
import routes from './routes'
import AppError from "@shared/errors/AppError";
import '@shared/typeorm'
import '@shared/container';
import {errors} from "celebrate";
import {Logger} from "tslog";

const app = express();
const log = new Logger();

app.use(cors());
app.use(express.json());

app.use(routes);

app.use(errors());
app.use((error: Error, request: Request, response: Response) => {
    if (error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: 'error',
            message: error.message
        });
    }

    return response.status(500).json({
        status: 'error',
        message: 'Internal server error'
    });
});

app.listen(3333, () => {
    log.info("Server started on port 3333!");
})

