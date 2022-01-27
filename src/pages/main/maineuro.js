import { useEffect, useState } from "react";
import axios from "axios";
import MainController from "../../components/navigation/mainController";
const MainEuro = ({ type}) => {

  const [dataEuro, setDataEuro] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}music/udar`)
      .then(({ data }) => {
        setDataEuro(data);
      });
  }, []);  
  return (
    <MainController data={dataEuro} type={type}/>
  );
};

export default MainEuro;
