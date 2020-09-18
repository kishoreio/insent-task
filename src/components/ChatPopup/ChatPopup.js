import React, { useState, useEffect } from 'react';
import { FETCH_POPUP_MESSAGE } from '../../routes';
import axios from '../../axios';
import logo from '../../resources/logo.png';
import styles from './chat-popup.module.css';

const ChatPopup = ({ openChatBox }) => {
  const [user, setUser] = useState('');
  const [popupMessage, setPopupMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function fetchPopupMessage() {
      try {
        const responseData = await axios.get(FETCH_POPUP_MESSAGE);
        const {
          data: {
            popupMessage: { message },
            user: { name },
          },
        } = responseData;
        setUser(name);
        setPopupMessage(message);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    }
    fetchPopupMessage();
  }, []);

  return (
    <div
      className={`${isLoading ? styles.hide : styles.container}`}
      onClick={openChatBox.bind(null, true)}
    >
      <div className={styles.message}>
        <h3>Hello {user}</h3>
        <div
          dangerouslySetInnerHTML={{
            __html: popupMessage,
          }}
        ></div>
      </div>
      <img src={logo} alt="icon" className={styles.icon} />
    </div>
  );
};

export default ChatPopup;
