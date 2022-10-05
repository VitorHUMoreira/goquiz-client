import { api } from "../../api/api";
import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import Questions from "../../components/Questions";

function CreateQuizPage() {
  const [quizId, setQuizId] = useState({});

  const startRef = useRef();
  const createButton = useRef();

  useEffect(() => {
    startRef.current.focus();
  }, []);

  const [quizForm, setQuizForm] = useState({
    name: "",
    description: "",
  });

  function handleChange(e) {
    setQuizForm({ ...quizForm, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    createButton.current.disabled = true;

    try {
      const quiz = await api.post("/quizzes/create", quizForm);
      setQuizId(quiz.data._id);
      toast.success("Quiz criado com sucesso.");
    } catch (error) {
      createButton.current.disabled = false;
      console.log(error);
      toast.error("Erro ao criar quiz.");
    }
  }

  return (
    <>
      CreateQuiz
      <div className="sign-up mt-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="form-label fw-bold" htmlFor="name">
              Nome
            </label>
            <input
              ref={startRef}
              className="form-control"
              id="name"
              name="name"
              minLength={3}
              maxLength={32}
              value={quizForm.name}
              onChange={handleChange}
              placeholder="Nome da configuração"
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
              value={quizForm.description}
              onChange={handleChange}
              placeholder="Descrição da configuração"
              required
            />
          </div>

          <button ref={createButton} type="submit" className="btn btn-success">
            CRIAR
          </button>
        </form>
        <div>
          <Questions quizId={quizId} />
        </div>
      </div>
    </>
  );
}

export default CreateQuizPage;
