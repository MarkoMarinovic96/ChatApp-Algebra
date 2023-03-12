import React, { useState, useEffect, useRef } from 'react';
import Message from './Message';
import InputMessage from './InputMessage';
import { db } from '../firebase';
import { query, collection, orderBy, onSnapshot } from 'firebase/firestore';

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Array<any>>([]);
  const scroll = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('timestamp'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let messages: any[] = [];
      querySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id});
      });
      setMessages(messages);
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <main className='flex flex-col p-[10px]'>
        {messages &&
          messages.map((message) => (
            <Message key={message.id} message={message} />
          ))}
      </main>
      <InputMessage scroll={scroll} />
      <span ref={scroll}></span>
    </>
  );
};

export default Chat;