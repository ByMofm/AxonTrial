import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./component/Home";
import Movimientos from "./component/Movimientos";
import { Container } from "@mui/material";
import Actualizar from "./component/Actualizar";
import { ValueProvider } from "./ImportContext";

function App() {
  return (
    <BrowserRouter>
      <Container>
        <ValueProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home/new" element={<Movimientos />} />
            <Route path="/home/:id/update" element={<Actualizar />} />
          </Routes>
        </ValueProvider>
      </Container>
    </BrowserRouter>
  );
}

export default App;
