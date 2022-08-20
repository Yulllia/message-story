import { useContext } from "react";
import { localContext } from "../../context/MessageContext";
import { BsArrowLeftCircle } from "react-icons/bs";
import Spinner from "../../components/Spinner";

function ChatTitle({showContactList, setShowContactList}) {
  const { messageData } = useContext(localContext);

  function getContactList(){
    setShowContactList(!showContactList)
  }
  if(!messageData){
    return <Spinner/>
  }

  return (
    <div className="titleMessage">
      <div className="arrowBlock">
        <BsArrowLeftCircle className="arrowRight" onClick={getContactList}/>
        <img src={messageData?.image} alt="user" />
      </div>

      <div className="colored-circle">
        <div className="checkmark"></div>
      </div>
      <p className="title">{messageData?.name}</p>
    </div>
  );
}

export default ChatTitle;
