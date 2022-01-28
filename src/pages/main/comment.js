import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { IconButton, TextField } from "@mui/material";
import { Send } from "@mui/icons-material";
import Loading from "../../components/navigation/loading";

export default function Comment() {
  const [comment, setComment] = React.useState(null);
  const [commentText, setCommentText] = React.useState("");

  React.useEffect(() => {
    axios.get(`${process.env.REACT_APP_URL}music/comment`).then(({ data }) => {
      setComment(data.comments);
    });
  }, []);

  const handleClick = () => {
    setCommentText("");
    setComment((prev) => [
      ...prev,
      {
        description: commentText,
        user: "user" + Date.now(),
        time: `${Date.now()}`,
      },
    ]);
    if (commentText !== undefined) {
      axios
        .post("https://api-music-uz.herokuapp.com/api/v1/music/comment", {
          description: commentText,
          user: "user" + Date.now(),
        })
        .then((response) => console.log(response));
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        maxHeight: "100vh",
      }}
    >
      <List
        sx={{
          width: "100%",
          maxWidth: 560,
          maxHeight: "100vh",
          overflowY: "auto",
          paddingTop: 0,
          background: "#0099cc",
          paddingBottom: "10vh",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            position: "sticky",
            top: "0px",
            padding: "10px 0",
            zIndex: 2,
            background: "#0099cc",
            color: "#fff",
            boxShadow: "1px 1px 5px #000",
          }}
        >
          Comments
        </h1>
        {comment ? (
          comment.map((el, index) => (
            <div key={index}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="User" />
                </ListItemAvatar>
                <ListItemText
                  sx={{
                    background: "#0088cc",
                    borderRadius: "10px",
                    padding: "10px",
                  }}
                  primary={
                    <Typography
                      sx={{
                        color: "yellow",
                        wordBreak: "break-word",
                        fontWeight: "bolder",
                        paddingBottom: 1,
                      }}
                    >
                      {el.user}
                    </Typography>
                  }
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{
                          display: "inline",
                          color: "#ececec",
                          wordBreak: "break-word",
                        }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {`  ${el.description}`}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 10,
                          position: "absolute",
                          right: 0,
                          bottom: 0,
                        }}
                        component="span"
                        color="text.secondary"
                      >
                        {/* {Date.now().split("T")[1].slice(0, 5)} */}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
            </div>
          ))
        ) : (
          <Loading />
        )}
      </List>
      <div
        style={{
          position: "fixed",
          bottom: 0,
          zIndex: 2,
          maxWidth: 560,
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          background: "#0099cc",
          padding: "5px 0",
        }}
      >
        <TextField
          label="Comment"
          placeholder="Comment here..."
          multiline
          maxRows={4}
          variant="standard"
          sx={{ width: "85%", ml: "5%", color: "white" }}
          value={commentText}
          onChange={(e) => {
            let text = e.target.value;
            setCommentText(text);
          }}
        />
        <IconButton onClick={handleClick}>
          <Send htmlColor="#fff" />
        </IconButton>
      </div>
    </div>
  );
}
