import { useSelector, connect } from "react-redux";

const Notification = (props) => {
  // const notification = useSelector((state) => state.notification);

  const style =
    props.notification === ""
      ? { display: "none" }
      : {
          border: "solid",
          padding: 10,
          borderWidth: 1,
        };
  return <div style={style}>{props.notification}</div>;
};

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  };
};

const connectedNotification = connect(mapStateToProps)(Notification);

// export default Notification;
export default connectedNotification;
