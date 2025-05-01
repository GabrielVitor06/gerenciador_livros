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

export async function DELETE(
  req: Request,
  context: { params: { id: string } }
) {
  const id = context.params.id;

  const livros = lerLivros();
  const livrosFiltrados = livros.filter(
    (livro: { id: number }) => livro.id !== parseInt(id)
  );
  salvarLivros(livrosFiltrados);

  return NextResponse.json({ message: "Livro removido" });
}
