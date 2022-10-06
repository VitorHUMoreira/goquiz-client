import { useEffect, useState } from "react";
import { api } from "../../api/api";
import { Link } from "react-router-dom";
import FavoritesCard from "../../components/FavoritesCard";
import UserQuizCard from "../../components/UserQuizCard";

function ProfilePage() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

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
  }, []);

  function handleLogout(e) {
    e.preventDefault();
    localStorage.removeItem("loggedInUser");
    window.location.href = "http://localhost:3000/";
  }

  const userCreatedAt = new Date(user.createdAt);
  const userDay = userCreatedAt.getDate();
  const userMonth = userCreatedAt.getMonth() + 1;
  const userYear = userCreatedAt.getFullYear();

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
                <Link to={`/profile-edit`} className="btn btn-warning">
                  EDITAR
                </Link>
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
