import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

function Companies() {
  const history = useHistory();

  useEffect(() => {
    history.replace("/search?cate=company");
  }, [history]);

  return <div></div>;
}

export default Companies;
