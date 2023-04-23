
$(document).ready(function () {
    $(".toggle-button").click(function () {
        $(".navbar-links").toggleClass("active");
        $(this).toggleClass("change");
    });
});


window.addEventListener("load", function () {
    this.setTimeout(function () {
        document.getElementById("loading-screen").style.display = "none";
    }, 500)
});


$("#btnLO").click(function () {
    if (confirm("Do you really want to logout?")) {
        location.href = "/logout/"
    }
})

//theme changer
const themeLink = $('#theme');
$("#chngTheme").click(function () {

    $("body").toggleClass("dark")
    if ($(".dark").length == 1) {
        darkMode = true
        themeLink.attr("href", "/static/patient/css/dark.css")
    }
    else {
        themeLink.attr("href", "")
        darkMode = false
    }
    localStorage.setItem('darkMode', darkMode);
})


setTimeout(() => {
    $('.alert').html("")
}, 6000);

document.querySelectorAll(".nav-link").forEach((link) => {
    link2 = link.href + "/";
    if (link.href === window.location.href || link2 === window.location.href) {
        link.classList.add("afterLine");
    }
});

function myFunction(x) {
    if (x.matches) { // If media query matches
        $("#toggle-button").removeClass("hidden")
        $(".navbar").addClass("hidden")
    } else {
        $("#toggle-button").addClass("hidden")
        $(".navbar").removeClass("hidden")
    }
}

var x = window.matchMedia("(max-width: 900px)")
myFunction(x) // Call listener function at run time
x.addListener(myFunction)

$("#toggle-button").click(function(){
    $(".navbar").toggleClass("hidden")
    
    setTimeout(function(){
        if($("#toggle-button").hasClass('change')){
            $("#toggle-button").css("left", "15rem").css("margin", "0rem")
            $("body").css("overflow", "hidden")
        }
        else{
            $("body").css("overflow", "")
            $("#toggle-button").css("left", "").css("margin", "")
        }

    }, 50)
})