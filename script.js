const API = "https://livros.acilab.com.br/api/livros";

const corpo = document.getElementById("corpo");

const mostrarr = document.getElementById("mostrar");
mostrarr.addEventListener("click", () => {
  fetch(API, {method: "GET"})
    .then(response => response.json())
    .then(livros => {
      corpo.innerHTML = "";

      livros.forEach(livro => {
        const tr = document.createElement("tr");

        const tdId = document.createElement("td");
        tdId.textContent = livro.id;

        const tdTitulo = document.createElement("td");
        tdTitulo.textContent = livro.titulo;

        const tdAutor = document.createElement("td");
        tdAutor.textContent = livro.autor;

        tr.appendChild(tdId);
        tr.appendChild(tdTitulo);
        tr.appendChild(tdAutor);

        corpo.appendChild(tr);
      });
    });
})

function listar() { 
  fetch(API, {method: "GET"})
    .then(response => response.json())
    .then(livros => {
      corpo.innerHTML = "";

      livros.forEach(livro => {
        const tr = document.createElement("tr");

        const tdId = document.createElement("td");
        tdId.textContent = livro.id;

        const tdTitulo = document.createElement("td");
        tdTitulo.textContent = livro.titulo;

        const tdAutor = document.createElement("td");
        tdAutor.textContent = livro.autor;

        tr.appendChild(tdId);
        tr.appendChild(tdTitulo);
        tr.appendChild(tdAutor);

        corpo.appendChild(tr);
      });
    });
}
// listar();


const cadastrar = document.getElementById("cadastrar"); // nao ta prestando ainda!
cadastrar.addEventListener("click", () => {
  fetch(API, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({titulo, autor})
  }) 
  .then(response => response.json())
  .then(livro => {
    const titulo = document.getElementById("titulo");
    const autor = document.getElementById("autor");

    if (titulo == "" || autor == "") {
      mostrar("Fail: valor vazio");
      return;
    }



  });
})

function adicionar(titulo, autor) {  // nao ta prestando ainda!
  fetch(API, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({titulo, autor})
  }) 
  .then(response => response.json())
  .then(livro => {
    const titulo = document.getElementById("titulo");
    const autor = document.getElementById("autor");

    if (titulo === "" || autor === "") {
      mostrar("Fail: valor vazio");
      return;
    }

  });
}
