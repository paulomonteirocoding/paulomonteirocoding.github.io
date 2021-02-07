document.getElementById("menu-toggle").addEventListener('click',toggleMenuVisibility);

function toggleMenuVisibility(){
    if(window.innerWidth < 900 || document.getElementById("menu").classList.contains("visible")){
        
        document.getElementById("menu").classList.toggle("visible");
        document.getElementById("menu-close").firstChild.classList.toggle("fa-3x");
        document.getElementById("nav").classList.toggle("overlay");

    }
}
