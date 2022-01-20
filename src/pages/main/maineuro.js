import { useEffect, useState } from "react";
import axios from "axios";
import MainController from "../../components/navigation/mainController";
const MainEuro = ({ type}) => {

  const [dataEuro, setDataEuro] = useState(null);
  const [page,setPageRu] = useState(1);

  useEffect(() => {
    axios
      .get("https://api-music-uz.herokuapp.com/music/api/udar/"+page, {
        headers: {
          "Set-Cookie": "SameSite=Secure",
        },
      })
      .then(({ data }) => {
        setDataEuro(data);
      });
  }, [page]);  
  return (
    <MainController data={dataEuro} type={type}/>
  );
};

export default MainEuro;
