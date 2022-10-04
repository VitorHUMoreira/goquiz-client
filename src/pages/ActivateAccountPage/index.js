import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../../api/api";

function ActivateAccountPage() {
  const { idUser } = useParams();

  useEffect(() => {
    async function activateAccount() {
      try {
        await api.get(`users/activate-account/${idUser}`);
      } catch (error) {
        console.log(error);
      }
    }

    activateAccount();
  }, [idUser]);

  return (
    <>
      ActivateAccount
      <div>
        <h2>PARABÉNS SUA CONTA FOI ATIVADA COM SUCESSO!</h2>
        <Link to="/login">
          <button className="btn btn-primary" type="button">
            LOGIN
          </button>
        </Link>
      </div>
    </>
  );
}

export default ActivateAccountPage;
