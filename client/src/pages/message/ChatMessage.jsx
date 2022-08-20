import { localContext } from "../../context/MessageContext";
import { useContext, useEffect, useRef } from "react";
import ChatInput from "../chatInput/ChatInput";
import { useHttp } from "../../hooks/UseHttpHook";
import Spinner from "../../components/Spinner";

function ChatMessage() {
  const { messageData, getMessageData, messages } = useContext(localContext);
  const { request } = useHttp();
  const scrollRef = useRef();
  const userMessages = messages.sort((a, b) => new Date(a.date) - new Date(b.date));

  useEffect(() => {
    getMessageData();
  }, [messageData?.name]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSendMsg(message, name) {
    await request(
      "/api/auth/message",
      "POST",
      JSON.stringify({
        from: "myself",
        name: messageData.name,
        message: message,
        date: new Date(),
      })
    ).then(() => getMessageData());

    const dataResponse = await request(
      "https://api.chucknorris.io/jokes/random",
      "GET"
    );

    if (dataResponse?.value) {
      setTimeout(async () => {
        await request(
          "/api/auth/message",
          "POST",
          JSON.stringify({
            from: messageData.name,
            name: messageData.name,
            message: dataResponse?.value,
            date: new Date(),
          })
        ).then(() => getMessageData());
      }, 10000);
    }
  }

  return (
    <>
      <div className="chat-messages">
        {userMessages ? userMessages.map((message, i) => {
          if (message.name === messageData?.name) {
            const timeElapsed = message.date;
            const today = new Date(timeElapsed);
            const current =
              today.toLocaleDateString('en-US',{hour:'numeric', minute:'numeric', hour12:true});
            return (
              <div ref={scrollRef} key={i}>
                <div
                  className={`message ${
                    message.from === "myself" ? "sended" : "recieved"
                  }`}
                >
                  {message.from === "myself" && (
                    <img src={messageData.image} alt="person" />
                  )}
                  <div className="content">
                    <p>{message.message}</p>
                  </div>
                </div>
                <div
                  className={`message date ${
                    message.from === "myself" ? "sended" : "recieved"
                  }`}
                >
                  {current}
                </div>
              </div>
            );
          }
        }) : (
            <Spinner/>
        )}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </>
  );
}

export default ChatMessage;
