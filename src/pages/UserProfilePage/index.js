import { api } from "../../api/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserQuizCard from "../../components/UserQuizCard";

function UserProfilePage() {
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const userCreatedAt = new Date(user.createdAt);
  const userDay = userCreatedAt.getDate();
  const userMonth = userCreatedAt.getMonth() + 1;
  const userYear = userCreatedAt.getFullYear();

  useEffect(() => {
    setLoading(true);
    async function fetchUser() {
      try {
        const response = await api.get(`/users/user/${userId}`);
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    fetchUser();
  }, [userId]);

  return (
    <>
      UserProfilePage
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
              QUIZZES
            </label>
            <div className="mt-3 d-flex flex-column gap-3">
              {user.quizzes.map((quiz) => {
                return <UserQuizCard key={quiz._id} quiz={quiz} />;
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default UserProfilePage;
