import React from 'react';
import { auth } from '../firebase';

const SignOut: React.FC = () => {
  const signOut = () => {
    auth.signOut();
  }

  return (
    <button onClick={signOut} className='bg-gray-200 px-4 py-2 hover:bg-gray-100'>
      Logout
    </button>
  )
}

export default SignOut;
