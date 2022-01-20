import { useEffect, useState } from "react";
import axios from "axios";
import MainController from "../../components/navigation/mainController";
const MainRu = ({ type}) => {

  const [dataRu, setDataRu] = useState(null);
  
  useEffect(() => {
    axios
      .get("https://api-music-uz.herokuapp.com/music/api/ru", {
        headers: {
          "Set-Cookie": "SameSite=Secure",
        },
      })
      .then(({ data }) => {
        setDataRu(data);
      });
  }, []);
  return (
    <MainController data={dataRu} type={type}/>
  );
};

export default MainRu;
