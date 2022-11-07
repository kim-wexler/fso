import React from "react";

const Notification = ({ message, isError }) => {
  if (message === null) {
    return <></>;
  } else if (!isError) {
    return <div className="addedMsg">{message}</div>;
  } else {
    return <div className="errorMsg">{message}</div>;
  }
};

export default Notification;
