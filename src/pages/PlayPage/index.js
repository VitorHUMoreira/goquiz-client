import { api } from "../../api/api";
import { useEffect, useState, useRef, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import ProgressBar from "react-bootstrap/ProgressBar";
import correctMP3 from "../../assets/correct.mp3";
import wrongMP3 from "../../assets/wrong.mp3";
import { AuthContext } from "../../contexts/authContext";
import RatingStars from "../../components/RatingStars";

function PlayPage() {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [round, setRound] = useState(0);
  const [points, setPoints] = useState(0);
  const correctRef = useRef();
  const audioCorrect = new Audio(correctMP3);
  audioCorrect.volume = 0.6;
  const audioWrong = new Audio(wrongMP3);
  audioWrong.volume = 0.2;
  const { loggedInUser } = useContext(AuthContext);
  const [userRating, setUserRating] = useState(2);

  useEffect(() => {
    setLoading(true);
    async function fetchQuiz() {
      try {
        const response = await api.get(`/quizzes/quiz/${quizId}`);
        setQuiz(response.data);
        setCurrentQuestion(response.data.questions[round]);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    fetchQuiz();
  }, [quizId, round]);

  function handleChoice(e) {
    e.target.disabled = true;
    const correctTint = correctRef.current;
    correctTint.disabled = true;
    if (e.target.innerText === quiz.questions[round].answer) {
      e.target.classList.remove("button");
      e.target.classList.add("button-green");
      audioCorrect.play();
      setTimeout(() => {
        setPoints(points + 1);
        setRound(round + 1);
        setCurrentQuestion(quiz.questions[round + 1]);
      }, 2000);
    } else {
      e.target.classList.remove("button");
      e.target.classList.add("button-red");
      audioWrong.play();
      correctTint.classList.remove("button");
      correctTint.classList.add("button-green");
      setTimeout(() => {
        setRound(round + 1);
        setCurrentQuestion(quiz.questions[round + 1]);
      }, 2000);
    }
  }

  function playAgain() {
    window.location.href = `https://go-quiz.netlify.app/play/${quizId}`;
  }

  useEffect(() => {
    if (!loading && loggedInUser) {
      const i = quiz.ratings.findIndex(
        (index) => index.user === loggedInUser.user._id
      );
      if (i > -1) {
        setUserRating(quiz.ratings[i].rating);
      }
    }
  }, [loading]);

  return (
    <>
      {!loading && +quiz.questions.length > round && (
        <div className="body shadow-sm">
          <h6 className="mb-3">
            JOGANDO: <strong>{quiz.name}</strong>
            <br />
            AUTOR: <strong>{quiz.author.nick}</strong>
          </h6>

          <div className="container-game">
            <h3 className="mt-2 question-h3">
              <strong>{currentQuestion.header}?</strong>
            </h3>
            <ProgressBar
              now={((round + 1) * 100) / quiz.questions.length}
              label={`${round + 1} / ${quiz.questions.length}`}
              className="progress shadow-sm"
            />
            {currentQuestion.alternatives.map((alternative, index) => {
              return (
                <button
                  ref={
                    alternative === quiz.questions[round].answer
                      ? correctRef
                      : null
                  }
                  key={quiz.questions[round]._id + index}
                  onClick={(e) => handleChoice(e)}
                  className="button"
                >
                  {alternative}
                </button>
              );
            })}
          </div>
        </div>
      )}
      {!loading && +quiz.questions.length === round && loggedInUser && (
        <div className="body shadow-sm">
          <div className="container-game">
            <h3 className="mt-2">FIM DE JOGO</h3>
            <h5>
              Você <span className="span-correct">acertou</span>{" "}
              <strong>{points}</strong> de{" "}
              <strong>{quiz.questions.length}</strong> perguntas.
            </h5>

            <RatingStars
              quizId={quizId}
              userRating={userRating}
              setUserRating={setUserRating}
            />

            <button onClick={playAgain} className="button">
              <i className="fa-solid fa-rotate-right me-2"></i> JOGAR NOVAMENTE
            </button>

            <Link to="/">
              <button className="button">
                <i className="fa-solid fa-house me-2"></i> HOME
              </button>
            </Link>
          </div>
        </div>
      )}
      {!loading && +quiz.questions.length === round && !loggedInUser && (
        <div className="body shadow-sm">
          <div className="container-game">
            <h3 className="mt-2">FIM DE JOGO</h3>
            <h5>
              Você <span className="span-correct">acertou</span>{" "}
              <strong>{points}</strong> de{" "}
              <strong>{quiz.questions.length}</strong> perguntas.
            </h5>

            <button onClick={playAgain} className="btn btn-info">
              <i className="fa-solid fa-rotate-right"></i> JOGAR NOVAMENTE
            </button>

            <Link to="/">
              <button className="btn btn-info">
                <i className="fa-solid fa-house"></i> HOME
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default PlayPage;
