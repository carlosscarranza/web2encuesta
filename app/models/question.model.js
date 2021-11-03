import sql from "./db.js";

//Constructor
const Question = function (question) {
  this.team = question.team;
  this.league = question.league;
  this.quantity = question.quantity;
};

Question.getAll = (result) => {
  sql.query("SELECT * FROM Quesions", (err, res) => {
    if (err) {
      console.log("error", err);
      result(err, null);
      return;
    }

    console.log("questions: ", res);
    result(null, res);
  });
};

Question.updateById = (id, quantity, result) => {
  sql.query(
    "UPDATE Quesions SET quantity = ? WHERE id = ?",
    [quantity, id],
    (err, res) => {
      if (err) {
        console.log("error", err);
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      //console.log("modificar question: ", { id: id, ...quantity });
      result(null, { id: id, ...quantity });
    }
  );
};

Question.findById = (id, result) => {
  sql.query(`SELECT * FROM Quesions WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("question", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "no_encontrado" }, null);
  });
};

export default Question;
