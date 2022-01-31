import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MyDrawerLeft from "./drawer";
import SearchIcon from "@mui/icons-material/Search";
import Comment from "@mui/icons-material/Comment";
import Badge from "@mui/material/Badge";
import InputBase from "@mui/material/InputBase";
import { IconButton } from "@mui/material";
import { FormControl, MenuItem, Select } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Speech from "./speech";

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
  let navigate = useNavigate();

  const [search, setSearch] = React.useState("");
  const [display, setDisplay] = React.useState("flex");

  const [speechText, setSpeechText] = React.useState("");
  const [stop, setStop] = React.useState(false);
  const [lang, setLang] = React.useState("uz");

  React.useEffect(() => {
    if (!type) parentFunc(!stop ? speechText : null);
    stop && setSearch(speechText);
  }, [speechText, parentFunc, stop, type]);

  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
    setLang(event.target.value);
  };

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
          {type && (
            <>
              <Box sx={{ maxWidth: 120, mx: 1 }}>
                <FormControl fullWidth variant="standard">
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="UZ"
                    onChange={handleChange}
                  >
                    <MenuItem value={"uz-UZ"}>UZ</MenuItem>
                    <MenuItem value={"ru"}>RU</MenuItem>
                    <MenuItem value={"en-US"}>EN</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <IconButton
                onClick={() => {
                  navigate("/comment");
                }}
              >
                <Badge color="secondary" badgeContent={20}>
                  <Comment htmlColor="#fff" />
                </Badge>
              </IconButton>
            </>
          )}
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
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    parentFunc(search);
                  } else {
                    parentFunc(null);
                  }
                }}
                onChange={(e) => {
                  setSearch(e.currentTarget.value);
                }}
                value={search}
              />
            </Search>
          )}
          {!type && (
            <Speech
              setSpeechText={setSpeechText}
              setStop={setStop}
              lang={lang}
            />
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
