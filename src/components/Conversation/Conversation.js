import React, { useState, useEffect } from 'react';
import { FETCH_ALL_MESSAGES } from '../../routes';
import SyncLoader from 'react-spinners/SyncLoader';
import axios from '../../axios';
import logo from '../../resources/logo.png';
import styles from './conversation.module.css';

const Conversation = ({ openChatBox }) => {
  const [previousMessage, setPreviousMessage] = useState([]);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // state to display loader icon
  useEffect(() => {
    async function fetchAllMessages() {
      try {
        const { data: responseData } = await axios.get(FETCH_ALL_MESSAGES);
        const { prevMessages, messages } = responseData;
        setPreviousMessage(prevMessages);
        setMessages(messages);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    }
    fetchAllMessages();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.banner}>
        <img src={logo} alt="logo" className={styles.bannerImage} />
        <div className={styles.bannerContent}>
          <h3>Insent</h3>
          <p>You are chatting with InsentBot</p>
        </div>
        <span onClick={openChatBox.bind(null, false)}>X</span>
      </div>
      <div className={styles.chatBox}>
        {/* display loaded until API call is done */}
        {isLoading ? (
          <div className={styles.loader}>
            <SyncLoader color={'#097ef9'} />
          </div>
        ) : (
          <>
            {/* rendering all previous message of the conversation */}
            {previousMessage.map((message, index) => {
              if (message.provider === 'bot') {
                return <BotContent key={index} text={message.text} />;
              } else {
                return <WidgetContent key={index} text={message.text} />;
              }
            })}
            {/* rendering all message built in conversation */}
            {messages.map((message, index) => {
              if (message.type !== 'plainInput') {
                return <BotContent key={index} text={message[message.type]} />;
              } else return null; //display nothing in UI if type is plaintext
            })}
          </>
        )}
      </div>
    </div>
  );
};

const BotContent = ({ text }) => (
  <div className={styles.bot}>
    <img src={logo} alt="logo" className={styles.botImage} />
    <div
      dangerouslySetInnerHTML={{
        __html: text,
      }}
    ></div>
  </div>
);

const WidgetContent = ({ text }) => (
  <div className={styles.widget}>
    <div
      dangerouslySetInnerHTML={{
        __html: text,
      }}
    ></div>
  </div>
);

export default Conversation;
