import React from "react";

const Notification = ({ message, isError }) => {
  if (message === null) {
    return <></>;
  } else if (!isError) {
    return <div class="addedMsg">{message}</div>;
  } else {
    return <div class="errorMsg">{message}</div>;
  }
};

export default Notification;
