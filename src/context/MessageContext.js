import { createContext } from "react";
import { useState } from "react";
import { useHttp } from "../hooks/UseHttpHook";
export const localContext = createContext();

function ContextLocalStorage(props) {
    const [messageData, setMessageData] = useState();
    const [messages, setMessages] = useState([]);

    const [ userData, setUserData] = useState(null);
    const [lastUserMessages, setLastUserMessages] = useState([]);
    const [originalData, setOriginalData] = useState([]);


    const { request } = useHttp();
 

  function getItem(id, image, name) {
    setMessageData({id:id, image:image,name:name})
    return { id, image, name };
  }

  const getMessageData = async () => {
    if (messageData?.name) {
   const getData = await request(
     `/api/auth/message`,
     "GET"
   );
   setMessages([...getData.message])
 }};

    const getData = async () => {
      const rawResponse = await request(`/api/auth/getUserChat`);
      setUserData(rawResponse?.data);
      getItem(rawResponse?.data[0]._id, rawResponse?.data[0].image, rawResponse?.data[0].name)
    };

    const getContact = () => {
    const userMessages = messages.sort((a, b) => new Date(b.date) - new Date(a.date));
    const lastMessages = [];
    const names = [];
    userMessages.map(item => {
      if (!names.includes(item.name)) {
        names.push(item.name);
        lastMessages.push(item);
      }
    });
    lastMessages.map(item => item.image = userData?.find(data => item.name === data.name).image);
    setLastUserMessages([...lastMessages])
    setOriginalData([...lastMessages])
}
  
  return (
    <localContext.Provider value={{ getItem, messageData, getMessageData,userData, messages, getData, getContact, originalData,lastUserMessages, setLastUserMessages}}>
      {props.children}
    </localContext.Provider>
  );
}

export default ContextLocalStorage;
