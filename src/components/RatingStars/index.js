import { useState } from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { api } from "../../api/api";
import toast from "react-hot-toast";

export default function RatingStars({ quizId }) {
  const [rating, setRating] = useState(0);

  async function handleSubmit(e, newRating) {
    e.preventDefault();
    console.log(newRating);
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
        value={rating}
        onChange={(e, newRating) => {
          setRating(newRating);
          handleSubmit(e, newRating);
        }}
      />
    </Box>
  );
}
