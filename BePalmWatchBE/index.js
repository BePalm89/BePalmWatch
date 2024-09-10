import server from './src/config/server.js';

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});