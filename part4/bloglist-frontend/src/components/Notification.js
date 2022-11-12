const Notification = ({ notification }) => {
  if (notification === null) {
    return null;
  }

  const style = {
    color: notification.type === "error" ? "red" : "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  // css styling here...
  return <div style={style}>Message: {notification.message}</div>;
};

export default Notification;
