/* Inputs de criar tarefa*/
const inputNome = document.getElementById('nomeTarefa');
const inputDescricao = document.getElementById('descricaoTarefa');

const displayErros = document.getElementById('errosDeCriacao');
const displayAvisoDeTarefas = document.getElementById('avisoDeTarefas');

const minhasTarefas = document.querySelector('.minhas_tarefas');

const tarefas = [];
let contadorId = 0;

class Tarefa{
    constructor(nome, descricao){
        this.id = contadorId++;
        this.nome = nome;
        this.descricao = descricao;
        this.concluida = false;
    }

    concluir() {
        this.concluida = true;
    }

    desmarcar(){
        this.concluida = false;
    }

    editar(novoNome, novaDescricao){
        if (novoNome) {this.name = novoNome;}
        if (novaDescricao) {this.descricao = novaDescricao;}
    }
}

function verificadorDeErros(){
    if(inputNome.value === ""){
        displayErros.textContent = "A tarefa precisa de um nome para ser criada!"
        return false;
    }
    
    if(inputDescricao.value === ""){
        displayErros.textContent = "A tarefa precisa de uma descrição para ser criada!"
        return false;
    }

    const nomeExistente = tarefas.some(tarefaAtual => tarefaAtual.nome.toLowerCase() === inputNome.value.trim().toLowerCase());
    
    if(nomeExistente){
        displayErros.textContent = "A tarefa utiliza de um nome já existente!"
        return false;
    }

    displayErros.textContent = "";
    return true;
}

function criarElementosHTML(tarefa){
    const container = document.createElement("div");
    container.classList.add('tarefas');

    const blocoDeMudancas = document.createElement("div");
    const titulo = document.createElement("h3");
    const descricao = document.createElement("p");
    
    const checkbox = document.createElement("input");
    checkbox.type = 'checkbox';
    checkbox.checked = tarefa.concluida

    const button = document.createElement("button");

    

    titulo.textContent = `${tarefa.nome}`
    descricao.textContent = `${tarefa.descricao}`;

    minhasTarefas.appendChild(container);
    container.appendChild(titulo);
    container.appendChild(descricao);
    container.appendChild(blocoDeMudancas);
    blocoDeMudancas.appendChild()
    blocoDeMudancas.appendChild(checkbox);
}

function criarTarefa(nome, descricao){
    const novaTarefa = new Tarefa(nome, descricao);
    tarefas.push(novaTarefa);

    criarElementosHTML(novaTarefa);

    console.log(novaTarefa);
}

function concluirTarefa(id){
    const tarefa = tarefas.find(tarefaAtual => tarefaAtual.id === id);

    if (tarefa) {
        tarefa.concluir();
    }
}

function desmarcarTarefa(){
    const tarefa = tarefas.find(tarefaAtual => tarefaAtual.id === id);

    if (tarefa) {
        tarefa.desmarcar();
    }
}

const btn_criarTarefa = document.getElementById('criarTarefa')

btn_criarTarefa.addEventListener('click', () => {

    if(verificadorDeErros()){
        const nomeTarefa = inputNome.value;
        const descricaoTarefa = inputDescricao.value;

        criarTarefa(nomeTarefa, descricaoTarefa);

        displayAvisoDeTarefas.style.display = "none";
        inputNome.value = "";
        inputDescricao.value = "";
    }
});