import { useEffect, useState } from "react";

import axios from "axios";
import MainController from "../../components/navigation/mainController";
const Main = ({ type }) => {
  const [dataUZ, setDataUZ] = useState(null);

  const [page,setPage] = useState();
  useEffect(() => {
    axios
      .get("https://api-music-uz.herokuapp.com/music/api/uz/", {
        headers: {
          "Set-Cookie": "SameSite=Secure",
        },
      })
      .then(({ data }) => {
        setDataUZ(data);
      });
  }, [page]);

  return <MainController data={dataUZ} type={type} setPage={setPage}/>;
};

export default Main;
