import { api } from "../../api/api";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../../contexts/authContext";

function FavoritesCard({ quiz, reload, setReload }) {
  const { loggedInUser } = useContext(AuthContext);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [reload2, setReload2] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

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
  }, [reload2]);

  const quizCreatedAt = new Date(quiz.createdAt);
  const quizDay = quizCreatedAt.getDate();
  const quizMonth = quizCreatedAt.getMonth() + 1;
  const quizYear = quizCreatedAt.getFullYear();
  const quizHour = quizCreatedAt.getHours();
  const quizMinutes = quizCreatedAt.getMinutes();

  const rating = quiz.ratings.reduce((acc, element) => {
    return acc + element.rating / quiz.ratings.length;
  }, 0);

  async function handleAddFav(e) {
    e.preventDefault();

    try {
      await api.put(`/users/addFav/${quiz._id}`);
      toast.success(`Quiz adicionado aos favoritos.`);
      setReload2(!reload2);
      setReload(!reload);
    } catch (error) {
      console.log(error);
      toast.error("Erro ao favoritar o quiz.");
    }
  }

  async function handleRemoveFav(e) {
    e.preventDefault();

    try {
      await api.put(`/users/removeFav/${quiz._id}`);
      toast.success(`Quiz removido dos favoritos.`);
      setReload2(!reload2);
      setReload(!reload);
    } catch (error) {
      console.log(error);
      toast.error("Erro ao remover o quiz dos favoritos.");
    }
  }
  useEffect(() => {
    if (!loading && loggedInUser) {
      const fav = user.favorites.filter((element) => element._id === quiz._id);
      console.log(fav);
      if (fav.length === 0) {
        setIsFavorited(false);
      } else {
        setIsFavorited(true);
      }
    }
  }, [loading]);

  console.log(isFavorited);

  return (
    <div className="card">
      <h5 className="card-header">{quiz.name}</h5>
      <div className="card-body">
        <h5 className="card-title">{quiz.description}</h5>
        <p className="card-text">PERGUNTAS: {quiz.questions.length}</p>
        {quiz.ratings.length !== 0 && (
          <p className="card-text">RATING: {rating.toFixed(2)}</p>
        )}
        <p className="card-text">
          AUTOR:{" "}
          {
            <Link style={{ color: "red" }} to={`/user/${quiz.author._id}`}>
              {quiz.author.nick}
            </Link>
          }
        </p>
        <p className="card-text">
          CRIADO EM:{" "}
          {`${quizDay}/${quizMonth}/${quizYear} - ${quizHour}:${quizMinutes}`}
        </p>
        <Link to={`/play/${quiz._id}`} className="button">
          <i className="fa-solid fa-play me-2"></i> JOGAR
        </Link>

        {loggedInUser && (
          <>
            {quiz.author._id !== loggedInUser.user._id &&
              (isFavorited ? (
                <button onClick={handleRemoveFav} className="button-red ms-3">
                  <i className="fa-solid fa-heart me-2"></i> REMOVER FAVORITO
                </button>
              ) : (
                <button onClick={handleAddFav} className="button-red ms-3">
                  <i className="fa-regular fa-heart me-2"></i> FAVORITAR
                </button>
              ))}
          </>
        )}
      </div>
    </div>
  );
}

export default FavoritesCard;
