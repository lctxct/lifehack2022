import './App.css';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Buddying from './pages/Buddying';
import Login from './pages/Login'
import NotFound from './pages/NotFound';
import { useEffect, useState } from 'react';

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [token, setToken] = useState(false)
  const [username, setUsername] = useState("John Doe")

  useEffect(() => {
    const localStorageToken = localStorage.getItem("auth-token")
    if (localStorageToken !== null) {
      window.token = localStorageToken
      setToken(localStorageToken)
    }
  })

  const handleNewLogin = (token, rememberMe) => {
    if (rememberMe) {
      localStorage.setItem("auth-token", token)
    }
    setToken(token)
    setUsername(token.split(".")[0])
  }

  const setPage = page => {
    console.log(page);
    setCurrentPage(page);
  }

  return (
    <div className="App">
      {token ? (
        <div>
          <NavBar setPage={setPage} />
          {currentPage === 0 && <Home />}
          {currentPage === 1 && <Buddying />}
          {currentPage === 2 && <NotFound />}
          {currentPage > 2 && <NotFound />}
        </div>
      ) : (
        <Login handleNewLogin={handleNewLogin}/>
      )
      }

    </div >
  );
}

export default App;
