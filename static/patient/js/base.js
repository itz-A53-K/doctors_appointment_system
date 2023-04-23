window.addEventListener("load", function() {
    this.setTimeout(function(){

        document.getElementById("loading-screen").style.display = "none";
    }, 500)
});

document.querySelectorAll(".nav-link").forEach((link) => {
    link2 = link.href + "/";
    if (link.href === window.location.href || link2 === window.location.href) {
        link.classList.add("afterLine");
    }
});

// search box toggler
$("#srcBtn").click(function () {
    $("#navFooter").toggleClass("hidden")
})

setTimeout(() => {
    $('.alert').html("")
}, 6000);

$("#btnLO").click(function () {
    if (confirm("Do you really want to logout?")) {
        location.href = "/logout/"
    }
}) 

// $(".aboutLink").click(function () {
//     $('html, body').animate({
//         scrollTop: $("#about-us").offset().top
//     });
// })

// $(".contactLink").click(function () {
//     $('html, body').animate({
//         scrollTop: $("#contact-us").offset().top
//     });
// })


$("#nav2Toggler").click(function () {
    if ($(this).text() == '☰') {
        $(this).text("╳")
        const mediaQuery = window.matchMedia('(max-width: 350px)')
        if (mediaQuery.matches) {
            $("#navBar2 ").css('height', "100vh").css('width', "100%")
            $(".uN_Ath #nav1UL").css('min-height', "100vh").css('height', "fit-content").css('width', "100%")
        }
        else {
            $("#navBar2 ").css('height', "100vh").css('width', "25rem")
            $(".uN_Ath #nav1UL").css('height', "100vh").css('width', "25rem")
            // $("body").css("overflow", "hidden")

        }
        $("#navBar .navContainer .uN_Ath").removeClass('hidden')

        setTimeout(function () {
            $("#navBar2 .navContainer").removeClass('hidden')
        }, 400);
    }
    else {
        $("#navBar2 .navContainer").addClass("hidden")
        $("#navBar .navContainer .uN_Ath").addClass("hidden")
        setTimeout(function () {
            $('#nav2Toggler').text("☰")
            $("#navBar2 ").css('height', "").css('width', "")
            // $("body").css("overflow", "")
        }, 100);
    }
})


function myFunction(x) {
    if (x.matches) { // If media query matches
        $("#navBar2 .navContainer").addClass("hidden")
        $("#navBar .navContainer .uN_Ath").addClass("hidden")
    } else {
        $("#navBar2 .navContainer").removeClass("hidden")
        $("#navBar .navContainer .uN_Ath").removeClass("hidden")
    }
}

var x = window.matchMedia("(max-width: 900px)")
myFunction(x) // Call listener function at run time
x.addListener(myFunction)

