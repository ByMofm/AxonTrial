import {
  Button,
  Card,
  CardContent,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { React, useState, forwardRef, useContext } from "react";
import { PropTypes } from "prop-types";
import NumberFormat from "react-number-format";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { useNavigate } from "react-router-dom";
import frLocale from "date-fns/locale/fr";
import ImportContext from "../ImportContext";

const options = [
  {
    value: "Ingreso",
    label: "Ingreso",
  },
  {
    value: "Egreso",
    label: "Gasto",
  },
];

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

export default function Movimientos() {
  const { importNumber } = useContext(ImportContext);

  const [type, setType] = useState({
    tipo: "",
    concepto: "",
    importe: "",
    fechas: null,
  });

  const handleChange = (event) => {
    setType({ ...type, [event.target.name]: event.target.value });

    console.log(event.target.name, event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:4000/home/new", {
      method: "POST",
      body: JSON.stringify(type),
      headers: { "Content-Type": "application/json" },
    });
    await response.json();
    importNumber();
    navigate("/");
  };

  const navigate = useNavigate();

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
          <Typography variant="5" color="white" margin={"55px"}>
            Añadir Movimiento
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                name="tipo"
                select
                variant="outlined"
                label="Movimiento"
                value={type.tipo}
                onChange={handleChange}
                sx={{
                  display: "block",
                  margin: ".5rem 0",
                }}
                fullWidth={true}
                InputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
              >
                {options.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </TextField>
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
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                locale={frLocale}
              >
                <DatePicker
                  mask="__/__/____"
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
                  name="fechas"
                />
              </LocalizationProvider>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{ marginTop: "10px" }}
              >
                Agregar
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
