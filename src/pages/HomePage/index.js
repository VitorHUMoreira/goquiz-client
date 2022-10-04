import { Link } from "react-router-dom";

function HomePage() {
  return (
    <>
      HomePage
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
        </div>
      </div>
    </>
  );
}

export default HomePage;
