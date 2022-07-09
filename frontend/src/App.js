import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Buddying from "./pages/Buddying";
import FoundProfile from "./pages/FoundUserProfile";
import Login from "./pages/Login";
import { CircularProgress, Fade } from "@mui/material";
import { useSnackbar } from 'notistack';

import NotFound from "./pages/NotFound";
import { useState, useEffect, Fragment } from "react";

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [token, setToken] = useState(false)
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState("John Doe")

  useEffect(() => {
    const localStorageToken = localStorage.getItem("auth-token");
    if (localStorageToken !== null) {
      window.token = localStorageToken
      setToken(localStorageToken)
      const username = localStorageToken.split(".")[0]
      setUsername(username)
      enqueueSnackbar("Welcome back " + username + "!", {
        variant: 'success',
        autoHideDuration: 2500
    })
    }
    setLoading(false)
  }, [])

  const handleNewLogin = (token, rememberMe) => {
    if (rememberMe) {
      localStorage.setItem("auth-token", token);
    }
    setToken(token);
    setUsername(token.split(".")[0]);
  };

  const handleLogout = () => {
    setUsername("");
    setToken(false);
    localStorage.removeItem("auth-token");
  };

  const setPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <Fragment>
      {loading ? (
        <div
          style={{
            overflow: "hidden",
            height: "97vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress size="10ch" />
        </div>
      ) : (
        <Fragment>
          {token ? (
            <Fade in={true}>
              <div>
                <NavBar setPage={setPage} handleLogout={handleLogout} />

                {currentPage === 0 && <Home />}
                {currentPage === 1 && <Buddying setPage={setPage} />}
                {currentPage == 2 && <FoundProfile />}
                {currentPage > 2 && <NotFound />}
              </div>
            </Fade>
          ) : (
            <Fade in={true}>
              <div>
                <Login handleNewLogin={handleNewLogin} />
              </div>
            </Fade>
          )}
        </Fragment>
      )}
    </Fragment>
  );
}

export default App;
