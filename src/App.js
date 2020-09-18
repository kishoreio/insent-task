import React, { useState } from 'react';
import ChatPopup from './components/ChatPopup/ChatPopup';
import Conversation from './components/Conversation/Conversation';

function App() {
  const [visible, setVisible] = useState(false);
  const openChatBox = (bool) => {
    setVisible(bool);
  };
  return (
    <>
      {visible === false ? (
        <ChatPopup openChatBox={openChatBox} />
      ) : (
        <Conversation openChatBox={openChatBox} />
      )}
    </>
  );
}

export default App;
