let botao = document.querySelector('.botao');
let selectNome = document.querySelector('#select-nome');
let atributos = document.querySelector('.atributos');
let texto1 = document.querySelector('.texto1');
let images = document.querySelectorAll('.foto');

// Função que simula uma busca assíncrona de dados com Promise
function buscarDadosPersonagem(nome) {
    return new Promise((resolve, reject) => {
        setTimeout(() => { // Simula delay de 1 segundo
            if (nome === "Comstock") {
                resolve({
                    id: 'Comstock',
                    dados: { Nome: "Zachary Hale Comstock", Nascimento: "1874" },
                    historia: document.getElementById('story-Comstock').innerHTML
                });
            } else if (nome === "Elizabeth") {
                resolve({
                    id: 'Elizabeth',
                    dados: { Nome: "Elizabeth", Nascimento: "1893" },
                    historia: document.getElementById('story-Elizabeth').innerHTML
                });
            } else if (nome === "Bokker") {
                resolve({
                    id: 'Bokker',
                    dados: { Nome: "Booker DeWitt", Nascimento: "1874" },
                    historia: document.getElementById('story-Bokker').innerHTML
                });
            } else {
                reject('Escolha um dos 3 nomes');
            }
        }, 100); // Delay assincronismo
    });
}

// Função para atualizar o DOM com os dados recebidos
function atualizarDOM(personagem) {
    images.forEach(img => img.style.display = 'none');
    atributos.innerHTML = '';
    texto1.innerHTML = '';
    texto1.style.display = 'none';

    document.getElementById(personagem.id).style.display = 'block';
    for (let chave in personagem.dados) {
        let p = document.createElement('p');
        p.innerHTML = `${chave}: ${personagem.dados[chave]}`;
        atributos.appendChild(p);
    }
    texto1.innerHTML = personagem.historia;
    texto1.style.display = 'block';
}

// Evento de clique com Promise
botao.addEventListener('click', () => {
    let selectedName = selectNome.value;

    buscarDadosPersonagem(selectedName)
        .then(personagem => {
            atualizarDOM(personagem);
        })
        .catch(erro => {
            images.forEach(img => img.style.display = 'none');
            atributos.innerHTML = erro;
            texto1.innerHTML = '';
            texto1.style.display = 'none';
        });
});

