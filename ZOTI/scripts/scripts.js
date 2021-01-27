window.onload = function () {

    var menu = 
    [
        {
            name: "Home",
            link: "#",
            target: "_self"
        },
        {
            name: "Sobre",
            link: "#about",
            target: "_self",
            text: "Anim occaecat deserunt reprehenderit ea ea."
        },
        {
            name: "Serviços",
            link: "#services",
            target: "_self",
            text: "Anim occaecat deserunt reprehenderit ea ea."
        },
        {
            name: "Produtos",
            link: "#products",
            target: "_self",
            text: "Anim occaecat deserunt reprehenderit ea ea."
        },
        {
            name: "Contactos",
            link: "#contacts",
            target: "_self",
            text: "Anim occaecat deserunt reprehenderit ea ea."
        }
        
    ];

    var childElement;
    var element;

    element = document.getElementById("menu");
    var innerHTMLString = "";

    innerHTMLString += "<li class=\"menu-item\"><button id=\"menu-close\" onclick=\"toggleMenuVisibility\(\)\"><i class=\"fas fa-times\"></i></button></li>";
    
        //create the menu
        for( i = 0; i < menu.length ; i++ ){
            innerHTMLString += "<li class=\"menu-item\"><a href=\""+ menu[i].link +"\" target=\"" + menu[i].target +"\">" + menu[i].name + "</a></li>";
        }
    
        element.innerHTML = innerHTMLString;
    
        //create the sections the menu points to
        
        for( i = 1; i < menu.length ; i++ ){
            element = document.createElement('div');
            element.setAttribute("id", menu[i].link.substring(1,menu[i].link.length));
            var mainElement = document.getElementsByTagName("main");

            if(mainElement.length === 1){
                mainElement[0].appendChild(element);
            
            }
            
            
            element = document.getElementById(menu[i].link.substring(1,menu[i].link.length));
    
            childElement = document.createElement("h1");
            childElement.innerText = menu[i].name;
            element.appendChild(childElement);
    
            childElement = document.createElement("p");
            childElement.innerText = menu[i].text;
            element.appendChild(childElement);
        }
    
    
        
    };
    
    document.getElementById("menu-toggle").addEventListener('click',toggleMenuVisibility);
    
    function toggleMenuVisibility(){
        document.getElementById("menu").classList.toggle("visible");
        document.getElementById("menu-close").firstChild.classList.toggle("fa-3x");
    }
    