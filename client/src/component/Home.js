import * as React from "react";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTheme, styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { Button, Container, TableHead } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import NumberFormat from "react-number-format";

// Arreglos de las tablas
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "rgba(0, 128, 0, 1)",
    color: "rgba(255, 255, 255, 1)",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 18,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(2n)": {
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  "&:nth-of-type(2n+1)": {
    backgroundColor: "rgba(229, 229, 229, 1)",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

// Funcion para las paginas que se visualizan
function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5, alignContent: "end" }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="Primera pagina"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="Pagina anterior"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="Pagina Siguiente"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="Ultima pagina"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

// Final de arreglos para la visualizacion de las tablas

export default function Home() {
  const ButtonMediaQuery = styled("Stack")(({ theme }) => ({
    [theme.breakpoints.only("xs")]: {
      bottom: "5vh",
      left: "25%",
    },
  }));

  const [values, setValues] = useState([]);
  const navigate = useNavigate();

  const loadValues = async () => {
    const response = await fetch("http://localhost:4000/home");
    const data = await response.json();
    setValues(data);
  };
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:4000/home/${id}`, {
        method: "DELETE",
      });
      setValues(values.filter((val) => val.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadValues();
  }, []);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - values.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Container style={{ backgroundColor: "rgba(206, 211, 220, 1)" }}>
      <ButtonMediaQuery
        direction="row"
        sx={{ position: "relative", left: "55vh", top: "2vh" }}
      >
        <Button
          variant="contained"
          size="large"
          color="info"
          startIcon={<AddCircleOutlineRoundedIcon />}
          onClick={() => navigate("/home/new")}
        >
          Añadir Cliente
        </Button>
      </ButtonMediaQuery>
      <Container style={{ height: "95vh", paddingTop: "5vh" }}>
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 700 }}
            aria-label="custom table"
            style={{ backgroundColor: "rgba(0, 128, 0, 1)" }}
          >
            <TableHead>
              <TableRow>
                <StyledTableCell>Nombre</StyledTableCell>
                <StyledTableCell align="center">Direccion</StyledTableCell>
                <StyledTableCell align="center">Dni</StyledTableCell>
                <StyledTableCell align="center">Condicion IVA</StyledTableCell>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? values.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : values
              ).map((row) => {
                return (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell component="th" scope="row">
                      {row.nombre}
                    </StyledTableCell>
                    <StyledTableCell style={{ width: 160 }} align="center">
                      {row.direccion}
                    </StyledTableCell>
                    <StyledTableCell
                      style={{
                        width: 160,
                      }}
                      align="center"
                    >
                      <NumberFormat
                        displayType="text"
                        value={row.dni}
                        format="## ### ###"
                      ></NumberFormat>
                    </StyledTableCell>
                    <StyledTableCell style={{ width: 160 }} align="center">
                      {row.condicioniva}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <Button
                        variant="outlined"
                        color="warning"
                        onClick={() => navigate(`/home/${row.id}/update`)}
                        startIcon={<EditRoundedIcon />}
                      >
                        Modificar
                      </Button>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Button
                        variant="outlined"
                        color="inherit"
                        onClick={() => handleDelete(row.id)}
                        startIcon={<DeleteForeverRoundedIcon />}
                      >
                        Borrar
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}

              {emptyRows > 0 && (
                <StyledTableRow style={{ height: 53 * emptyRows }}>
                  <StyledTableCell colSpan={6} />
                </StyledTableRow>
              )}
            </TableBody>
            <TableFooter style={{ backgroundColor: "rgba(0, 128, 0, 1)" }}>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[10, 25, { label: "All", value: -1 }]}
                  colSpan={3}
                  count={values.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                  style={{
                    color: "rgba(255, 255, 255, 1)",
                    border: 0,
                    position: "relative",
                    left: "55vh",
                  }}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Container>
    </Container>
  );
}
