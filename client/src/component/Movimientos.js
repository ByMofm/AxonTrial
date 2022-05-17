import {
  Button,
  Card,
  CardContent,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { React, useState } from "react";
import { useNavigate } from "react-router-dom";

const options = [
  {
    value: "A",
    label: "A",
  },
  {
    value: "B",
    label: "B",
  },
  {
    value: "C",
    label: "C",
  },
];
export default function Movimientos() {
  const [type, setType] = useState({
    nombre: "",
    direccion: "",
    dni: "",
    condicioniva: "",
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
            backgroundColor: "rgba(255, 248, 240, 1)",
            padding: "1rem",
          }}
        >
          <Button onClick={() => navigate("/")}>Volver</Button>
          <Typography variant="5" color="black" margin={"55px"}>
            Añadir Cliente
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                label="Nombre"
                multiline
                onChange={handleChange}
                sx={{
                  display: "block",
                  margin: ".5rem 0",
                }}
                fullWidth={true}
                InputProps={{ style: { color: "black" } }}
                InputLabelProps={{ style: { color: "black" } }}
                name="nombre"
              ></TextField>
              <TextField
                label="Direccion"
                value={type.direccion}
                onChange={handleChange}
                name="direccion"
                InputProps={{
                  style: { color: "black" },
                }}
                variant="outlined"
                sx={{
                  display: "block",
                  margin: ".5rem 0",
                }}
                fullWidth={true}
                InputLabelProps={{ style: { color: "black" } }}
              />
              <TextField
                label="DNI"
                value={type.dni}
                onChange={handleChange}
                name="dni"
                InputProps={{
                  style: { color: "black" },
                }}
                variant="outlined"
                sx={{
                  display: "block",
                  margin: ".5rem 0",
                }}
                fullWidth={true}
                InputLabelProps={{ style: { color: "black" } }}
              />
              <TextField
                label="Condicion Iva"
                value={type.condicioniva}
                onChange={handleChange}
                select
                name="condicioniva"
                InputProps={{
                  style: { color: "black" },
                }}
                variant="outlined"
                sx={{
                  display: "block",
                  margin: ".5rem 0",
                }}
                fullWidth={true}
                InputLabelProps={{ style: { color: "black" } }}
              >
                {options.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </TextField>

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
