import express from 'express';
import cors from 'cors';

const server =  express();

server.use(cors());

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use('*', (req, res, next) => {
    const error = new Error('Route not found');
    error.status = 404;
    next(error);
});

server.use((error, req, res, next) => {
    return res.status(error.status || 500).json(error.message || 'Unexpected error');

});

export default server;