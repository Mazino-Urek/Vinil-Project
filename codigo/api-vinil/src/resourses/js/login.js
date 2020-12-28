
var valida;
var password;
var email;
var new_user; //usada para fazer o JSON do novo ususario

onload = () => {
    valida = false;
    password = document.getElementById('password');
    email = document.getElementById('email');
}

/*
verifica se o email digitado é valido
 */
function validacaoEmail(field) {
    usuario = field.value.substring(0, field.value.indexOf("@"));
    dominio = field.value.substring(field.value.indexOf("@")+ 1, field.value.length);
    
    if (((usuario.length >=1) &&
        (dominio.length >=3) &&
        (usuario.search("@")==-1) &&
        (dominio.search("@")==-1) &&
        (usuario.search(" ")==-1) &&
        (dominio.search(" ")==-1) &&
        (dominio.search(".")!=-1) &&
        (dominio.indexOf(".")>=1)&&
        (dominio.lastIndexOf(".") < dominio.length - 1))) {

            email.style.borderColor = "green";
            valida = true;
    }
    else{
        email.style.borderColor = "red";
        valida = false;
    }
}//end validacaoEmail

/*
verifica se a senha digitada é diferente null
*/
function validacaoSenha(aux) {
    if (aux.value.length != 0) {
        password.style.borderColor = "green";
        valida = true;
    }
    else{
        password.style.borderColor = "red";
        valida = false;
    }
}

/**
 * Fazer o login do ususario
 */
async function Login(){
    if(valida){
        let cop = {email: email.value, senha: password.value};
        const response = await fetch('http://52.167.125.62:4567/login', { method: "POST", body: JSON.stringify(cop) }          );
        const data = await response.json();
        if(data.status == "1"){
            localStorage.setItem('user', JSON.stringify(data));
            window.location.href = "http://52.167.125.62:4567/index.html";
        } else {
            alert("Erro ao fazer login, usuário inexistente");
        }
    }
}

/**
 * Validar os dados inseridos
 */
function validarTudo(){
          try{
                    //pegando os dados registrados 
                    let nomeU = document.getElementById('txt_nome').value;
                    let sobrenomeU = document.getElementById('txt_sobrenome').value;
                    let numeroU = document.getElementById('txt_celular').value;
                    let loginU = document.getElementById('txt_login');
                    let senhaU = document.getElementById('txt_senha').value;
                    let senha2U = document.getElementById('txt_senha2').value;
                    validacaoEmail(loginU);//validando o email		  
                    let resp = false;
                    if( nomeU        == "" || 
                        sobrenomeU   == "" || 
                        senhaU       == "" ||
                        loginU.value == "" ||
                        senha2U      == "" ||
                        numeroU      == ""  ){
                              throw "Algum campo está vazio"; 
                    } else if (numeroU.length < 8 ){
                              throw "tamanho de número inválido"; 
                    } else if (!valida){
                              throw "email inválido"; 
                    } else if (senhaU != senha2U){
                              throw "senhas não coincídem";
                    } else {
                              new_user = {nome:nomeU, sobrenome:sobrenomeU, senha:senhaU, email:loginU.value, numero:numeroU} //montando o arquivo JSON
                              resp = true;
                    }
                    return resp;          
          } catch(err) {
                    alert(err); 
          }
}

/**
 * Registrar novo usuario
 */
async function cadastroUser(){
    if(validarTudo()){//validar informacoes inseridas
          const response = await fetch('http://52.167.125.62:4567/cadastroUser', {method:"POST", body: JSON.stringify(new_user)}); 
          const data = await response.json();          
          if(data.status != '0'){//verificar se o email existe
                    alert("Cadastro completo"); //casdastro completo 
                    window.location.href = "http://52.167.125.62:4567/login.html"; //recarregando a pagina de login     
          } else {
                    alert("Usuário já cadastrado"); //usuario ja cadastrado
          }
    }
}