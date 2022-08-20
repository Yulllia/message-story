import React, { useState, useContext } from "react";
import { IoMdSend } from "react-icons/io";
import { localContext } from "../../context/MessageContext";

export default function ChatInput({ handleSendMsg }) {
  const [message, setMessage] = useState("");
  const { messageData } = useContext(localContext);

  const sendChat = (event) => {
    event.preventDefault();
    if (message.length > 0) {
      handleSendMsg(message, messageData?.name);
      setMessage("");
    }
  };

  return (
    <div className="input-block">
      <form className="input-container">
        <input
          type="text"
          placeholder="Type your message"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <div onClick={(event) => sendChat(event)}>
         <IoMdSend/>
        </div>
      </form>
      </div>
  );
}