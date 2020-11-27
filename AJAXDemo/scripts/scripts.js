$(document).ready(()=>{
    $(".nav-item").hide();
    console.log("Menu items hidden");
    $("#logo").hide().fadeIn(5000);
    console.log("Menu icon faded");

    $("#menuToggler").on("click", () => {
        console.log("event!");
        if ($(".fa-bars").hasClass("on")) {
            $(".fa-bars").removeClass("on");
            $(".nav-item").fadeOut("slow");
        } else {
            $(".fa-bars").addClass("on");
            $(".nav-item").fadeIn("slow");
        }
    });

});


