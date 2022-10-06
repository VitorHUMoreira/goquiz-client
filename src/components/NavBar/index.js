import Container from "react-bootstrap/Container";
import { useContext } from "react";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { AuthContext } from "../../contexts/authContext";

function NavBar() {
  const { loggedInUser } = useContext(AuthContext);

  function handleLogout(e) {
    e.preventDefault();
    localStorage.removeItem("loggedInUser");
    window.location.href = "https://go-quiz.netlify.app/";
  }
  return (
    <>
      <Navbar expand="lg" className="nav shadow-sm">
        <Container>
          <Navbar.Brand>
            <Link to="/" className="text-decoration-none brand">
              GoQuiz
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle className="hamburg" aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            className="hamburg-collapse-items"
            id="basic-navbar-nav"
          >
            <Nav className="me-auto">
              {loggedInUser && (
                <>
                  <hr className="hamburg-hr" />

                  <Link
                    to="/create-quiz"
                    className="nav-link hamburg-collapse-item"
                  >
                    <i className="fa-solid fa-clipboard-question"></i> CRIAR
                    QUIZ
                  </Link>

                  <hr className="hamburg-hr" />

                  <Link to="/about" className="nav-link hamburg-collapse-item">
                    <i className="fa-solid fa-circle-info"></i> SOBRE
                  </Link>

                  <hr className="hamburg-hr" />

                  <Link
                    to="/profile"
                    className="nav-link hamburg-collapse-item"
                  >
                    <i className="fa-solid fa-user"></i> PERFIL
                  </Link>

                  <hr className="hamburg-hr" />

                  <span
                    onClick={handleLogout}
                    className="nav-logout nav-link hamburg-collapse-item"
                  >
                    <i className="fa-solid fa-right-from-bracket"></i> LOGOUT
                  </span>

                  <hr className="hamburg-hr" />
                </>
              )}

              {!loggedInUser && (
                <>
                  <hr className="hamburg-hr" />

                  <Link to="/about" className="nav-link hamburg-collapse-item">
                    <i className="fa-solid fa-circle-info"></i> SOBRE
                  </Link>

                  <hr className="hamburg-hr" />

                  <Link
                    to="/sign-up"
                    className="nav-link hamburg-collapse-item"
                  >
                    <i className="fa-solid fa-user-plus"></i> CRIAR CONTA
                  </Link>

                  <hr className="hamburg-hr" />

                  <Link to="/login" className="nav-link hamburg-collapse-item">
                    <i className="fa-solid fa-right-from-bracket"></i> LOGIN
                  </Link>

                  <hr className="hamburg-hr" />
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
