const User = ({ user, index }) => {
  return <li style={{ color: index === 0 ? "#0784b5" : "#eee" }}>{user}</li>;
};

export default User;
