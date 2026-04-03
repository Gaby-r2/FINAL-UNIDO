let numero = 1;

function aumentar(){
    numero = numero + 1;
    document.getElementById("numero").textContent = numero;
}

function disminuir(){
    numero = numero - 1;
    document.getElementById("numero").textContent = numero;
}