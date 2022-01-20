import { useEffect, useState } from "react";
import axios from "axios";
import MainController from "../../components/navigation/mainController";
const MainEuro = ({ type}) => {

  const [dataEuro, setDataEuro] = useState(null);

  useEffect(() => {
    axios
      .get("https://api-music-uz.herokuapp.com/music/api/udar/", {
        headers: {
          "Set-Cookie": "SameSite=Secure",
        },
      })
      .then(({ data }) => {
        setDataEuro(data);
      });
  }, []);  
  return (
    <MainController data={dataEuro} type={type}/>
  );
};

export default MainEuro;
