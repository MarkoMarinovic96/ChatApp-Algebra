import React from "react";
import { auth } from "../firebase";

interface Props {
  message: {
    uid: string;
    name: string;
    text: string;
    timestamp:number
    picture: string;
  };
}

const style = {
  message: `flex flex-row items-center max-w-[100%]`,
  name: `flex flex-row items-center nowrap min-w-[100px] max-w-[100px]`,
  sent: `flex-row-reverse text-end float-right `,
  received: `float-left `,
  picture: `w-[16px] h-[16px]`,
};

const Message: React.FC<Props> = ({ message }) => {
  
  const colorPicker =
    message.uid === auth.currentUser?.uid
      ? "bg-[#395dff] text-white float-right shadow-xl mx-2 my-3 py-2 px-3 rounded-2xl  "
      : "bg-[#e5e5ea] text-black float-right shadow-xl mx-2 my-3 py-2 px-3 rounded-2xl ";
  const messageClass =
    message.uid === auth.currentUser?.uid
      ? `${style.sent}`
      : `${style.received}`;

  return (
    <div className={`${style.message} ${messageClass}`}>
      <div>
        <p className={style.name}>
          {message.picture && (
            <img className={`${style.picture}`} src={message.picture} alt="" />
          )}
          {message.name}
        </p>
      </div>
      <div>
        <p className={colorPicker}>{message.text}</p>
      </div>
    </div>
  );
};

export default Message;
