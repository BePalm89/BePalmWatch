import server from './src/config/server.js';
import * as dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import { moviesSeeds } from './src/seeds/now-playing-movies.seeds.js';

dotenv.config();

const PORT = 3000;

connectDB();

// Run the seed just one time to fill the db with some data
//moviesSeeds();


server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
