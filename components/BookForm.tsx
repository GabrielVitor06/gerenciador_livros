"use client";

import { useState, useCallback, useRef } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Stack,
  Rating,
  Autocomplete,
} from "@mui/material";
import axios from "axios";

// Função de debounce para otimizar as requisições
function useDebounce(callback: (...args: unknown[]) => void, delay: number) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debouncedCallback = useCallback(
    (...args: unknown[]) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );

  return debouncedCallback;
}

export default function BookForm({
  onLivroAdicionado,
}: {
  onLivroAdicionado: () => void;
}) {
  const [titulo, setTitulo] = useState("");
  const [livroInfo, setLivroInfo] = useState<LivroInfo | null>(null);
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [nota, setNota] = useState<number | null>(null);
  const [comentario, setComentario] = useState("");
  const [suggestions, setSuggestions] = useState<
    { title: string; id: string }[]
  >([]);

  interface LivroInfo {
    titulo: string;
    autores: string;
    paginas: number;
    imagem: string;
  }

  async function buscarLivro() {
    if (!titulo) return;

    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=intitle:${titulo}`
    );
    const data = await res.json();

    if (data.items?.length) {
      const livro = data.items[0].volumeInfo;
      setLivroInfo({
        titulo: livro.title,
        autores: livro.authors?.join(", ") ?? "",
        paginas: livro.pageCount ?? 0,
        imagem: livro.imageLinks?.thumbnail ?? "",
      });
    }

    const suggestionList =
      data.items?.map(
        (item: { id: string; volumeInfo: { title: string } }) => ({
          title: item.volumeInfo.title,
          id: item.id,
        })
      ) ?? [];
    setSuggestions(suggestionList);
  }

  async function salvarLivro() {
    if (!livroInfo) return;

    try {
      await axios.post("/api/livros", {
        ...livroInfo,
        dataInicio,
        dataFim,
        nota,
        comentario,
      });

      setTitulo("");
      setLivroInfo(null);
      setDataInicio("");
      setDataFim("");
      setNota(null);
      setComentario("");
      onLivroAdicionado();
    } catch (error) {
      console.error("Erro ao salvar livro:", error);
    }
  }

  const buscarLivroComDebounce = useDebounce(buscarLivro, 500);

  return (
    <Card variant="outlined" sx={{ maxWidth: 600, margin: "0 auto", mb: 4 }}>
      <CardContent>
        <Stack spacing={2}>
          <Autocomplete
            freeSolo
            options={suggestions}
            getOptionLabel={(option) =>
              typeof option === "string" ? option : option.title
            }
            value={titulo}
            onInputChange={(event, newInputValue) => {
              setTitulo(newInputValue);
              buscarLivroComDebounce();
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Título do Livro"
                size="small"
                fullWidth
                variant="outlined"
              />
            )}
            renderOption={(props, option) => (
              <li
                {...props}
                key={`${option.id}-${option.title}-${Math.random()}`}
              >
                {option.title}
              </li>
            )}
          />

          <Button variant="contained" size="small" onClick={buscarLivro}>
            Buscar Livro
          </Button>

          {livroInfo && (
            <>
              <Typography variant="h6">{livroInfo.titulo}</Typography>
              <Typography variant="body2">{livroInfo.autores}</Typography>
              {livroInfo.imagem && (
                <img
                  src={livroInfo.imagem}
                  alt="Capa"
                  style={{ width: "100px", marginTop: "10px" }}
                />
              )}
            </>
          )}

          {livroInfo && (
            <>
              <TextField
                label="Data Início"
                type="date"
                value={dataInicio}
                onChange={(e) => setDataInicio(e.target.value)}
                fullWidth
                size="small"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Data Fim"
                type="date"
                value={dataFim}
                onChange={(e) => setDataFim(e.target.value)}
                size="small"
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
              <Stack>
                <Typography component="legend">Avaliação</Typography>
                <Rating
                  name="user-rating"
                  value={nota}
                  onChange={(event, newValue) => setNota(newValue)}
                  precision={0.5}
                />
              </Stack>
              <TextField
                label="Comentário"
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
                fullWidth
                multiline
                rows={3}
                size="small"
              />
              <Button
                variant="contained"
                size="small"
                color="success"
                onClick={salvarLivro}
              >
                Salvar Livro
              </Button>
            </>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
