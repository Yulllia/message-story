import React from 'react'
import { BiSearch } from 'react-icons/bi';
import { useContext } from 'react';
import { localContext } from '../../context/MessageContext';

function ConversationSearch() {

    const { originalData, setLastUserMessages} = useContext(localContext);
    const inputHandler = (e) => {
        const inputText = e.target.value.toLowerCase();
        const filteredData = originalData?.filter((el) => {
          if (inputText === "") {
            return originalData;
          }
            return el.name.toLowerCase().includes(inputText);
        });
    
        setLastUserMessages([...filteredData])
      };

    return (
        <div className="search-container">
           <BiSearch/><input type="text" placeholder="Search or start new chat" onChange={inputHandler}/>
        </div>
    );
}

export default ConversationSearch




