import React from 'react';
import SignIn from './SignIn'
import SignOut from './SignOut'
import { auth } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

const Navigation: React.FC = () => {
  const [user] = useAuthState(auth)
  //console.log(user)

  return (
    <div className='sticky top-0 z-10 bg-gray-800 h-20 flex justify-between items-center p-4'>
      <h1 className='text-white text-xl'>Chat App-Algebra </h1>
      {user ? <SignOut /> : <SignIn />}
    </div>
  );
};

export default Navigation;
