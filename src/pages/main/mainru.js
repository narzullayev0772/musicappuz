import { useEffect, useState } from "react";
import axios from "axios";
import MainController from "../../components/navigation/mainController";
const MainRu = ({ type}) => {

  const [dataRu, setDataRu] = useState(null);
  
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}music/ru`)
      .then(({ data }) => {
        setDataRu(data);
      });
  }, []);
  return (
    <MainController data={dataRu} type={type}/>
  );
};

export default MainRu;
