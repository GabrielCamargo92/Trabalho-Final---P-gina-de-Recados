let listaDeUsuarios      = localStorage.getItem("usuarios");
let arrayListaDeUsuarios = JSON.parse(listaDeUsuarios) || [];
console.log(arrayListaDeUsuarios);
const formulario         = document.getElementById("formulario");
const inputUsername      = document.getElementById("username");
const inputPassword1     = document.getElementById("password1")
const inputPassword2     = document.getElementById("password2");
const btnCriarConta      = document.getElementById("btn")
let validaSenha1         = false;
let validaSenha2         = false;



//Evento para cadastrar formulário de cadastro do usuário

btnCriarConta.addEventListener("click", cadastraUsuario);
function cadastraUsuario(e) {
    e.preventDefault();
    
    if(inputPassword1.value.length <8){
        alert("A senha precisa ter no mínimo 8 caracteres");
        validaSenha1 = false;
    }else{
        validaSenha1 = true;
    };
    
    
    if(inputPassword2.value != inputPassword1.value){
        alert("As senhas não estão iguais");
        validaSenha2 = false;
    }else{
        validaSenha2 = true;
    };

    if(validaSenha1 && validaSenha2){
        const login = {
            usuário: inputUsername.value,
            password: inputPassword1.value
        };
        arrayListaDeUsuarios.push(login);
        console.log(arrayListaDeUsuarios)
        localStorage.setItem("usuarios", JSON.stringify(arrayListaDeUsuarios));


        window.location.href="../PaginaDeLogin/index.html";
    }else{
        alert("Usuário ou Senha incorretos")
    }
}



