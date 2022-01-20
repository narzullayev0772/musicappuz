import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Music from "@mui/icons-material/MusicNote";
import Search from "@mui/icons-material/Search";
import Logout from "@mui/icons-material/Logout";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
export default function MyDrawerLeft(props) {
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List style={{ position: "relative", height: "100vh" }}>
        {["UzMusic", "RuMusic", "EuroMusic", "TurkMusic", "Search"].map(
          (text, index) => (
            <Link to={"/" + text.toLowerCase()} key={index}>
              <ListItem button>
                <ListItemIcon style={{ color: "blueviolet" }}>
                  {index !== 4 ? <Music /> : <Search />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            </Link>
          )
        )}
        <ListItem
          button
          key="setting"
          style={{ color: "red", position: "absolute", bottom: 0 }}
        >
          <ListItemIcon style={{ color: "red" }}>
            <Logout />
          </ListItemIcon>
          <ListItemText primary={"Log Out"} />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(anchor, true)}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, props.left)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
