import React from "react";
import { useContext } from "react";
import { useEffect, useRef} from "react";
import { localContext } from "../../context/MessageContext";

function Chats({setShowMessage}) {
  const { getItem, messages, getData, getContact, lastUserMessages, messageData} =
    useContext(localContext);
    const scrollRef = useRef();

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getContact();
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chatBlock">
      <h1 className="title">Chats</h1>
      <ul className="listStyle" ref={scrollRef}>
        {lastUserMessages.length ? (
          lastUserMessages.map((item) => {
            const timeElapsed = item.date;
            const today = new Date(timeElapsed);
            const current =
              today.toLocaleDateString("en-us", { month: "short" }) +
              " " +
              today.getDate() +
              "," +
              today.getFullYear();
            return (
              <React.Fragment key={item._id}>
                <li onClick={()=>setShowMessage(true)}>
                  <div
                    className={`conversation ${
                      messageData.name === item.name && "activeBlock"
                    }`}
                    onClick={() => getItem(item._id, item.image, item.name)}
                  >
                      <img
                        src={`${item.image}`}
                        alt="userpicture"
                        width="40px"
                        height="40px"
                      />
                      <div className="colored-circle">
                        <div className="checkmark"></div>
                      </div>
                    <div className="title-text">{item.name}</div>
                    <div className="created-date">{current}</div>
                    <div className="conversation-message">{item.message}</div>
                  </div>
                </li>
              </React.Fragment>
            );
          })
        ) : (
          <p className="noContactFound">No Contacts found!</p>
        )}
      </ul>
    </div>
  );
}

export default Chats;
