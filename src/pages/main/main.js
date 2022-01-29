import { useEffect, useState } from "react";

import axios from "axios";
import MainController from "../../components/navigation/mainController";
const Main = ({ type }) => {
  const [dataUZ, setDataUZ] = useState(null);

  const [page, setPage] = useState();
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_URL}music/uz`).then(({ data }) => {
      setDataUZ(data);
    });
  }, [page]);

  return <MainController data={dataUZ} type={type} setPage={setPage} />;
};

export default Main;
