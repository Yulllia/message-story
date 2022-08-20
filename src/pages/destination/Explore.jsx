import Chats from "../chats/Chats";
import ConversationSearch from "../search/ConversationSearch";
import SignInImage from "../signImage/SignInImage";
import ChatTitle from "../chat-title/ChatTitle";
import ChatMessage from "../message/ChatMessage";
import { useState, useEffect } from "react";

function Explore() {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(()=>{
    setShowMessage(true)
  },[])

  function useMediaQuery(
    query,
    defaultMatches = window.matchMedia(query).matches
  ) {
    const [matches, setMatches] = useState(
      window.matchMedia(defaultMatches).matches
    );

    useEffect(() => {
      const media = window.matchMedia(query);

      if (media.matches !== matches) setMatches(media.matches);

      const listener = () => setMatches(media.matches);

      media.addEventListener("change", listener);

      return () => media.removeEventListener("change", listener);
    }, [query, matches]);
    return matches;
  }

  const matchesQuery = useMediaQuery("(min-width: 1020px)");

  return (
    <div className="chatWidth">
      {(!showMessage || matchesQuery) && (
        <div className="contactList">
          <div className="titleUser">
            <SignInImage />
            <ConversationSearch />
          </div>
          <Chats setShowMessage={setShowMessage} />
        </div>
      )}
      {(showMessage || matchesQuery) && (
        <div className="chatTitle">
          <ChatTitle
            showContactList={showMessage}
            setShowContactList={setShowMessage}
          />
          <ChatMessage />
        </div>
      )}
    </div>
  );
}

export default Explore;
