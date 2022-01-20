import { useEffect, useState } from "react";
import axios from "axios";
import MainController from "../../components/navigation/mainController";
const MainTurk = ({ type , data,id }) => {

  const [dataTurk, setDataTurk] = useState(null);
  useEffect(() => {
    axios
      .get("https://api-music-uz.herokuapp.com/music/api/turk", {
        headers: {
          "Set-Cookie": "SameSite=Secure",
        },
      })
      .then(({ data }) => {
        setDataTurk(data);
      });
  }, []);
  
  

  return (
    <MainController data={dataTurk} type={type}/>
  )
};

export default MainTurk;
