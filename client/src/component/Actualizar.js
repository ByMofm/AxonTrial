import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";
import { useState, useEffect } from "react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Actualizar() {
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

    const response = await fetch(`http://localhost:4000/home/${params.id}`, {
      method: "PUT",
      body: JSON.stringify(type),
      headers: { "Content-Type": "application/json" },
    });
    await response.json();
    navigate("/");
  };

  const navigate = useNavigate();
  const params = useParams();

  const loadValue = async (id) => {
    const res = await fetch(`http://localhost:4000/home/${id}`);
    const data = await res.json();
    setType({
      nombre: data.nombre,
      direccion: data.direccion,
      dni: data.dni,
      condicioniva: data.condicioniva,
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
            backgroundColor: "rgba(255, 248, 240, 1)",
            padding: "1rem",
          }}
        >
          <Button onClick={() => navigate("/")}>volver</Button>
          <Typography variant="5" margin={"55px"} color="black">
            Actualizar Cliente
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
                value={type.nombre}
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
                variant="outlined"
                label="Dni"
                multiline
                onChange={handleChange}
                sx={{
                  display: "block",
                  margin: ".5rem 0",
                }}
                fullWidth={true}
                InputProps={{ style: { color: "black" } }}
                InputLabelProps={{ style: { color: "black" } }}
                name="dni"
                value={type.dni}
              ></TextField>
              <TextField
                variant="outlined"
                label="Condicion Iva"
                select
                onChange={handleChange}
                sx={{
                  display: "block",
                  margin: ".5rem 0",
                }}
                fullWidth={true}
                InputProps={{ style: { color: "black" } }}
                InputLabelProps={{ style: { color: "black" } }}
                name="condicioniva"
                value={type.condicioniva}
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
                Actualizar
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
