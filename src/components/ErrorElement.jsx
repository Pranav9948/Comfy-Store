import React from "react";
import { useRouteError } from "react-router-dom";

const ErrorElement = () => {
  const error = useRouteError();

  console.log(error);

  return <>{error && <div>something went wrong...</div>}</>;
};

export default ErrorElement;
