/** @format */

import "./List.css";
import ChatList from "./chatList/chatList";
import UserInfo from "./userInfo/UserInfo";

const List = () => {
  return <div className="list">
    <UserInfo />
   <ChatList />
  </div>;
};

export default List;
