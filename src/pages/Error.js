import React from "react";

const ErrorPage = () => {
  let title = "An error occurred";
  let message = "Could not find this page!";
  return (
    <main className="text-center mt-5 mx-auto">
      <h1>{title}</h1>
      <p>{message}</p>
    </main>
  );
};

export default ErrorPage;
