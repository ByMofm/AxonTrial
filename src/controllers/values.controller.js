const pool = require("../db");

const getValues = async (req, res, next) => {
  try {
    const allValues = await pool.query("SELECT * FROM values");
    res.status(200).json(allValues.rows);
  } catch (error) {
    next(error);
  }
};

const getOneValue = async (req, res, next) => {
  try {
    const { id } = req.params
    const result = await pool.query("SELECT * FROM values WHERE id = $1", [id]);
    
    if (result.rows.length === 0)
    return res.status(404).json({
      message: "Id inexistente",
    })

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};
const getTotalImport = async (req, res, next) => {
  try {
    const result = await pool.query("SELECT SUM(importe * CASE WHEN tipo = 'Ingreso' THEN 1 ELSE -1 END) FROM values");
    
    if (result.rows.length === 0)
    return res.status(404).json({
      message: "Error!",
    })

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const createValues = async (req, res, next) => {
  const { tipo, concepto, importe, fechas } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO values (tipo, concepto, importe, fechas) VALUES ($1, $2, $3, $4) RETURNING *",
      [tipo, concepto, importe, fechas]
    );

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const deleteValues = async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await pool.query("DELETE FROM values WHERE id = $1", [id]);

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
    const { concepto, importe, fechas } = req.body;

    const result = await pool.query(
      "UPDATE values SET concepto = $1, importe = $2, fechas = $3 WHERE id = $4 RETURNING *",
      [concepto, importe, fechas, id]
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
  getTotalImport,
};
