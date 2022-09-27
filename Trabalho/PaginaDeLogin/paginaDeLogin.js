
const btnLogin = document.getElementById("botaoEntrar");
const formulario = document.querySelector(".formulario");

let listaDeUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

console.log(listaDeUsuarios)

let login = {}

btnLogin.addEventListener("click", logar);
function logar(e) {
  e.preventDefault();

  for (let i = 0; i < formulario.length; i++) {
    console.log(formulario[0].name)
    const {name, value} = formulario[i];
    login [name]=value
  }
  
  validaLogin(login.usuário, login.password)

formulario.reset()

}

function validaLogin (user, password) {
  const usuario=listaDeUsuarios.find((element)=>{
      return element.usuário===user && element.password===password
  })
  if (!usuario) {
      alert("usuário não encontrado")
  }else{
      window.location.replace("../paginaDeRecados/meusRecados.html")
      console.log(usuario)
      return usuario
  }
}

const button = document.getElementById('botaoCriarConta');
button.addEventListener('click', () => {
    window.location.href="../paginaDeCadastro/paginaCadastro.html";
})