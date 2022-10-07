import { api } from "../../api/api";
import { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../../contexts/authContext";

function LoginPage() {
  const startRef = useRef();
  const passwordInput = useRef();
  const passwordEye = useRef();
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
      toast.success("Login realizado com sucesso.");
    } catch (error) {
      console.log(error);
      toast.error("Verifique os dados inseridos e se conta foi ativada.", {
        duration: 4000,
      });
    }
  }

  function showPassword() {
    passwordInput.current.type === "password"
      ? (passwordInput.current.type = "text")
      : (passwordInput.current.type = "password");

    passwordEye.current.classList.toggle("fa-eye");
  }

  return (
    <>
      <div className="body shadow-sm">
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
              <div className="container-password">
                <input
                  ref={passwordInput}
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
                <i
                  ref={passwordEye}
                  style={{ marginLeft: "-30px", cursor: "pointer" }}
                  className="fa-solid fa-eye-slash olho-teste"
                  onClick={showPassword}
                ></i>
              </div>
            </div>

            <button type="submit" className="button">
              <i className="fa-solid fa-right-to-bracket me-2"></i>LOGAR
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
