import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import SignUp from "./pages/register/SignUp";
import Login from "./pages/login/Login";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import CatProfile from "./pages/CatProfile";
import AddAward from "./pages/AddAward";
import Shows from "./pages/Shows";
import Show from "./pages/Show";
import NewCat from "./pages/NewCat";
import NewShow from "./pages/NewShow";
import ProtectedRoutes from "./ProtectedRoutes";
import Help from "./pages/help/Help";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { DarkModeContext } from './darkModeContext'

function App() {
  const [loggedIn, setLoggedIn] = useState();
  const email = localStorage.getItem("email");
  const { darkMode, dispatch  } = useContext(DarkModeContext);


  useEffect(() => {
    if (email) setLoggedIn(true);
  }, []);

  const logout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <div className={darkMode ? "dark" : 'App'}>
      <Router>
        <Navbar collapseOnSelect>
          <Container>
            {/* <Navbar.Brand href="/">Cat Shows</Navbar.Brand> */}
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse
              id="responsive-navbar-nav"
              className="linkContainer"
            >
              <Nav>
                <AuthContext.Provider
                  value={{ loggedIn, setLoggedIn }}
                  className="container-fluid"
                >
                  {!loggedIn ? (
                    <>
                      <Nav.Link as={Link} to={"/signup"}>
                        Sign Up
                      </Nav.Link>
                      <Nav.Link as={Link} to={"/signin"}>
                        Sign In
                      </Nav.Link>
                    </>
                  ) : (
                    <>
                      <Nav.Link as={Link} to={"/"}>
                        Profile
                      </Nav.Link>
                      <Nav.Link as={Link} to={"/shows"}>
                        Shows
                      </Nav.Link>
                      <Nav.Link to={"/"} onClick={logout}>
                        Logout
                      </Nav.Link>
                      <Nav.Link as={Link} to={"/help"}>
                        <QuestionMarkIcon className="questionMark" />
                      </Nav.Link>
                      <Nav.Link className="item">
                        <DarkModeIcon className="icon" onClick={()=> dispatch({type: "TOGGLE"})}/>
                      </Nav.Link>
                    </>
                  )}
                </AuthContext.Provider>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Home />} />
            <Route path="/cat/:id" element={<CatProfile />} />
            <Route path="/addaward" element={<AddAward />} />
            <Route path="/shows" element={<Shows />} />
            <Route path="/show/:id" element={<Show />} />
            <Route path="/newcat" element={<NewCat />} />
            <Route path="/newshow" element={<NewShow />} />
            <Route path="/help" element={<Help />} />
          </Route>

          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<Login />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
