import { api } from "../../api/api";
import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";

function Questions({ quizId, question }) {
  const startRef = useRef();
  const [picture, setPicture] = useState("");
  const [preview, setPreview] = useState();

  const [formQuestion, setFormQuestion] = useState({
    header: "",
    picture: "",
    alternatives: [],
    answer: "",
  });

  const [alternative1, setAlternative1] = useState("");
  const [alternative2, setAlternative2] = useState("");
  const [alternative3, setAlternative3] = useState("");
  const [alternative4, setAlternative4] = useState("");

  function handleChange(e) {
    setFormQuestion({ ...formQuestion, [e.target.name]: e.target.value });
  }

  function handleImage(e) {
    setPicture(e.target.files[0]);
  }

  async function handleUpload() {
    try {
      const uploadData = new FormData();
      uploadData.append("picture", picture);
      const response = await api.post("/upload-image", uploadData);
      return response.data.url;
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    startRef.current.focus();

    try {
      const cloneQuestion = { ...formQuestion };
      cloneQuestion.alternatives = [
        alternative1,
        alternative2,
        alternative3,
        alternative4,
      ];

      const pictureURL = await handleUpload();

      await api.post(`/questions/create/${quizId}`, {
        ...cloneQuestion,
        picture: pictureURL,
      });

      setFormQuestion({
        header: "",
      });

      setPicture("");

      setAlternative1("");
      setAlternative2("");
      setAlternative3("");
      setAlternative4("");

      toast.success("Pergunta criada com sucesso!");
    } catch (error) {
      console.log(error);
      toast.error(
        `${error.response.data.errors.answer.path} ${error.response.data.errors.answer.kind}`
      );
    }
  }

  useEffect(() => {
    if (!picture) {
      setPreview(undefined);
      return;
    }
    const objectURL = URL.createObjectURL(picture);
    setPreview(objectURL);
    return () => URL.revokeObjectURL(objectURL);
  }, [picture]);

  return (
    <>
      <div className="sign-up mt-4">
        <label className="form-label fw-bold">Perguntas</label>
        <div className="mt-2">
          <div className="mb-2">
            <label className="form-label fw-bold" htmlFor="header">
              Pergunta
            </label>
            <input
              ref={startRef}
              className="form-control"
              id="header"
              name="header"
              minLength={2}
              maxLength={128}
              value={formQuestion.header}
              onChange={handleChange}
              placeholder="Texto da pergunta"
              required
            />
            <label className="form-label fw-bold">Foto na pergunta</label>
            <br />
            <img src={preview} alt="" width={100} className="mb-2" />
            <input
              className="form-control"
              id="picture"
              type="file"
              name="picture"
              onChange={handleImage}
            />
          </div>

          <div className="mb-2">
            <label className="form-label fw-bold" htmlFor="alternatives">
              Alternativas
            </label>
            <input
              className="form-control mb-2"
              id="alternative1"
              name="alternative1"
              minLength={1}
              maxLength={128}
              value={alternative1}
              onChange={(e) => setAlternative1(e.target.value)}
              placeholder="Texto da alternativa"
            />
            <input
              className="form-control mb-2"
              id="alternative2"
              name="alternative2"
              minLength={1}
              maxLength={128}
              value={alternative2}
              onChange={(e) => setAlternative2(e.target.value)}
              placeholder="Texto da alternativa"
            />
            <input
              className="form-control mb-2"
              id="alternative3"
              name="alternative3"
              minLength={1}
              maxLength={128}
              value={alternative3}
              onChange={(e) => setAlternative3(e.target.value)}
              placeholder="Texto da alternativa"
            />
            <input
              className="form-control"
              id="alternative4"
              name="alternative4"
              minLength={1}
              maxLength={128}
              value={alternative4}
              onChange={(e) => setAlternative4(e.target.value)}
              placeholder="Texto da alternativa"
            />
          </div>

          <div className="mb-2">
            <label className="form-label fw-bold" htmlFor="answer">
              Resposta
            </label>
            <select id="answer" name="answer" onChange={handleChange}>
              <option value=""></option>
              <option value={alternative1}>{alternative1}</option>
              <option value={alternative2}>{alternative2}</option>
              <option value={alternative3}>{alternative3}</option>
              <option value={alternative4}>{alternative4}</option>
            </select>
          </div>
          <button onClick={handleSubmit} className="btn btn-success mb-4">
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>
    </>
  );
}

export default Questions;
