/* Inputs de criar tarefa*/
const inputNome = document.getElementById('nomeTarefa');
const inputDescricao = document.getElementById('descricaoTarefa');

const displayErros = document.getElementById('errosDeCriacao');
const displayAvisoDeTarefas = document.getElementById('avisoDeTarefas');

const minhasTarefas = document.querySelector('.minhas_tarefas');

const tarefas = [];
let contadorId = 0;

class Tarefa{
    constructor(nomeTarefa, descricaoTarefa){
        this.id = contadorId++;
        this.nomeTarefa = nomeTarefa;
        this.descricaoTarefa = descricaoTarefa;
        this.concluida = false;
    }
}

let existeErro;

function verificadorDeErros(){
    existeErro = false;

    if(inputNome.value === ""){
        existeErro = true;
        displayErros.textContent = "A tarefa precisa de um nome para ser criada!"
    } else if(inputDescricao.value === ""){
        existeErro = true;
        displayErros.textContent = "A tarefa precisa de uma descrição para ser criada!"
    } else {
        existeErro = false;
        displayErros.textContent = "";
    }
}

function criarElementosHTML(tarefa){
    const div = document.createElement("div");
    const h3 = document.createElement("h3");
    const p = document.createElement("p");
    const checkbox = document.createElement("input")

    checkbox.type = 'checkbox';

    h3.textContent = `${tarefa.nomeTarefa}`
    p.textContent = `${tarefa.descricaoTarefa}`;

    div.appendChild(h3);
    div.appendChild(p);
    div.appendChild(checkbox);
    div.classList.add('tarefas')
    minhasTarefas.appendChild(div);
}

function criarTarefa(nomeTarefa, descricaoTarefa){
    const novaTarefa = new Tarefa(nomeTarefa, descricaoTarefa);
    tarefas.push(novaTarefa);

    criarElementosHTML(novaTarefa);

    console.log(novaTarefa);
}

function concluirTarefa(id){
    const tarefa = tarefas.find(tarefaAtual => tarefaAtual.id === id);

    if (tarefa) {
        tarefa.concluida = true;
    }
}

const btn_criarTarefa = document.getElementById('criarTarefa')

btn_criarTarefa.addEventListener('click', () => {

    verificadorDeErros();

    if(existeErro === false){
        const nomeTarefa = inputNome.value;
        const descricaoTarefa = inputDescricao.value;

        criarTarefa(nomeTarefa, descricaoTarefa);

        displayAvisoDeTarefas.style.display = "none";
        //inputNome.value = "";
        //inputDescricao.value = "";
    }
});