import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FolderIcon from "@mui/icons-material/FolderSpecial";
import Home from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Search from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

export default function LabelBottomNavigation() {
  let navigate = useNavigate();

  const [value, setValue] = React.useState("uzbek");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation
      sx={{
        width: "100%",
        position: "fixed",
        bottom: 0,
        background: "#0088cc",
        zIndex: 2,
      }}
      value={value}
      showLabels
      onChange={handleChange}
    >
      <BottomNavigationAction
        label="Uzbek"
        value="uzbek"
        style={{ color: "white" }}
        icon={<Home />}
        onClick={() => {
          setTimeout(() => {
            navigate(`/uzmusic`);
          }, 100);
        }}
      />
      <BottomNavigationAction
        label="Russian"
        value="russian"
        style={{ color: "white" }}
        onClick={() => {
          navigate(`/rumusic`);
        }}
        icon={<LocationOnIcon />}
      />
      <BottomNavigationAction
        label="Search"
        value="search"
        style={{ color: "white" }}
        onClick={() => {
          navigate(`/search`);
        }}
        icon={<Search />}
      />
      <BottomNavigationAction
        label="Turkish"
        value="turkish"
        style={{ color: "white" }}
        onClick={() => {
          navigate(`/turkmusic`);
        }}
        icon={<FavoriteIcon />}
      />
      <BottomNavigationAction
        label="Special"
        value="special"
        style={{ color: "white" }}
        onClick={() => {
          navigate(`/euromusic`);
        }}
        icon={<FolderIcon />}
      />
    </BottomNavigation>
  );
}
