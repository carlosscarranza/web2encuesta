import express from 'express';
import bodyParser from 'body-parser';
import cors  from 'cors';
import routes from './app/routes/question.routes.js';

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

app.use(routes);

app.get("/", (req, res) => {
    res.json({message: "Welcome to eniac application"});
})

let port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})