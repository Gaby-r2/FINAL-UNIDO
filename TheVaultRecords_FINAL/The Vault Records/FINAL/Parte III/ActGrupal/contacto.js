const form = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

form.addEventListener("submit", function(e){
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const telefono = document.getElementById("telefono").value.trim();
  const mensaje = document.getElementById("mensaje").value.trim();

  if(nombre === "" || correo === "" || telefono === "" || mensaje === ""){
    formMessage.textContent = "Por favor completa todos los campos.";
    formMessage.style.color = "#b22222";
    return;
  }

  formMessage.textContent = "¡Mensaje enviado con éxito!";
  formMessage.style.color = "#2e6f35";

  form.reset();
});