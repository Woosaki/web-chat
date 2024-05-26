import User from "./User";

const OnlineUsers = ({ onlineUsers }) => {
  return (
    <section id="online-users-section">
      <h2>Online Users</h2>
      <ul id="online-users">
        {onlineUsers.map((user, index) => (
          <User key={index} user={user} index={index} />
        ))}
      </ul>
    </section>
  );
};

export default OnlineUsers;
