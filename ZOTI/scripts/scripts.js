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
            text: "Por favor dá-me um texto para por aqui sobre a tua marca"
        },
        {
            name: "Serviços",
            link: "#services",
            target: "_self",
            text: "Anim occaecat deserunt reprehenderit ea ea.",
            
            children:[
                {
                    name:"Recriação Histórica"
                },
                {
                    name:"Recriação de ofícios"
                },
                {
                    name:"Workshops"
                }

            ]
        },
        {
            name: "Produtos",
            link: "#products",
            target: "_self",
            text: "Anim occaecat deserunt reprehenderit ea ea.",
            children:[
                {
                    name:"Brincos"
                },
                {
                    name:"Pulseiras"
                },
                {
                    name:"Colares"
                },
                {
                    name:"Peças em Cota de Malha personalizadas"
                },
                {
                    name:"E muitas outras peças feitas de forma tradicional e artesanal"
                }
            ]

        },
        {
            name: "Contactos",
            link: "#contacts",
            target: "_self",
            text: "Anim occaecat deserunt reprehenderit ea ea.",
            children:
            [
                {
                    name:"Facebook",
                    value :"afgbaln@galdkba.com",
                    facebookGallery:"<iframe src=\"https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fmedia%2Fset%2F%3Fvanity%3DKarrasku%26set%3Da.1749155248697192&tabs=timeline&width=340&height=500&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false&appId\" width=\"340\" height=\"500\" style=\"border:none;overflow:hidden\" scrolling=\"no\" frameborder=\"0\" allowfullscreen=\"true\" allow=\"autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share\"></iframe>"
                },
                {
                    name:"afgbaln@galdkba.com",
                    value :"afgbaln@galdkba.com"
                },
                {
                    name:"afgbaln@galdkba.com",
                    value :"afgbaln@galdkba.com"
                }
            ]
        }
        
    ];

    var socialLinks = 
    [
        {
            name:"Facebook",
            link:"#",
            element:"<i class=\"fab fa-facebook\"></i>"
        },
        {
            name:"Instagram",
            link:"#",
            element:"<i class=\"fab fa-instagram\"></i>"
        },
        {
            name:"WhatsApp",
            link:"#",
            element:"<i class=\"fab fa-whatsapp\"></i>"
        }
    ];
    var childElement;
    var element;

    element = document.getElementById("menu");
    var innerHTMLString = "<li onclick=\"toggleMenuVisibility()\" class=\"menu-item\" id=\"menu-close\"><i class=\"fa fa-times\"></i></li>";

    
        //create the menu
        for( i = 0; i < menu.length ; i++ ){
            innerHTMLString += "<li class=\"menu-item\" onclick=\"toggleMenuVisibility\(\)\"><a href=\""+ menu[i].link +"\" target=\"" + menu[i].target +"\">" + menu[i].name + "</a></li>";
        }

        /*for( i = 0; i < socialLinks.length ; i++ ){
            innerHTMLString +="<li><a href=\"" + socialLinks[i].link + "\">" + socialLinks[i].element + "</a></li>";
        }
*/
        
        element.innerHTML = innerHTMLString;
        //create the sections the menu points to
        
        for( i = 1; i < menu.length ; i++ ){
            element = document.createElement('section');
            element.setAttribute("id", menu[i].link.substring(1,menu[i].link.length));
            var mainElement = document.getElementsByTagName("main");
            

            if(mainElement.length === 1){
                mainElement[0].appendChild(element);
            
            }
            
            document.getElementById(menu[i].link.substring(1,menu[i].link.length)).classList.add("page-section");
            
            element = document.getElementById(menu[i].link.substring(1,menu[i].link.length));
    
            childElement = document.createElement("h1");
            childElement.innerText = menu[i].name;
            element.appendChild(childElement);
    
            childElement = document.createElement("p");
            childElement.innerText = menu[i].text;
            
            var list = document.createElement("UL");
            
            if(menu[i].children != null){
                menu[i].children.forEach(child => {
                    var listItem = document.createElement("LI");
                    listItem.innerHTML = child.name;
                    list.appendChild(listItem)
                });
            }

            

            childElement.appendChild(list);

            element.appendChild(childElement);

            if(menu[i].facebookGallery != null){
                element.innerHTML += menu[i].children.facebookGallery;
            }

        }
    
        
        
};
    
document.getElementById("menu-toggle").addEventListener('click',toggleMenuVisibility);

function toggleMenuVisibility(){
    if(window.innerWidth < 900 || document.getElementById("menu").classList.contains("visible")){
        
        document.getElementById("menu").classList.toggle("visible");
        document.getElementById("menu-close").firstChild.classList.toggle("fa-3x");
        document.getElementById("nav").classList.toggle("overlay");

    }
}
