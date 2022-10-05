import { api } from "../../api/api";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function SignUpPage() {
  const startRef = useRef();
  const passwordInput = useRef();
  const createButton = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    startRef.current.focus();
  }, []);

  const [userForm, setUserForm] = useState({
    nick: "",
    email: "",
    password: "",
  });

  function handleChange(e) {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    createButton.current.disabled = true;

    try {
      await api.post("/users/sign-up", userForm);
      toast.success("Conta criada com sucesso.");
      navigate("/confirm-email");
    } catch (error) {
      createButton.current.disabled = false;
      console.log(error);
      toast.error("Erro ao criar conta.");
    }
  }

  function showPassword() {
    if (passwordInput.current.type === "password") {
      passwordInput.current.type = "text";
    } else {
      passwordInput.current.type = "password";
    }
  }

  return (
    <>
      SignUpPage
      <div className="sign-up mt-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="form-label fw-bold" htmlFor="nick">
              Nick
            </label>
            <input
              ref={startRef}
              className="form-control"
              id="nick"
              type="text"
              value={userForm.name}
              name="nick"
              minLength={3}
              maxLength={24}
              required
              onChange={handleChange}
            />
          </div>

          <div className="mb-2">
            <label className="form-label fw-bold" htmlFor="email">
              E-mail
            </label>
            <input
              className="form-control"
              type="email"
              id="email"
              value={userForm.email}
              name="email"
              required
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-bold" htmlFor="password">
              Senha
            </label>
            <input
              ref={passwordInput}
              className="form-control"
              type="password"
              id="password"
              minLength={5}
              maxLength={24}
              value={userForm.password}
              name="password"
              required
              onChange={handleChange}
            />
            <input type="checkbox" onClick={showPassword} />
            Mostrar Senha
          </div>

          <button ref={createButton} type="submit" className="btn btn-primary">
            CRIAR CONTA
          </button>
        </form>
      </div>
    </>
  );
}

export default SignUpPage;
