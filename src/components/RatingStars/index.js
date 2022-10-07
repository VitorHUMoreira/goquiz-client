import { api } from "../../api/api";
import toast from "react-hot-toast";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

export default function RatingStars({ quizId, userRating, setUserRating }) {
  async function handleSubmit(e, newRating) {
    e.preventDefault();
    try {
      await api.put(`/quizzes/rating/${quizId}`, { rating: newRating });
      toast.success("Quiz avaliado com sucesso.");
    } catch (error) {
      console.log(error);
      toast.error("Erro ao avaliar o quiz.");
    }
  }

  return (
    <Box>
      <Typography component="legend">Avaliação</Typography>
      <Rating
        name="simple-controlled"
        value={userRating}
        onChange={(e, newRating) => {
          setUserRating(newRating);
          handleSubmit(e, newRating);
        }}
      />
    </Box>
  );
}
