import express from 'express';
import question from "../controllers/question.controller.js";

const app = express();

app.get("/questions", question.findAll);

//Modifica un quiestion con el Id
app.put("/questions", question.update);

export default app;
