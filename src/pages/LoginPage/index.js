import { api } from "../../api/api";
import { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../../contexts/authContext";

function LoginPage() {
  const startRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    startRef.current.focus();
  }, []);

  const [userForm, setUserForm] = useState({
    email: "",
    password: "",
  });

  const { setLoggedInUser } = useContext(AuthContext);

  function handleChange(e) {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await api.post("/users/login", userForm);
      localStorage.setItem("loggedInUser", JSON.stringify(response.data));
      setLoggedInUser({ ...response.data });
      navigate("/");
      toast.success("Conta logada com sucesso.");
    } catch (error) {
      console.log(error);
      toast.error("Erro ao logar.");
    }
  }
  return (
    <>
      LoginPage
      <div className="login mt-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="form-label" htmlFor="email">
              E-mail
            </label>
            <input
              ref={startRef}
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
            <label className="form-label" htmlFor="password">
              Senha
            </label>
            <input
              className="form-control"
              type="password"
              id="password"
              value={userForm.password}
              minLength={5}
              maxLength={24}
              name="password"
              required
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            LOGAR
          </button>
        </form>
      </div>
    </>
  );
}

export default LoginPage;
