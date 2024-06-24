import Data from "./components/Data";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { auth, provider } from './firebase';
import styled from 'styled-components';
import { useState } from 'react';

const LoginWrapper = styled.div`
  background: lightgrey;
  padding: 20px;
  width: 400px;
  margin: 0px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
  img {
    width: 100px;
  }
  button {
    width: 100%;
    background: darkmagenta;
    padding: 10px 20px;
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 5px;
    font-size: 16px;
    border: 0;
    outline: 0;
    border-radius: 5px;
    cursor: pointer;
    margin-top:20px
  }
`

function App() {
  const [user, setUser] = useState(null);

  const signIn = () => {
    auth.signInWithPopup(provider)
            .then(({ user }) => setUser(user))
            .catch(err => alert(err))
  }
  return (
    <>
    {user ? (
      <>
        <Header photoURL={user.photoURL} />
        <div className="App">
          <Sidebar />
          <Data />
        </div>
      </>
    ) : (
          <LoginWrapper>
            <img src="https://cdn1.iconfinder.com/data/icons/application-file-formats/128/microsoft-onenote-1024.png" alt="notez" />
            <button onClick={signIn}>LOGIN IN QUICKNOTEZ</button>
          </LoginWrapper>
    )
    }
    </>
  );
}

export default App;
