import { api } from "../../api/api";
import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import Questions from "../../components/Questions";
import { useNavigate, useParams } from "react-router-dom";

function EditQuizPage() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState({});
  const [question, setQuestion] = useState({});
  const [loading, setLoading] = useState(true);

  const editQuiz = useRef();

  useEffect(() => {
    setLoading(true);
    async function fetchQuiz() {
      try {
        const response = await api.get(`/quizzes/quiz/${quizId}`);
        setQuiz(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    fetchQuiz();
  }, [quizId]);

  function handleChangeQuiz(e) {
    setQuiz({ ...quiz, [e.target.name]: e.target.value });
  }

  function handleChangeQuestion(e) {
    setQuestion({ ...question, [e.target.name]: e.target.value });
  }

  async function handleSubmitQuiz(e) {
    e.preventDefault();

    try {
      await api.put(`/quizzes/edit/${quizId}`, quiz);
      toast.success(`Quiz editado com sucesso.`);
    } catch (error) {
      console.log(error);
      toast.error("Erro ao editar o quiz.");
    }
  }

  async function handleSubmitQuestion(e) {
    e.preventDefault();

    try {
      // await api.put(`/questions/edit/${quizId}`, question);
      toast.success(`Pergunta editada com sucesso.`);
    } catch (error) {
      console.log(error);
      toast.error("Erro ao editar a pergunta.");
    }
  }

  async function handleDeleteQuiz() {
    try {
      await api.delete(`/quizzes/delete/${quizId}`);
      toast.success(`Quiz deletado com sucesso.`);
      navigate(`/profile`);
    } catch (error) {
      console.log(error);
      toast.error("Erro ao deletar o quiz.");
    }
  }

  async function handleDeleteQuestion() {
    try {
      // await api.delete(`/questions/delete/${questionId}`);
      toast.success(`Quiz deletado com sucesso.`);
      navigate(`/profile`);
    } catch (error) {
      console.log(error);
      toast.error("Erro ao deletar o quiz.");
    }
  }

  return (
    <>
      EditQuiz
      {!loading && (
        <div className="sign-up mt-4">
          <form onSubmit={handleSubmitQuiz}>
            <div className="mb-2">
              <label className="form-label fw-bold" htmlFor="name">
                Nome
              </label>
              <input
                className="form-control"
                id="name"
                name="name"
                minLength={3}
                maxLength={32}
                value={quiz.name}
                onChange={handleChangeQuiz}
                placeholder="Nome do quiz"
                required
              />
            </div>

            <div className="mb-2">
              <label className="form-label fw-bold" htmlFor="description">
                Descrição
              </label>
              <input
                className="form-control"
                id="description"
                name="description"
                maxLength={128}
                value={quiz.description}
                onChange={handleChangeQuiz}
                placeholder="Descrição do quiz"
                required
              />
            </div>

            <button ref={editQuiz} type="submit" className="btn btn-success">
              EDITAR QUIZ
            </button>
          </form>
          <button onClick={handleDeleteQuiz} className="btn btn-danger">
            DELETAR QUIZ
          </button>
          <div>
            {quiz.questions.map((question) => {
              return <Questions quizId={quizId} question={question} />;
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default EditQuizPage;
