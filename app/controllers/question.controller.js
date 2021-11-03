import Question from "../models/question.model.js";

//Retorna todos los questions
const findAll = (req, res) => {
  Question.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Ocurrió un error recuperando los questions",
      });
    } else {
      res.send(data);
    }
  });
};

//Modifica un question identificado por el id
const update = (req, res) => {

  if (!req.body) {
    res.status(400).send({
      message: "El contenido no puede estar vacio!",
    });
  }

  let arr = req.body.response;

  arr.forEach(elementId => {

    //Obtengo la data para cada id
    Question.findById(elementId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: "Question no encontrado con el id ${elementId}",
          });
        } else {
          res.status(500).send({
            message: "Error recuperando question con id " + elementId,
          });
        }
      } else {

        let jsonResponse = JSON.parse(JSON.stringify(data));

        //Actualizo el registro del id seleccionado
        Question.updateById(
          elementId,
          jsonResponse.Quantity + 1,
          (err, data) => {
            console.log(err);
            if (err) {
              if (err.kind === "not_found") {
                res.status(404).send({
                  message: "Question no encontrado con el id " + elementId,
                });
              } else {
                res.status(500).send({
                  message: "Error modificando cliente con id " + elementId,
                });
              }
            }
          });
      }
    });
  });
  res.status(200).send({
    message: "Actualizado",
  });
};

export default { findAll, update }
