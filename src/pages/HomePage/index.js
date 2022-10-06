import { api } from "../../api/api";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import FavoritesCard from "../../components/FavoritesCard";

function HomePage() {
  const [search, setSearch] = useState("");
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const startRef = useRef();

  useEffect(() => {
    startRef.current.focus();
  }, []);

  useEffect(() => {
    setLoading(true);
    async function fetchQuizzes() {
      try {
        const response = await api.get("/quizzes/all");
        setQuizzes(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    fetchQuizzes();
  }, []);

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  return (
    <>
      HomePage
      <input
        ref={startRef}
        className="form-control p-2 mt-4"
        type="search"
        value={search}
        onChange={handleSearch}
        placeholder="Procure um quiz"
      />
      {!loading && (
        <>
          <div className="mt-3 d-flex flex-column gap-3">
            {quizzes
              .filter((quiz) => {
                return (
                  quiz.name.toLowerCase().includes(search.toLowerCase()) ||
                  quiz.author.nick
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                  quiz.description.toLowerCase().includes(search.toLowerCase())
                );
              })
              .map((quiz) => {
                return <FavoritesCard key={quiz._id} quiz={quiz} />;
              })}
          </div>
        </>
      )}
      <div className="home">
        <h2>
          Bem Vindo ao GoQuiz, divirta-se criando seu próprio quiz e jogando o
          quiz de outros usuários.
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Link to="/sign-up">
            <button className="btn btn-primary" type="button">
              CRIAR CONTA
            </button>
          </Link>
          <Link to="/login">
            <button className="btn btn-primary" type="button">
              LOGIN
            </button>
          </Link>
          <Link to="/play">
            <button className="btn btn-primary" type="button">
              JOGAR SEM CONTA
            </button>
          </Link>
          <Link to="/create-quiz">
            <button className="btn btn-primary" type="button">
              CRIAR QUIZ
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default HomePage;
