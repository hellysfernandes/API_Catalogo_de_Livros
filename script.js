const API = "https://livros.acilab.com.br/api/livros";
const corpo = document.getElementById("corpo");
const headers = { "Content-Type": "application/json" };

async function listar() {
  const livros = await (await fetch(API)).json();
  corpo.innerHTML = "";
  livros.forEach(l => {
    const tr = corpo.insertRow();
    tr.insertCell().textContent = l.id;
    tr.insertCell().textContent = l.titulo;
    tr.insertCell().textContent = l.autor;
    const acoes = tr.insertCell();

    const editar = document.createElement("button");
    editar.textContent = "Editar";
    editar.onclick = async () => {
      const titulo = prompt("Novo título:", l.titulo);
      const autor = prompt("Novo autor:", l.autor);
      if (!titulo || !autor) return;
      await fetch(`${API}/${l.id}`, { method: "PUT", headers, body: JSON.stringify({ titulo, autor }) });
      listar();
    };

    const excluir = document.createElement("button");
    excluir.textContent = "Excluir";
    excluir.onclick = async () => {
      if (!confirm(`Excluir "${l.titulo}"?`)) return;
      await fetch(`${API}/${l.id}`, { method: "DELETE" });
      listar();
    };

    acoes.append(editar, excluir);
  });
}

document.getElementById("form").onsubmit = async e => {
  e.preventDefault();
  const titulo = document.getElementById("titulo").value.trim();
  const autor = document.getElementById("autor").value.trim();
  if (!titulo || !autor) return;
  await fetch(API, { method: "POST", headers, body: JSON.stringify({ titulo, autor }) });
  e.target.reset();
  listar();
};

listar();