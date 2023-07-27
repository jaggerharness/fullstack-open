const Notification = ({ message }) => {
  if (message.message === "") {
    return null;
  } else {
    if (message.type === "success") {
      return <div className="success">{message.message}</div>;
    }
    return <div className="error">{message.message}</div>;
  }
};

export default Notification;