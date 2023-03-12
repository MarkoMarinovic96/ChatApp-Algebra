import Navigation from "./components/Navigation";
import Chat from "./components/Chat";

import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function App() {
  const [user] = useAuthState(auth);
  //  console.log(user)
  return (
    <div className='max-w-[728px] mx-auto text-center'>
      <section className='flex flex-col h-100 bg-gray-100 mt-10 shadow-xl border relative'>
        <Navigation />
        {user ? <Chat /> : null}
      </section>
    </div>
  );
}

export default App;
