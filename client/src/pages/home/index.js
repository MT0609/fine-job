import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

function Home() {
  const history = useHistory();

  useEffect(() => {
    history.replace(ROUTES.jobs);
  }, [history]);

  return (
    <div>
      Currently, due to the deadline and the requirements of project, homepage
      is job-page. Will develop homepage with newsfeed in the future.
    </div>
  );
}

export default Home;
