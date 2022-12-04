import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'
import postRoutes from './routes/posts.js'
import userRoutes from './routes/users.js'
const app = express();


dotenv.config();
app.use(cors())
app.use(express.urlencoded({
    extended: true,
    limit: '30mb'
}));
app.use(express.json({
    limit: '30mb',
    extended: true
}));
app.use('/posts', postRoutes);
app.use('/user', userRoutes);

app.get('/', (req, res) => {
    res.send('APP IS RUNNING');
})

const PORT = process.env.PORT || 6000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        console.log(process.env.CONNECTION_URL)
    })).catch(err => {
        console.log('err', err)
    })

