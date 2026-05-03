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
        if (novoNome) this.nome = novoNome;
        if (novaDescricao) this.descricao = novaDescricao;
    }

    remover(){
        const index = tarefas.indexOf(this);

        if (index !== -1) {
            tarefas.splice(index, 1);
        }
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

    const nomeExistente = tarefas.some(t => t.nome.toLowerCase() === inputNome.value.trim().toLowerCase());
    
    if(nomeExistente){
        displayErros.textContent = "A tarefa utiliza de um nome já existente!"
        return false;
    }

    displayErros.textContent = "";
    return true;
}

function criarElementosHTML(tarefa){

    //Relacionado ao container principal de cada tarefa
    const container = document.createElement("div");
    container.classList.add('tarefas');
    container.dataset.id = tarefa.id;

    const blocoDeMudancas = document.createElement("div");
    blocoDeMudancas.classList.add('alteracoes_tarefas')

    const titulo = document.createElement("h3");
    const descricao = document.createElement("p");

    //Relacionado ao label que contem o checkbox
    const label_checkbox = document.createElement("label");
    label_checkbox.classList.add('checkbox');
    
    //Relacionado ao checkbox de cada tarefa
    const checkbox = document.createElement("input");
    checkbox.type = 'checkbox';
    checkbox.checked = tarefa.concluida

    checkbox.addEventListener ('change', () => {
        if(checkbox.checked){
            tarefa.concluir();
        } else {
            tarefa.desmarcar();
        }
    })
    
    //Relacionado ao botão de exclusação da tarefa
    const btn_excluir = document.createElement("button");
    btn_excluir.classList.add('btn_excluir');
    btn_excluir.textContent = "Excluir"

    btn_excluir.addEventListener("click", () => {
        container.remove();
        tarefa.remover();
    })

    titulo.textContent = `${tarefa.nome}`
    descricao.textContent = `${tarefa.descricao}`;

    minhasTarefas.appendChild(container);
    container.appendChild(titulo);
    container.appendChild(descricao);
    container.appendChild(blocoDeMudancas);
    label_checkbox.appendChild(checkbox);
    blocoDeMudancas.appendChild(label_checkbox);
    blocoDeMudancas.appendChild(btn_excluir);

    return container;
}

function criarTarefa(nome, descricao){
    const novaTarefa = new Tarefa(nome, descricao);
    tarefas.push(novaTarefa);

    criarElementosHTML(novaTarefa);

    console.log(novaTarefa);
}

function concluirTarefa(id){
    const tarefa = tarefas.find(t => t.id === id);

    if (tarefa) {
        tarefa.concluir();
    }
}

function desmarcarTarefa(id){
    const tarefa = tarefas.find(t => t.id === id);

    if (tarefa) {
        tarefa.desmarcar();
    }
}

function filtrarTarefas(){
    const filtroSelecionado = document.querySelector('input[name="tarefas"]:checked');

    const containers = document.querySelectorAll('.tarefas');

    containers.forEach(container => {
        const id = container.dataset.id;

        const tarefa = tarefas.find(t => t.id == id);
    

    if(filtroSelecionado.value === "concluidas"){
        container.style.display = tarefa.concluida ? "flex" : "none";
    }

    if(filtroSelecionado.value === "pendentes"){
        container.style.display = !tarefa.concluida ? "flex" : "none";
    }

    if(filtroSelecionado.value === "todas"){
        container.style.display = "flex";
    }
    })
}

const input_pesquisa = document.querySelector('input[name="pesquisa"]')

input_pesquisa.addEventListener("input", pesquisa);

function pesquisa(){
    const termo = input_pesquisa.value.toLowerCase().trim();

    const container = document.querySelectorAll('.tarefas');

    container.forEach(container => {
        const id = container.dataset.id;

        const tarefa = tarefas.find(t => t.id == id);

        if(!tarefa) return;

        const nome = tarefa.nome.toLowerCase();

        if(nome.includes(termo)){
            container.style.display = "flex";
        } else {
            container.style.display = "none"
        }
    })
}

const btn_criarTarefa = document.getElementById('criarTarefa')

btn_criarTarefa.addEventListener('click', () => {

    if(verificadorDeErros()){
        const nomeTarefa = inputNome.value;
        const descricaoTarefa = inputDescricao.value;

        criarTarefa(nomeTarefa, descricaoTarefa);

        displayAvisoDeTarefas.style.display = 'none';

        inputNome.value = "";
        inputDescricao.value = "";
    }
});