import { api } from "../../api/api";
import { useEffect, useRef, useState } from "react";
import FavoritesCard from "../../components/FavoritesCard";
import UserQuizCard from "../../components/UserQuizCard";
import Modal from "react-bootstrap/Modal";
import toast from "react-hot-toast";

function ProfilePage() {
  const saveChanges = useRef();
  const deleteUser = useRef();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);
  const [show, setShow] = useState(false);
  const handleCloseModalEditNick = () => setShow(false);
  const handleShowModalEditNick = () => setShow(true);

  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDeleteAccount = () => setShowDelete(false);
  const handleShowDeleteAccount = () => setShowDelete(true);

  const [userNick, setUserNick] = useState({
    nick: "",
  });

  const userCreatedAt = new Date(user.createdAt);
  const userDay = userCreatedAt.getDate();
  const userMonth = userCreatedAt.getMonth() + 1;
  const userYear = userCreatedAt.getFullYear();

  useEffect(() => {
    setLoading(true);
    async function fetchUser() {
      try {
        const response = await api.get(`/users/profile`);
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    fetchUser();
  }, [reload]);

  function handleChange(e) {
    setUserNick({ ...userNick, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    saveChanges.current.disabled = true;

    try {
      await api.put("/users/edit", userNick);
      handleCloseModalEditNick();
      toast.success("Nick alterado com sucesso.");
      setReload(!reload);
    } catch (error) {
      saveChanges.current.disabled = false;
      console.log(error);
      toast.error("Nick já está em uso.");
    }
  }

  function handleLogout(e) {
    e.preventDefault();
    localStorage.removeItem("loggedInUser");
    window.location.href = "http://localhost:3000/";
  }

  async function handleDelete(e) {
    e.preventDefault();
    deleteUser.current.disabled = true;

    try {
      await api.delete(`/users/delete`);
      toast.success("Usuário deletado com sucesso.");
      localStorage.removeItem("loggedInUser");
      window.location.href = "http://localhost:3000/";
    } catch (error) {
      deleteUser.current.disabled = false;
      console.log(error);
      toast.error("Usuário deletado com sucesso.");
    }
  }

  return (
    <>
      ProfilePage
      <div className="container-xl main-container bg-secondary border border-dark rounded p-3 mt-4">
        {!loading && (
          <>
            <div className="mt-3 d-flex flex-column gap-3">
              <div className="mb-2">
                <label className="form-label" htmlFor="nick">
                  Nick
                </label>
                <input
                  className="form-control"
                  id="nick"
                  type="text"
                  value={user.nick}
                  name="nick"
                  disabled
                />

                <button
                  className="btn btn-warning"
                  onClick={handleShowModalEditNick}
                >
                  MUDAR NICK
                </button>

                <Modal
                  size="lg"
                  aria-labelledby="contained-modal-edit-vcenter"
                  centered
                  show={show}
                  userNick={userNick}
                  setUserNick={setUserNick}
                  onHide={handleCloseModalEditNick}
                >
                  <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-edit-vcenter">
                      MUDAR NICK
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <label className="form-label fw-bold" htmlFor="newNick">
                      Novo Nick
                    </label>
                    <input
                      autoFocus
                      className="form-control"
                      id="newNick"
                      type="text"
                      value={userNick.nick}
                      name="nick"
                      minLength={3}
                      maxLength={24}
                      required
                      onChange={handleChange}
                    />
                  </Modal.Body>
                  <Modal.Footer>
                    <button
                      className="btn btn-danger"
                      onClick={handleCloseModalEditNick}
                    >
                      <i className="fa-solid fa-xmark"></i> FECHAR
                    </button>
                    <button
                      ref={saveChanges}
                      className="btn btn-success"
                      onClick={handleSubmit}
                    >
                      <i className="fa-solid fa-check"></i> SALVAR
                    </button>
                  </Modal.Footer>
                </Modal>

                <button
                  className="btn btn-danger"
                  onClick={handleShowDeleteAccount}
                >
                  DELETER CONTA
                </button>

                <Modal
                  size="lg"
                  aria-labelledby="contained-modal-delete-vcenter"
                  centered
                  show={showDelete}
                  onHide={handleCloseDeleteAccount}
                >
                  <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-delete-vcenter">
                      DELETAR CONTA
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <h4>Tem certeza que deseja deletar sua conta?</h4>
                    <p>
                      Ao deletar sua conta todos seus quizzes, favoritos e
                      avaliações serão perdidas.
                    </p>
                  </Modal.Body>
                  <Modal.Footer>
                    <button
                      className="btn btn-danger"
                      onClick={handleCloseDeleteAccount}
                    >
                      <i className="fa-solid fa-xmark"></i> CANCELAR
                    </button>
                    <button
                      ref={deleteUser}
                      className="btn btn-success"
                      onClick={handleDelete}
                    >
                      <i className="fa-solid fa-check"></i> CONFIRMAR
                    </button>
                  </Modal.Footer>
                </Modal>
              </div>
              <div className="mb-4">
                <label className="form-label" htmlFor="createdAt">
                  Criado em
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="createdAt"
                  value={`${userDay}/${userMonth}/${userYear}`}
                  name="createdAt"
                  disabled
                />
              </div>
            </div>
            <label className="form-label" htmlFor="nick">
              FAVORITOS
            </label>
            <div className="mt-3 d-flex flex-column gap-3">
              {user.favorites.map((quiz) => {
                return <FavoritesCard key={quiz._id} quiz={quiz} />;
              })}
            </div>
            <label className="form-label" htmlFor="nick">
              SEUS QUIZZES
            </label>
            <div className="mt-3 d-flex flex-column gap-3">
              {user.quizzes.map((quiz) => {
                return <UserQuizCard key={quiz._id} quiz={quiz} />;
              })}
            </div>
            <div className="d-flex gap-2 justify-content-center mt-4">
              <button
                type="button"
                onClick={handleLogout}
                className="btn btn-danger"
              >
                SAIR
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default ProfilePage;
