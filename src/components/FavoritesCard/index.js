import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";

function FavoritesCard({ quiz }) {
  const { loggedInUser } = useContext(AuthContext);

  const quizCreatedAt = new Date(quiz.createdAt);
  const quizDay = quizCreatedAt.getDate();
  const quizMonth = quizCreatedAt.getMonth() + 1;
  const quizYear = quizCreatedAt.getFullYear();
  const quizHour = quizCreatedAt.getHours();
  const quizMinutes = quizCreatedAt.getMinutes();

  const rating = quiz.ratings.reduce((acc, element) => {
    return acc + element.rating / quiz.ratings.length;
  }, 0);

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
        <Link to={`/play/${quiz._id}`} className="btn btn-sm btn-info">
          <i className="fa-solid fa-play"></i> JOGAR
        </Link>

        {loggedInUser && (
          <>
            {quiz.author._id !== loggedInUser.user._id &&
              (loggedInUser.user.favorites.includes(quiz._id) ? (
                <button className="btn btn-danger">
                  <i className="fa-solid fa-heart"></i> REMOVER FAVORITO
                </button>
              ) : (
                <button className="btn btn-danger">
                  <i className="fa-regular fa-heart"></i> FAVORITAR
                </button>
              ))}
          </>
        )}
      </div>
    </div>
  );
}

export default FavoritesCard;
