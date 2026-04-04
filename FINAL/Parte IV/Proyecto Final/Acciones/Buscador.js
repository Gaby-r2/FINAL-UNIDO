let buscador = document.getElementById("inputBuscador");

buscador.addEventListener("keyup", buscarArtista);

function buscarArtista(){

    let texto = buscador.value.toLowerCase();

    let grupos = document.querySelectorAll(".grupo-artista");

    grupos.forEach(function(grupo){

        let nombre = grupo.dataset.artista;

        if(nombre.includes(texto)){

            grupo.style.display = "block";

        }else{

            grupo.style.display = "none";

        }

    });

}

function toggleMenu(){
    const menu = document.getElementById("menu-lateral");
    const boton = document.querySelector(".menu-button");

    menu.classList.toggle("activo");
}