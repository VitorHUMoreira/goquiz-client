import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";

function UserQuizCard({ quiz }) {
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
        <p className="card-text">RATING: {rating}</p>
        <p className="card-text">
          CRIADO EM:{" "}
          {`${quizDay}/${quizMonth}/${quizYear} - ${quizHour}:${quizMinutes}`}
        </p>
        <Link to={`/play/${quiz._id}`} className="button">
          <i class="fa-solid fa-play me-2"></i>JOGAR
        </Link>
        {loggedInUser && (
          <>
            {quiz.author === loggedInUser.user._id && (
              <Link
                to={`/edit-quiz/${quiz._id}`}
                className="ms-3 button-yellow"
              >
                <i class="fa-solid fa-pen-to-square me-2"></i>EDITAR
              </Link>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default UserQuizCard;
