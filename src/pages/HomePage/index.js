import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";

function HomePage() {
  const { loggedInUser } = useContext(AuthContext);

  return (
    <>
      HomePage
      {loggedInUser && <button>TA LOGADO CARAI</button>}
      <div className="home">
        <h2>
          Bem Vindo ao GoQuiz, divirta-se criando seu próprio quiz e jogando o
          quiz de outros usuários.
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Link to="/sign-up">
            <button className="btn btn-primary" type="button">
              CRIAR CONTA
            </button>
          </Link>
          <Link to="/login">
            <button className="btn btn-primary" type="button">
              LOGIN
            </button>
          </Link>
          <Link to="/play">
            <button className="btn btn-primary" type="button">
              JOGAR SEM CONTA
            </button>
          </Link>
          <Link to="/create-quiz">
            <button className="btn btn-primary" type="button">
              CRIAR QUIZ
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default HomePage;
