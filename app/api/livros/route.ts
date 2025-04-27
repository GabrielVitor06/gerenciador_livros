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

export async function GET() {
  const livros = lerLivros();
  return NextResponse.json(livros);
}

export async function POST(request: Request) {
  const novoLivro = await request.json();
  const livros = lerLivros();
  novoLivro.id = Date.now();
  livros.push(novoLivro);
  salvarLivros(livros);
  return NextResponse.json(novoLivro);
}
