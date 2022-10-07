import { api } from "../../api/api";
import { useEffect, useRef, useState } from "react";
import FavoritesCard from "../../components/FavoritesCard";

function HomePage() {
  const [search, setSearch] = useState("");
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);
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
  }, [reload]);

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  return (
    <>
      <div className="body shadow-sm">
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
                    quiz.description
                      .toLowerCase()
                      .includes(search.toLowerCase())
                  );
                })
                .map((quiz) => {
                  return (
                    <FavoritesCard
                      key={quiz._id}
                      quiz={quiz}
                      reload={reload}
                      setReload={setReload}
                    />
                  );
                })}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default HomePage;
