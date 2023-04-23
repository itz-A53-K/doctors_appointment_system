generateCaptcha();

function generateCaptcha() {

    $("#clCaptcha").text("");

    let background = new Array("captcha1", "captcha2", "captcha3");
    let back = background[Math.floor(Math.random() * background.length)];
    bg_imgURL= "url('/static/patient/img/" + back + ".jpg')";
    $(".captchaDiv").css('background-image', bg_imgURL)
    
    let alpha = "0123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNOPQRSTUVWXYZ";
    code=""
    for (var i = 0; i < 4; i++) {
        a = alpha[Math.floor(Math.random() * alpha.length)];
        code= code + a 
    }
    $("#clCaptcha").text(code);

}


// function validate_Captcha() {
//     if ($("#inp-captcha").val() != reg_code) {
//         document.getElementById("inp-captcha").value = "";
//         generateCaptcha();
//         errSpan.innerText="Captcha do not match. Try Again";
//         return false;
//     }
//     return true
// }

$("#refCapt").click(function() {
    generateCaptcha()
})

// document.getElementById("clLogin").onsubmit(validate_Captcha())
$('#clLogin').on('submit', function() {

    if ($("#inp-captcha").val() != code) {
        $("#inp-captcha").val("")
        generateCaptcha();
        $(".err").text("Captcha do not match. Try Again");
        
        return false
    }
    else{
        // $(this).submit()
        return true
    }
})

