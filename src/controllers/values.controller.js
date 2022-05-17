const pool = require("../db");

const getValues = async (req, res, next) => {
  try {
    const allValues = await pool.query("SELECT * FROM clientes");
    res.status(200).json(allValues.rows);
  } catch (error) {
    next(error);
  }
};

const getOneValue = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM clientes WHERE id = $1", [
      id,
    ]);

    if (result.rows.length === 0)
      return res.status(404).json({
        message: "Id inexistente",
      });

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const createValues = async (req, res, next) => {
  const { nombre, direccion, dni, condicioniva } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO clientes (nombre, direccion, dni, condicioniva) VALUES ($1, $2, $3, $4) RETURNING *",
      [nombre, direccion, dni, condicioniva]
    );
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const deleteValues = async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await pool.query("DELETE FROM clientes WHERE id = $1", [id]);

    if (result.rowCount === 0)
      return res.status(404).json({
        message: "valor inexistente",
      });

    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

const updateValues = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nombre, direccion, dni, condicioniva } = req.body;

    const result = await pool.query(
      "UPDATE clientes SET nombre = $1, direccion = $2, dni = $3, condicioniva=$4 WHERE id = $5 RETURNING *",
      [nombre, direccion, dni, condicioniva, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "valor no existente",
      });
    }
    return res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getValues,
  createValues,
  deleteValues,
  updateValues,
  getOneValue,
};
