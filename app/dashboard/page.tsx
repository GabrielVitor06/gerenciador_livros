"use client";

import { useState } from "react";
import BookForm from "@/components/BookForm";
import BookList from "@/components/BookList";
import { Container } from "@mui/material";

export default function Home() {
  const [recarregar, setRecarregar] = useState(false);

  function livroAdicionado() {
    setRecarregar(!recarregar);
  }

  return (
    <Container sx={{ py: 4 }}>
      <BookForm onLivroAdicionado={livroAdicionado} />
      <BookList recarregar={recarregar} />
    </Container>
  );
}
