# ✅ To-Do App

> Uma aplicação de gerenciamento de tarefas desenvolvida com **HTML, CSS e JavaScript**, com criação, conclusão, exclusão, pesquisa, filtros e persistência de dados.

<div align="center">

[![Preview](https://img.shields.io/badge/Ver-Projeto-blue?style=for-the-badge)](https://tiago-neumann.github.io/04_to_do_app/) 

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge\&logo=html5\&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge\&logo=css3\&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge\&logo=javascript\&logoColor=black)
![LocalStorage](https://img.shields.io/badge/LocalStorage-Storage-6C63FF?style=for-the-badge)

</div>

---

## 📌 Sobre o projeto

O **To-Do App** é uma aplicação para gerenciamento de tarefas diretamente no navegador.

O usuário pode criar tarefas informando um **nome** e uma **descrição**, marcar tarefas como concluídas, excluir tarefas e encontrar rapidamente uma tarefa através da pesquisa ou dos filtros disponíveis.

Um dos principais objetivos do projeto foi praticar conceitos mais avançados de JavaScript, especialmente a utilização de **classes e objetos**, além de persistência de dados com `localStorage`.

---

## ✨ Funcionalidades

* ➕ Criar novas tarefas;
* 📝 Adicionar nome e descrição;
* ☑️ Marcar tarefas como concluídas;
* ↩️ Desmarcar tarefas;
* 🗑️ Excluir tarefas;
* 🔍 Pesquisar tarefas pelo nome;
* 🏷️ Filtrar tarefas por estado;
* 💾 Salvar tarefas no `localStorage`;
* 🔄 Recuperar tarefas ao recarregar a página;
* 🆔 Sistema de IDs para identificar cada tarefa;
* 🌙 Alternar entre temas claro e escuro;
* 🚫 Impedir tarefas com nomes duplicados;
* ⚠️ Validação dos campos de criação.

---

## 🧩 Estrutura da aplicação

O projeto trabalha com três conceitos principais:

```text id="d7j8at"
              TO-DO APP
                  │
       ┌──────────┼──────────┐
       ↓          ↓          ↓
    Criar       Filtrar    Pesquisar
   tarefas     tarefas     tarefas
       │          │          │
       └──────────┼──────────┘
                  ↓
             Array de tarefas
                  ↓
             localStorage
```

As tarefas são armazenadas em um array durante a execução da aplicação:

```javascript id="9qj2y8"
const tarefas = [];
```

Quando uma nova tarefa é criada, ela é adicionada ao array e posteriormente salva no `localStorage`.

---

## 🧱 Classe `Tarefa`

Cada tarefa é representada por uma instância da classe `Tarefa`.

```javascript id="2p1g0k"
class Tarefa {
    constructor(nome, descricao) {
        this.id = contadorId++;
        this.nome = nome;
        this.descricao = descricao;
        this.concluida = false;
    }
}
```

Cada objeto possui:

| Propriedade | Descrição                        |
| ----------- | -------------------------------- |
| `id`        | Identificador único da tarefa    |
| `nome`      | Nome da tarefa                   |
| `descricao` | Descrição da tarefa              |
| `concluida` | Indica se a tarefa foi concluída |

A classe também possui métodos responsáveis por alterar o estado da tarefa:

```javascript id="q9t7v1"
concluir()
desmarcar()
editar()
remover()
```

Isso permite concentrar o comportamento relacionado às tarefas dentro da própria classe.

---

## 💾 Persistência com LocalStorage

As tarefas não são perdidas quando a página é atualizada.

O projeto utiliza o `localStorage` do navegador para armazenar os dados:

```javascript id="k8b3p2"
localStorage.setItem(
    'tarefas',
    JSON.stringify(tarefas)
);
```

Como o `localStorage` trabalha com strings, o array de objetos é convertido utilizando `JSON.stringify()`.

Ao abrir a aplicação novamente, os dados são recuperados:

```javascript id="s5h0q7"
const dados = localStorage.getItem('tarefas');

if (dados) {
    const tarefasSalvas = JSON.parse(dados);
}
```

Assim, as tarefas permanecem disponíveis mesmo depois de fechar ou atualizar a página.

---

## 🔍 Pesquisa

A aplicação possui um campo de pesquisa que atualiza os resultados conforme o usuário digita.

O texto pesquisado é normalizado:

```javascript id="x4r2m9"
const termo = input_pesquisa.value
    .toLowerCase()
    .trim();
```

Depois, o programa verifica se o nome da tarefa contém o termo pesquisado:

```javascript id="z7k1p4"
if (nome.includes(termo)) {
    container.style.display = "flex";
} else {
    container.style.display = "none";
}
```

---

## 🏷️ Filtros

As tarefas podem ser filtradas por três categorias:

* 📋 **Todas**
* ✅ **Concluídas**
* ⏳ **Pendentes**

O filtro verifica o estado `concluida` de cada objeto:

```javascript id="m6t2r8"
if (filtroSelecionado.value === "concluidas") {
    container.style.display =
        tarefa.concluida ? "flex" : "none";
}
```

---

## 🚨 Validação

Antes de criar uma tarefa, a aplicação verifica se os campos obrigatórios foram preenchidos.

Também é verificado se já existe uma tarefa com o mesmo nome:

```javascript id="w8p3n5"
const nomeExistente = tarefas.some(
    t => t.nome.toLowerCase() ===
         inputNome.value.trim().toLowerCase()
);
```

Isso evita a criação de tarefas duplicadas.

---

## 🎨 Temas

A interface possui suporte para alternância entre temas.

A troca é realizada através de um atributo no elemento `<html>`:

```javascript id="c5v9k2"
root.setAttribute('data-tema', 'light');
```

O CSS pode utilizar esse atributo para alterar as variáveis e propriedades visuais da aplicação.

---

## 🔄 Fluxo de uma tarefa

O ciclo de vida de uma tarefa funciona da seguinte maneira:

```text id="n4j8s6"
Usuário preenche os campos
          ↓
      Validação
          ↓
   Nome já existe?
      ↙       ↘
    Sim        Não
     ↓          ↓
    Erro      Criação
                 ↓
          Nova instância
            de Tarefa
                 ↓
          Array de tarefas
                 ↓
           DOM atualizado
                 ↓
          localStorage
```

---

## 🛠️ Tecnologias utilizadas

| Tecnologia          | Utilização                       |
| ------------------- | -------------------------------- |
| 🟧 **HTML5**        | Estrutura da aplicação           |
| 🟦 **CSS3**         | Estilização e temas              |
| 🟨 **JavaScript**   | Lógica da aplicação              |
| 🧱 **Classes**      | Modelagem das tarefas            |
| 📦 **Array**        | Armazenamento durante a execução |
| 💾 **LocalStorage** | Persistência dos dados           |
| 🔄 **JSON**         | Serialização dos dados           |
| ⭐ **Font Awesome**  | Ícones da interface              |

---

## 📂 Estrutura do projeto

```text id="v2q7m1"
to-do-app/
│
├── index.html
├── style.css
├── main.js
│
└── assets/
    └── preview.png
```

---

## 🚀 Como executar

### 1. Clone o repositório

```bash id="r8f3q2"
git clone https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
```

### 2. Entre na pasta

```bash id="u5n9c3"
cd SEU-REPOSITORIO
```

### 3. Execute

Abra o arquivo:

```text id="p6k2v4"
index.html
```

Ou utilize o **Live Server** no VS Code.

Não é necessário instalar dependências.

---

## 📚 O que aprendi

Este projeto foi um passo importante no meu aprendizado de JavaScript, principalmente por começar a trabalhar com **programação orientada a objetos** e persistência de dados.

Durante o desenvolvimento, pratiquei:

* Classes;
* Objetos;
* Construtores;
* Métodos;
* Arrays;
* `localStorage`;
* `JSON.stringify()`;
* `JSON.parse()`;
* `find()`;
* `some()`;
* `forEach()`;
* `includes()`;
* Manipulação do DOM;
* Criação dinâmica de elementos;
* Eventos;
* Filtros;
* Pesquisa em tempo real;
* Validação de dados;
* Persistência de informações no navegador.

---

## 🔮 Melhorias futuras

* [ ] ✏️ Adicionar edição de tarefas diretamente pela interface;
* [ ] 📅 Adicionar prazo/data para cada tarefa;
* [ ] 🔔 Criar notificações para tarefas próximas do prazo;
* [ ] ⭐ Adicionar sistema de prioridade;
* [ ] 🏷️ Permitir categorias ou etiquetas;
* [ ] ↕️ Ordenar tarefas por prioridade ou data;
* [ ] 📊 Criar um painel com estatísticas;
* [ ] 💾 Permitir exportar/importar tarefas;
* [ ] 🎨 Melhorar a personalização dos temas;
* [ ] 📱 Aperfeiçoar a experiência em dispositivos móveis.

---

## 👨‍💻 Autor

Desenvolvido por **Tiago Neumann**.

<div align="center">

[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge\&logo=github\&logoColor=white)](https://github.com/tiago-neumann)
[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge\&logo=instagram\&logoColor=white)](https://www.instagram.com/_tiagoneumann/)

</div>

---

<div align="center">

⭐ Se este projeto foi útil ou interessante, considere deixar uma estrela no repositório!

</div>
