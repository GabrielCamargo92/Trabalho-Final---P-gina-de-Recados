
const inputDescricao    = document.getElementById('descricao');
const inputDetalhamento = document.getElementById('detalhamento');
const lista             = document.getElementById('lista');

let buscaLocalStorage = () =>{
    let buscaLocalStorage1 = JSON.parse(localStorage.getItem('recados'))|| [];
    return buscaLocalStorage1
}
criaRecado()

let recado = buscaLocalStorage();

function adicionar() {
    let data={
        descricao: null,
        detalhamento: null,
        id: null
    }
    data.descricao    = inputDescricao.value;
    data.detalhamento = inputDetalhamento.value;
    data.id           = recado.length+1;  //gerarID   ?? gerarID(recado)

    // validando a descrição 
    if (data.descricao == null || data.descricao == '') {
        alert("Por favor, informe a descrição do recado.");
        inputDescricao.focus();
        return;
    }

    const novaLinha = gerarRecado(data);
    lista.appendChild(novaLinha);
    
    recado.push(data)
    localStorage.setItem('recados', JSON.stringify(recado));

    limpar();
    
}



function criaRecado(){
    let recados =  buscaLocalStorage ();
    
    for( const recado of recados){
        const linha = gerarRecado(recado);
        lista.appendChild(linha);
    }
}

const LS=localStorage.getItem('recados')
const bancoDadosLS=JSON.parse(LS)


function limpar() {
    inputDescricao.value = '';
    inputDetalhamento.value = '';
}

function gerarRecado (recado) {
    const items = document.getElementsByClassName('recado-item');
    // const id = Math.floor(Date.now()/1000)
    const id = recado.id;

    const elementTR = document.createElement('tr');
    elementTR.classList = ['recado-item'];
    elementTR.id = id;

    // bloco para criação da informação do ID
    const elementTdId     = document.createElement('td');
    elementTdId.innerText = id;
    elementTR.appendChild(elementTdId);
    
    // bloco para criação da informação da descricao
    const elementTdDescricao     = document.createElement('td');
    elementTdDescricao.classList = 'elementTdDescricao'
    elementTdDescricao.innerText = recado.descricao; 
    elementTR.appendChild(elementTdDescricao);

    // bloco para criação da informação do detalhamento
    const elementTdDetalhamento     = document.createElement('td');
    elementTdDetalhamento.innerText = recado.detalhamento;
    elementTR.appendChild(elementTdDetalhamento);

    // bloco para criação das ações
    const elementTdActions = document.createElement('td');

    const btnRemove     = document.createElement('button'); //criando botão remover
    const btnEdit       = document.createElement('button'); //criando botão editar
    btnEdit.classList   = 'btnEdit';
    btnRemove.classList = 'btnRemove'
    
    btnRemove.innerText = 'Remover';
    btnRemove.onclick   = removerItem;
    btnRemove.id        = id;

    elementTdActions.appendChild(btnRemove);

    elementTR.appendChild(elementTdActions);

    btnEdit.innerText = 'Editar';
    btnEdit.onclick   = editarItem;
    btnEdit.id        = id;

    elementTdActions.appendChild(btnEdit);

    elementTR.appendChild(elementTdActions);

    return elementTR;
}


function removerItem () {
    const target = this.id;
    
    const note  = recado.filter((element)=>{

        return element.id != target
    })
    recado = note
    // localStorage.clear()
    localStorage.setItem('recados', JSON.stringify(recado));

    const elements = document.getElementsByClassName('recado-item');

    for (let i = 0; i < elements.length; i++) {
        if (elements[i].id == target){
            lista.removeChild(elements[i]);
            return;
        }
    }

}
const idBody=document.getElementById('idBody');

//Função para o botão de editar o recado

function editarItem(){
    const target   = this.id
    const elements = document.getElementsByClassName('recado-item');
    
    const backGroundModal = document.createElement('div')
    backGroundModal.classList="backGroundModal";
    idBody.appendChild(backGroundModal);

    
    const containerModal    = document.createElement('div');
    containerModal.classList='containerModal'
    backGroundModal.appendChild(containerModal);
    
    const container    = document.createElement('div');
    container.classList='containerDiv';
    containerModal.appendChild(container);

    const btnFecharModal    = document.createElement('button');
    btnFecharModal.classList='btnFecharModal'
    btnFecharModal.innerText='X';
    
    const tituloModal    = document.createElement('h1');
    tituloModal.classList='tituloModal';
    tituloModal.innerText= "Edite seu recado"

    container.append(tituloModal, btnFecharModal)

    const editeArea    = document.createElement('section');
    editeArea.classList='editeArea';
    containerModal.appendChild(editeArea);

    const textAreaDescricao    = document.createElement('textarea');
    textAreaDescricao.classList='textAreaDescricao';

    const textAreaDetalhamento    = document.createElement('textarea');
    textAreaDetalhamento.classList='textAreaDetalhamento';

    const btnSalvarEdicao    = document.createElement('button');
    btnSalvarEdicao.classList='btnSalvarEdicao';
    btnSalvarEdicao.innerText="Salvar"

    
    editeArea.append(textAreaDescricao, textAreaDetalhamento, btnSalvarEdicao);

    const recadoEditado  = recado.filter((element)=>{
        return element.id==target
    })
    
    

    
    textAreaDescricao.value    = recadoEditado[0].descricao;
    textAreaDetalhamento.value = recadoEditado[0].detalhamento;
        

    
    

    btnSalvarEdicao.addEventListener('click', (event)=>{
        const inputEditDescricao = document.getElementsByClassName('elementTdDescricao')
        event.preventDefault();
        textAreaDescricao.value = inputEditDescricao.item
        console.log(inputEditDescricao.item)
        

        
        idBody.removeChild(backGroundModal);
    })


    btnFecharModal.addEventListener('click', ()=>{
        idBody.removeChild(backGroundModal);
    })

}
