const API = "https://livros.acilab.com.br/api/livros";
const corpo = document.getElementById("corpo");
const status = document.getElementById("status");
const msg = document.getElementById("msg");

function mostrar(texto, classe) {
  msg.textContent = texto;
  msg.className = classe;
}

// LISTAR (GET)
function listar() {
  status.textContent = "Carregando...";
  fetch(API)
    .then(r => r.json())
    .then(livros => {
      corpo.innerHTML = "";
      status.textContent = livros.length === 0 ? "Nenhum livro cadastrado." : "";

      livros.forEach(livro => {
        const tr = document.createElement("tr");

        const tdTitulo = document.createElement("td");
        tdTitulo.textContent = livro.titulo;
        const tdAutor = document.createElement("td");
        tdAutor.textContent = livro.autor;

        const tdAcoes = document.createElement("td");
        const btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.onclick = () => editar(livro);
        const btnExcluir = document.createElement("button");
        btnExcluir.textContent = "Excluir";
        btnExcluir.onclick = () => excluir(livro);
        tdAcoes.append(btnEditar, btnExcluir);

        tr.append(tdTitulo, tdAutor, tdAcoes);
        corpo.appendChild(tr);
      });
    })
    .catch(() => {
      status.textContent = "";
      mostrar("Erro ao carregar os livros.", "erro");
    });
}

// CADASTRAR (POST)
document.getElementById("form").addEventListener("submit", e => {
  e.preventDefault();
  const titulo = document.getElementById("titulo").value.trim();
  const autor = document.getElementById("autor").value.trim();

  if (titulo === "" || autor === "") {
    mostrar("Preencha título e autor.", "erro");
    return;
  }

  fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ titulo, autor })
  })
    .then(r => {
      if (!r.ok) throw new Error();
      return r.json();
    })
    .then(() => {
      e.target.reset();
      mostrar("Livro cadastrado!", "ok");
      listar();
    })
    .catch(() => mostrar("Erro ao cadastrar.", "erro"));
});

// EDITAR (PUT)
function editar(livro) {
  const titulo = prompt("Novo título:", livro.titulo);
  const autor = prompt("Novo autor:", livro.autor);
  if (titulo === null || autor === null) return;

  if (titulo.trim() === "" || autor.trim() === "") {
    mostrar("Preencha título e autor.", "erro");
    return;
  }

  fetch(`${API}/${livro.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ titulo: titulo.trim(), autor: autor.trim() })
  })
    .then(r => {
      if (!r.ok) throw new Error();
      mostrar("Livro atualizado!", "ok");
      listar();
    })
    .catch(() => mostrar("Erro ao atualizar.", "erro"));
}

// EXCLUIR (DELETE)
function excluir(livro) {
  if (!confirm(`Excluir "${livro.titulo}"?`)) return;

  fetch(`${API}/${livro.id}`, { method: "DELETE" })
    .then(r => {
      if (!r.ok) throw new Error();
      mostrar("Livro excluído!", "ok");
      listar();
    })
    .catch(() => mostrar("Erro ao excluir.", "erro"));
}

listar();