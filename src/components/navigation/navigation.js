import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MyDrawerLeft from "./drawer";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "50vh",
      "&:focus": {
        width: "80vh",
      },
    },
  },
}));

export default function MenuAppBar({ width, type, parentFunc }) {
  const [search, setSearch] = React.useState("");
  const [display, setDisplay] = React.useState("flex");

  return (
    <Box sx={{ flexGrow: 1 }} style={{ position: "sticky", top: 0, zIndex: 2 }}>
      <AppBar position="static">
        <Toolbar>
          {width && <MyDrawerLeft />}
          {type && (
            <Typography
              variant="h6"
              component="div"
              sx={{ display: display, flexGrow: 1, padding: "0 10%" }}
            >
              Webers.uz
            </Typography>
          )}
          <p>{type}</p>
          {!type && (
            <Search style={{ width: "100%" }}>
              <div style={{ position: "absolute", left: "1%", top: "20%" }}>
                <SearchIcon />
              </div>
              <StyledInputBase
                required
                placeholder="Search music ... "
                inputProps={{ "aria-label": "search" }}
                onFocus={() => {
                  setDisplay("none");
                }}
                onBlur={() => {
                  setDisplay("flex");
                }}
                onKeyUp={(e)=>{
                  if(e.key==="Enter"){
                    e.preventDefault();
                    parentFunc(search);
                  }
                }}
                onChange={(e) => {
                  setSearch(e.currentTarget.value);
                }}
                value={search}
              />
            </Search>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
