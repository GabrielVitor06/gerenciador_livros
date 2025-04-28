"use client";

import { useState } from "react";
import BookForm from "@/components/BookForm";
import BookList from "@/components/BookList";
import MenuAppBar from "@/components/Menu";
import Footer from "@/components/footer";
import { Box, Container } from "@mui/material";

export default function Home() {
  const [recarregar, setRecarregar] = useState(false);

  function livroAdicionado() {
    setRecarregar(!recarregar);
  }

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <MenuAppBar />
      <Container sx={{ py: 4, flexGrow: 1 }}>
        <BookForm onLivroAdicionado={livroAdicionado} />
        <BookList recarregar={recarregar} />
      </Container>
      <Footer />
    </Box>
  );
}
