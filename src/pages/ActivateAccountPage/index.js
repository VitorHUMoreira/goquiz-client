import { useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import { api } from "../../api/api";

function ActivateAccountPage() {
  const { userId } = useParams();

  useEffect(() => {
    async function activateAccount() {
      try {
        await api.get(`users/activate-account/${userId}`);
        toast.success("Conta ativada com sucesso.");
      } catch (error) {
        console.log(error);
        toast.error("Erro ao ativar a conta.");
      }
    }
    activateAccount();
  }, [userId]);

  return (
    <>
      ActivateAccount
      <div>
        <h2>PARABÉNS SUA CONTA FOI ATIVADA COM SUCESSO!</h2>
        <hr />
        <p>Agora você tem acesso a todos os recursos do GoQuiz, divirta-se!</p>
        <Link to="/login">
          <button className="btn btn-primary" type="button">
            <i className="fa-solid fa-right-to-bracket"></i> LOGIN
          </button>
        </Link>
      </div>
    </>
  );
}

export default ActivateAccountPage;
