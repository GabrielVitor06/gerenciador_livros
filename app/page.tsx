"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
  Alert,
  IconButton,
  InputAdornment,
  Link,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mensagem, setMensagem] = useState<{
    tipo: "sucesso" | "erro";
    texto: string;
  } | null>(null);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "a@gmail.com" && senha === "123456") {
      setMensagem({ tipo: "sucesso", texto: "Login realizado com sucesso!" });
      router.push("/dashboard");
    } else {
      setMensagem({ tipo: "erro", texto: "Email ou senha incorretos." });
    }
  };

  const handleClickMostrarSenha = () => {
    setMostrarSenha((mostrar) => !mostrar);
  };

  return (
    <Box
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgcolor="#f5f5f5"
      padding={2}
    >
      <Card sx={{ width: 400, p: 2, borderRadius: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography
            variant="h5"
            align="center"
            fontWeight="bold"
            gutterBottom
          >
            Bem-vindo de volta
          </Typography>
          <Typography
            variant="body2"
            align="center"
            color="text.secondary"
            gutterBottom
          >
            Faça login na sua conta
          </Typography>

          {mensagem && (
            <Alert
              severity={mensagem.tipo === "sucesso" ? "success" : "error"}
              sx={{ mb: 2 }}
            >
              {mensagem.texto}
            </Alert>
          )}

          <Stack component="form" onSubmit={handleSubmit} spacing={2}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
              size="small"
            />

            <TextField
              label="Senha"
              type={mostrarSenha ? "text" : "password"}
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              fullWidth
              required
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickMostrarSenha} edge="end">
                      {mostrarSenha ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button type="submit" variant="contained" size="small" fullWidth>
              Entrar
            </Button>
          </Stack>

          <Stack direction="row" justifyContent="space-between" mt={2}>
            <Link href="#" underline="hover" variant="body2">
              Não possui uma conta?
            </Link>
            <Link href="#" underline="hover" variant="body2">
              Esqueceu a senha?
            </Link>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
