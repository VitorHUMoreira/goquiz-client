import { Link } from "react-router-dom";

function About() {
  return (
    <div className="body shadow-sm">
      <h2 className="mb-3">
        <i className="fa-solid fa-circle-info me-2"></i>SOBRE
      </h2>
      <ul className="about-content">
        <li>
          Plataforma desenvolvida para o #3 Projeto do bootcamp de Web
          Development na Ironhack São Paulo, turma #85WDFT.
        </li>
        <li>Inspirado no famoso jogo de celular "Perguntados".</li>
        <li>
          O usuário pode jogar jogar sem a necessidade de criar uma conta.
        </li>
        <li>
          Com uma conta o usuário consegue: criar um quiz, edita-lo, exclui-lo,
          favoritar e avaliar quizzes.
        </li>
        <li>Espero que gostem!</li>
      </ul>

      <Link to="/">
        <button className="btn btn-info">
          <i className="fa-solid fa-house"></i> HOME
        </button>
      </Link>
    </div>
  );
}

export default About;
