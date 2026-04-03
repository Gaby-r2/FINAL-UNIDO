const homeBtn = document.querySelector(".home-btn");

homeBtn.addEventListener("click", function(e){
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});