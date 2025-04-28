"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
  Button,
  Stack,
  Rating,
  Box,
} from "@mui/material";

export default function BookList({ recarregar }: { recarregar: boolean }) {
  interface Livro {
    id: number;
    titulo: string;
    autores: string;
    paginas: number;
    imagem?: string;
    dataInicio: string;
    dataFim: string;
    nota: number;
    comentario: string;
  }

  const [livros, setLivros] = useState<Livro[]>([]);

  async function carregarLivros() {
    const res = await axios.get("/api/livros");
    setLivros(res.data);
  }

  async function removerLivro(id: number) {
    await axios.delete(`/api/livros/${id}`);
    carregarLivros();
  }

  useEffect(() => {
    carregarLivros();
  }, [recarregar]);

  return (
    <>
      <Typography variant="h4" align="center" sx={{ mb: 4 }}>
        Meus Livros
      </Typography>

      <Box display="flex" flexWrap="wrap" justifyContent="center" gap={3}>
        {livros.map((livro) => (
          <Card
            key={livro.id}
            sx={{
              width: 300,
              display: "flex",
              flexDirection: "column",
              borderRadius: 3,
              boxShadow: 3,
              transition: "0.3s",
              "&:hover": {
                transform: "scale(1.03)",
                boxShadow: 6,
              },
            }}
          >
            {livro.imagem && (
              <CardMedia
                component="img"
                height="180"
                image={livro.imagem}
                alt={`Capa do livro ${livro.titulo}`}
                sx={{
                  objectFit: "contain",
                  p: 2,
                  backgroundColor: "#f9f9f9",
                }}
              />
            )}

            <CardContent
              sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
            >
              <Typography gutterBottom fontWeight={600} variant="subtitle1">
                {livro.titulo}
              </Typography>

              <Typography variant="body2">
                <Box component="span" fontWeight={600}>
                  Autores:
                </Box>{" "}
                {livro.autores}
              </Typography>

              <Typography variant="body2">
                <Box component="span" fontWeight={600}>
                  Páginas:
                </Box>{" "}
                {livro.paginas}
              </Typography>

              <Typography variant="body2">
                <Box component="span" fontWeight={600}>
                  Início:
                </Box>{" "}
                {livro.dataInicio}
              </Typography>

              <Typography variant="body2">
                <Box component="span" fontWeight={600}>
                  Fim:
                </Box>{" "}
                {livro.dataFim}
              </Typography>

              <Stack direction="row" alignItems="center" spacing={1} mt={1}>
                <Typography variant="body2">
                  <Box component="span" fontWeight={600}>
                    Nota:
                  </Box>
                </Typography>
                <Rating
                  value={livro.nota}
                  precision={0.5}
                  readOnly
                  size="small"
                />
              </Stack>

              <Typography
                variant="body2"
                sx={{
                  whiteSpace: "pre-line",
                  wordBreak: "break-word",
                  mt: 1,
                }}
              >
                <Box component="span" fontWeight={600}>
                  Comentário:{"\n"}
                </Box>
                {livro.comentario
                  ? livro.comentario.charAt(0).toUpperCase() +
                    livro.comentario.slice(1)
                  : ""}
              </Typography>
            </CardContent>

            <CardActions>
              <Button
                size="small"
                color="error"
                variant="contained"
                fullWidth
                onClick={() => removerLivro(livro.id)}
              >
                Remover
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </>
  );
}
