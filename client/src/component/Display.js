import { Card, CardContent } from "@mui/material";
import { useContext } from "react";
import ImportContext from "../ImportContext";
import NumberFormat from "react-number-format";
import { styled } from "@mui/material/styles";

export default function Display() {
  const { datos } = useContext(ImportContext);

  const MediaQuery = styled("Box")(({ theme }) => ({
    [theme.breakpoints.only("xs")]: {
      top: "15vh",
      right: "20%",
    },
    [theme.breakpoints.only("sm")]: {
      top: "15vh",
      right: "35%",
    },

    [theme.breakpoints.only("md")]: {
      top: "15vh",
      right: "45%",
    },
    [theme.breakpoints.only("lg")]: {
      top: "15vh",
      right: "45%",
    },
    [theme.breakpoints.only("xl")]: {
      top: "15vh",
      right: "45%",
    },
  }));

  return (
    <>
      <MediaQuery
        sx={{
          width: "auto",
          position: "absolute",
          top: "15vh",
          right: "85vh",
          fontSize: "42px",
        }}
      >
        <Card
          style={{
            borderStyle: "solid",
            borderColor: "white",
          }}
        >
          <CardContent
            style={{
              color: "rgba(184, 182, 185, 1)",
              backgroundColor: "rgba(101, 55, 128, 1)",
            }}
          >
            <NumberFormat
              value={datos.sum}
              prefix={"$"}
              thousandSeparator
              displayType="text"
            />
          </CardContent>
        </Card>
      </MediaQuery>
    </>
  );
}
