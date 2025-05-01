import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const caminhoArquivo = path.join(process.cwd(), "livros.json");

function lerLivros() {
  if (!fs.existsSync(caminhoArquivo)) {
    fs.writeFileSync(caminhoArquivo, "[]");
  }
  const data = fs.readFileSync(caminhoArquivo, "utf-8");
  return JSON.parse(data);
}

function salvarLivros(livros: unknown[]) {
  fs.writeFileSync(caminhoArquivo, JSON.stringify(livros, null, 2));
}

// Agora a função DELETE vai usar o request como primeiro argumento
export async function DELETE(request: Request) {
  // Extraindo o id da URL usando request.nextUrl.pathname
  const url = new URL(request.url);
  const id = url.pathname.split("/").pop(); // Pega o id da URL

  if (!id) {
    return NextResponse.json(
      { message: "ID do livro não fornecido" },
      { status: 400 }
    );
  }

  const livros = lerLivros();
  const livrosFiltrados = livros.filter(
    (livro: { id: number }) => livro.id !== parseInt(id)
  );
  salvarLivros(livrosFiltrados);

  return NextResponse.json({ message: "Livro removido" });
}
