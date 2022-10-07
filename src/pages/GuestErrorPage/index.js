import Alert from "react-bootstrap/Alert";
import { Link } from "react-router-dom";

function GuestErrorPage() {
  return (
    <div className="body shadow-sm">
      <Alert variant="danger">
        <Alert.Heading>Opa, parece que você não está logado !!!</Alert.Heading>
        <br />
        <p>Para acessar essa página é necessário estar logado.</p>
        <hr />
        <Link to="/">
          <button className="btn btn-info">
            <i className="fa-solid fa-right-from-bracket"></i> LOGIN
          </button>
        </Link>
        <p>Não tem conta?</p>
        <Link to="/">
          <button className="btn btn-info">
            <i className="fa-solid fa-user-plus"></i> CRIAR CONTA
          </button>
        </Link>
      </Alert>
    </div>
  );
}

export default GuestErrorPage;
