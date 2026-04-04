const togglePassword = document.querySelector('#togglePassword');
const password = document.querySelector('#password');

togglePassword.addEventListener('click', function () {
    // Alternar el tipo de atributo
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    
    // Cambiar el texto con una pequeña transición de opacidad
    this.style.opacity = '0';
    
    setTimeout(() => {
        this.textContent = type === 'password' ? 'SHOW' : 'HIDE';
        this.style.opacity = '1';
    }, 150);
});

// Opcional: Agregar un efecto de enfoque automático al cargar
window.addEventListener('DOMContentLoaded', () => {
    console.log("The Vault Secure Sign-In Ready");
});