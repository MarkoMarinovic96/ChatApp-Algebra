import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

interface Props {
  scroll: React.RefObject<HTMLSpanElement>;
}

const InputMessage: React.FC<Props> = ({ scroll }) => {
  const [input, setInput] = useState('');

  const inputMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input === '') {
      alert('Please enter a valid message');
      return;
    }
    const { uid, displayName,photoURL } = auth.currentUser!;
    await addDoc(collection(db, 'messages'), {
      text: input,
      name: displayName,
      picture:photoURL,
      uid,
      timestamp: serverTimestamp(),
    });
    
    setInput('');
    scroll.current!.scrollIntoView({ behavior: 'smooth' });
  };
  const handleKeyDown = (event: { key: string; }) => {
      if (event.key === 'Enter') {
        setInput(input);
      }
    };

  return (
    <form onSubmit={inputMessage}  className='h-full w-full max-w-[728px]  flex text-xl sticky bottom-0 '>
      <input
        value={input}
        onKeyDown={handleKeyDown}
        onChange={(e) => setInput(e.target.value)}
        className='w-full text-xl p-3 bg-gray-900 text-white outline-none border-none'
        type='text'
        placeholder='Send your message'
      />
      <button className='w-[20%] bg-[#395dff] text-white hover:opacity-75' type='submit'>
      <img
          className="w-100 h-fit"
          src="data:image/png;base64,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"
          alt=""
        />
      </button>
    </form>
  );
};

export default InputMessage;
