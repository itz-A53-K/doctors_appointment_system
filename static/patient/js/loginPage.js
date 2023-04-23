generateCaptcha();

$(".eyeBtn").click(function() {
    clickEye=$(this).attr('id');
    inpElement= document.getElementById(clickEye).parentElement.childNodes[1] 
    
    if(inpElement.type == "text"){
        inpElement.type= 'password'
        $(this).css("text-decoration", "none");
    }
    else{
        inpElement.type= 'text'
        $(this).css("text-decoration", "line-through");
    }
    
    setTimeout(() => {
        inpElement.type= 'password'
        $(this).css("text-decoration", "none");        
    }, 1200);
})

function generateCaptcha() {

    document.getElementById('regCaptcha').innerHTML = "";
    document.getElementById('logCaptcha').innerHTML = "";

    let background = new Array("captcha1", "captcha2", "captcha3");
    let back = background[Math.floor(Math.random() * background.length)];
    bg_imgURL= "url('../static/patient/img/" + back + ".jpg')";
    $(".captchaDiv").css('background-image', bg_imgURL)
    
    let alpha = "0123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNOPQRSTUVWXYZ";
    log_code=""
    reg_code=""
    for (var i = 0; i < 4; i++) {
        a = alpha[Math.floor(Math.random() * alpha.length)];
        b = alpha[Math.floor(Math.random() * alpha.length)];
        log_code= log_code + a 
        reg_code= reg_code + b 
    }
    document.getElementById("regCaptcha").innerHTML = reg_code;
    document.getElementById("logCaptcha").innerHTML = log_code;

}


function validate_regCaptcha() {
    if ($("#reg-inp-captcha").val() != reg_code) {
        document.getElementById("reg-inp-captcha").value = "";
        generateCaptcha();
        errSpan[1].innerText="Captcha do not match. Try Again";
        return false;
    }
    return true
}

function validate_logCaptcha() {
    if ($("#log-inp-captcha").val() != log_code) {
        document.getElementById("log-inp-captcha").value = "";
        generateCaptcha();
        errSpan[0].innerText="Captcha do not match. Try Again";
        return false;
    }
    return true
}

function reg_validate(){
    errSpan=document.querySelectorAll(".err")

    reg_name =$("#reg-name").val()
    email=$("#reg-email").val()
    
    var specialChar = /[~`!@#$%\^&*+=\-\(\)\[\]\\';,/{}|\\":<>\?0-9]/
    var emailChars=/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

    if(reg_name == ""){
        errSpan[1].innerText="Invalid name"
        return false
    }
    else if(specialChar.test( reg_name )== true ){
        errSpan[1].innerText="Name can't contain numbers and special characters"
        return false
    }
    else if($("#reg-age").val() > 120 || $("#reg-age").val() =="" || $("#reg-age").val() ==0 ){
        errSpan[1].innerText="Invalid Age"
        return false
    }
    else if($("#reg-ph").val().length !=10){
        errSpan[1].innerText="Invalid phone number"
        return false
    }
    else if(email=="" || !emailChars.test(email) ){
        errSpan[1].innerText="Invalid email address"
        return false
    }
    else if($("#reg-pass").val()==""){
        errSpan[1].innerText="Password can't be empty"
        return false
    }
    else if($("#reg-pass").val().length < 5){
        errSpan[1].innerText="Password is too short"
        return false
    }
    else if($("#reg-pass").val() != $("#reg-pass-conf").val()){
        errSpan[1].innerText="Both passwords don't match"
        return false
    }
    else{        
        errSpan[1].innerText=""
        return true
    }
        
}
function log_validate(){
    errSpan=document.querySelectorAll(".err")

    email=$("#log-email").val()
    
    var emailChars=/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if(email=="" || !emailChars.test(email) ){
        errSpan[0].innerText="Invalid email address"
        return false
    }
    else if($("#log-pass").val()==""){
        errSpan[0].innerText="Password can't be empty"
        return false
    }
    else if($("#log-pass").val().length < 5){
        errSpan[0].innerText="Password is too short"
        return false
    }
    else{        
        errSpan[1].innerText=""
        return true
    }
        
}


//hiding signup btn
$("#signin").addClass("hidden");
$(".line").first().addClass("hidden");
$("#cnlkLogin").parent().removeClass("hidden");

//
$(".log-frm-vis").click(function() {
    $("#logFrm").removeClass("hidden")
    $("#regFrm").addClass("hidden")

    $('.reg-frm-vis').first().removeClass('afterLine')
    $('.log-frm-vis').first().addClass('afterLine')
})
$(".reg-frm-vis").click(function() {
    $('.reg-frm-vis').first().addClass('afterLine')
    $('.log-frm-vis').first().removeClass('afterLine')

    $("#regFrm").removeClass("hidden")
    $("#logFrm").addClass("hidden")
})

$("#reg-submit").click(function() {
    reg_validate()
    validate_regCaptcha()
    if( reg_validate() == false){
        $('html, body').animate({
            scrollTop: $("#navBar").offset().top
        });
    }
    if( reg_validate() == true && validate_regCaptcha() == true ){
        document.getElementById("register-form").submit()
        // $.ajax({
    
        //     type: "POST",
        //     url: "/signup/",
        //     data: {
        //         reg_name : $("#reg-name").val(),
        //         reg_ph : $("#reg-ph").val(),
        //         reg_age : $("#reg-age").val(),
        //         reg_email: $("#reg-email").val(),
        //         reg_pass_conf : $("#reg-pass-conf").val(),
        //         csrfmiddlewaretoken: $('[name="csrfmiddlewaretoken"]').val(),
        //     },
      
        //     success: function (data) {
        //       console.log(data);
        //         // if( data.success == false){
        //         // }
        //     },
        // })
    }
    
})
$("#log-submit").click(function() {
    log_validate()
    validate_logCaptcha()
    if( log_validate() == false){
        $('html, body').animate({
            scrollTop: $("#navBar").offset().top
        });
    }
    if( log_validate() == true && validate_logCaptcha() == true ){
        document.getElementById("login-form").submit()
    }
    
})

$(".refCapt").click(function() {
    generateCaptcha()
})

/* $("#reg-ph").keyup(function (e){
    var ph = $(this).val();
    
    if(ph[0]==0){
        ph = ph.substring(1);
    }
    $(this).val(ph); 

    if (ph.length >=2){
        e.preventDefault();
    }
})*/
