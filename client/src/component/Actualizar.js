import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useState, forwardRef, useEffect, useContext } from "react";
import { PropTypes } from "prop-types";
import React from "react";
import NumberFormat from "react-number-format";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { useNavigate, useParams } from "react-router-dom";
import ImportContext from "../ImportContext";

const NumberFormatCustom = forwardRef(function NumberFormatCustom(props, ref) {
  const { onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="$"
    />
  );
});

NumberFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default function Actualizar() {
  const [type, setType] = useState({
    concepto: "",
    importe: "",
    fechas: null,
  });

  const { importNumber } = useContext(ImportContext);

  const handleChange = (event) => {
    setType({ ...type, [event.target.name]: event.target.value });

    console.log(event.target.name, event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`http://localhost:4000/home/${params.id}`, {
      method: "PUT",
      body: JSON.stringify(type),
      headers: { "Content-Type": "application/json" },
    });
    await response.json();

    importNumber();
    navigate("/");
  };

  const navigate = useNavigate();
  const params = useParams();

  const loadValue = async (id) => {
    const res = await fetch(`http://localhost:4000/home/${id}`);
    const data = await res.json();
    setType({
      concepto: data.concepto,
      importe: data.importe,
      fechas: data.fechas,
    });
  };

  useEffect(() => {
    if (params.id) {
      loadValue(params.id);
    }
  }, [params.id]);

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs={3}>
        <Card
          sx={{ mt: 8 }}
          style={{
            backgroundColor: "rgba(63, 22, 81, 1)",
            padding: "1rem",
          }}
        >
          <Button onClick={() => navigate("/")}>volver</Button>
          <Typography variant="5" margin={"55px"} color="white">
            Actualizar Movimiento
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                label="Concepto"
                multiline
                onChange={handleChange}
                rows={4}
                sx={{
                  display: "block",
                  margin: ".5rem 0",
                }}
                fullWidth={true}
                InputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
                name="concepto"
                value={type.concepto}
              ></TextField>

              <TextField
                label="Importe"
                value={type.importe}
                onChange={handleChange}
                name="importe"
                id="formatted-numberformat-input"
                InputProps={{
                  inputComponent: NumberFormatCustom,
                  style: { color: "white" },
                }}
                variant="outlined"
                sx={{
                  display: "block",
                  margin: ".5rem 0",
                }}
                fullWidth={true}
                InputLabelProps={{ style: { color: "white" } }}
              />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Fecha"
                  value={type.fechas}
                  onChange={(newDate) => {
                    setType({ ...type, fechas: newDate });
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      InputLabelProps={{ style: { color: "white" } }}
                    />
                  )}
                  sx={{
                    display: "block",
                    margin: ".5rem 0",
                  }}
                  fullWidth={true}
                  InputProps={{ style: { color: "white" } }}
                  InputLabelProps={{ style: { color: "white" } }}
                  name="fechas"
                />
              </LocalizationProvider>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{ marginTop: "10px" }}
              >
                Actualizar
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
