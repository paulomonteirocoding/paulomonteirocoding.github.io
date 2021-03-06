document.getElementById("menu-toggle").addEventListener('click',toggleMenuVisibility);

function toggleMenuVisibility(){
    if(window.innerWidth < 900 || document.getElementById("menu").classList.contains("visible")){
        
        document.getElementById("menu").classList.toggle("visible");
        document.getElementById("menu-close").firstChild.classList.toggle("fa-3x");
        document.getElementById("nav").classList.toggle("overlay");

    }
}


document.getElementById("sendWhatsappMessageBtn").addEventListener('click', ()=>{
    var urlToSendMessage = "https://wa.me/351938556463?text=" + encodeURI(document.getElementById("message").value);
    window.open(urlToSendMessage);
    document.getElementById("message").value = "";

});

window.addEventListener('resize', setiframesize());

function setiframesize(){
    var iframes = document.getElementsByTagName("iframe");
    
    if(window.innerWidth < 400){
        
        for(i = 0; i< iframes.length ; i++){
            iframes[i].width = 300;
        }
    }else{
        for(i = 0; i< iframes.length ; i++){
            iframes[i].width = 350;
        }
    }
}