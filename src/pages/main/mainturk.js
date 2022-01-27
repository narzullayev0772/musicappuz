import { useEffect, useState } from "react";
import axios from "axios";
import MainController from "../../components/navigation/mainController";
const MainTurk = ({ type, data, id }) => {
  const [dataTurk, setDataTurk] = useState(null);
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_URL}music/turk`).then(({ data }) => {
      setDataTurk(data);
    });
  }, []);

  return <MainController data={dataTurk} type={type} />;
};

export default MainTurk;
