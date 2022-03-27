import * as React from "react";
import { useContext, useEffect, useState } from "react";
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
import moment from "moment";
import Display from "./Display";
import ImportContext from "../ImportContext";
import { useNavigate } from "react-router-dom";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import NumberFormat from "react-number-format";

// Arreglos de las tablas
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "rgba(156, 53, 135, 1)",
    color: "rgba(230, 230, 250, 1)",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 18,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(2n)": {
    backgroundColor: "rgba(224, 194, 242, 1)",
  },
  "&:nth-of-type(2n+1)": {
    backgroundColor: "rgba(247, 231, 251, 1)",
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
  const { importNumber } = useContext(ImportContext);

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
      importNumber();
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
    <Container style={{ backgroundColor: "rgba(63, 22, 81, 1)" }}>
      <Box sx={{ height: "40vh" }}>
        <Display />
      </Box>
      <ButtonMediaQuery
        direction="row"
        sx={{ position: "relative", bottom: "20vh", left: "15vh" }}
      >
        <Button
          variant="contained"
          size="large"
          color="info"
          startIcon={<AddCircleOutlineRoundedIcon />}
          onClick={() => navigate("/home/new")}
        >
          Añadir
        </Button>
      </ButtonMediaQuery>
      <Container style={{ height: "55vh" }}>
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 700 }}
            aria-label="custom table"
            style={{ backgroundColor: "rgba(156, 53, 135, 1)" }}
          >
            <TableHead>
              <TableRow>
                <StyledTableCell>Movimiento</StyledTableCell>
                <StyledTableCell align="right">Concepto</StyledTableCell>
                <StyledTableCell align="right">Importe</StyledTableCell>
                <StyledTableCell align="right">Fecha</StyledTableCell>
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
                    <StyledTableCell
                      component="th"
                      scope="row"
                      style={{
                        color:
                          row.tipo === "Ingreso"
                            ? "rgba(0, 171, 9, 1)"
                            : "rgba(255, 0, 0, 1)",
                      }}
                    >
                      {row.tipo}
                    </StyledTableCell>
                    <StyledTableCell style={{ width: 160 }} align="right">
                      {row.concepto}
                    </StyledTableCell>
                    <StyledTableCell
                      style={{
                        width: 160,
                        color:
                          row.tipo === "Ingreso"
                            ? "rgba(0, 171, 9, 1)"
                            : "rgba(255, 0, 0, 1)",
                      }}
                      align="right"
                    >
                      <NumberFormat
                        displayType="text"
                        value={row.importe}
                        prefix={"$"}
                        thousandSeparator
                      ></NumberFormat>
                    </StyledTableCell>
                    <StyledTableCell style={{ width: 160 }} align="right">
                      {moment(row.fechas).format("DD/MM/YYYY")}
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
                    <StyledTableCell align="right">
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
            <TableFooter style={{ backgroundColor: "rgba(156, 53, 135, 1)" }}>
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
                    color: "rgba(230, 230, 250, 1)",
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
