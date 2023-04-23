
$('#doctor').on('change', function() {

    if($(this).val() != ""){ 
        $("#book-submit").prop( "disabled", false )
    }
    else{
        $("#book-submit").prop( "disabled", true )
    }
    
})
$('#category').on('change', function() {
    //inpCategory=$("#inpCategory").val().split(" (")[0]
    //console.log("'"+inpCategory+"'")

    category=$(this).val()
    $("#doctor").prop( "disabled", true ).html(`<option value="">--- Select Doctor ---</option>`);

    $("#book-submit").prop( "disabled", true )
    
    if(category != ""){        
    
        $.ajax({
        
            type: "POST",
            url: "/getDoctorName/",
            data: {
                category: category,
                csrfmiddlewaretoken: $('[name="csrfmiddlewaretoken"]').val(),
            },
        
            success: function (data) {
                
                if( data.success == true){

                    $("#doctor").prop( "disabled", false )
                    parse= JSON.parse(data["doctor"])

                    for(let i=0; i< parse.length; i++){

                        doctorId=parse[i].pk
                        doctorName=parse[i].fields.doctor_name

                        $("#doctor").append(`<option value="${doctorId}">${doctorName}</option>`);
                    }
                }
            },
        })
    }

} )


function validate_bookForm(){
    errSpan=document.querySelector(".err")
    input=$("#booking-form input")
    
    let currentDate = new Date().toJSON().slice(0, 10);
    let futureDate = new Date(Date.now() + 1000* 60* 60* 24* 10).toJSON().slice(0, 10);// 10 day future date
    
    for( let i=0; i<input.length; i++ ){
        if(i==3){
            continue
        }
        if(input[i].value == ""){
            errSpan.innerText="Please fill all the field."
            return false
        }
        
    }
    if (input[5].value < currentDate || input[5].value > futureDate){
        errSpan.innerText="Please select date between "+currentDate+' and '+futureDate;
        
        return false
    }
    else if(input[3].value.length !=10){
        if(input[3].value==""){
            errSpan.innerText=""
            return true
        }
        else{
            errSpan.innerText="Invalid phone number."
            return false
        }
    }
    
    else{
        errSpan.innerText=""
        return true
    }
}


$("#book-submit").click(function() {
    validate_bookForm()
    
    if( validate_bookForm() == false){
        $(".err").addClass("errBord")
        $("html, body").animate({ scrollTop: 0 }, "slow");
    }
    else{
        $(".err").removeClass("errBord")
        //document.querySelector("#booking-form").submit()
        //min="2023-03-07" max="2018-06-14T00:00">
        
        $.ajax({
        
            type: "POST",
            url: "/bookAppointment/",
            data: {
                pName: $("#pName").val(),
                pAge: $("#pAge").val(),
                pPhone: $("#pPhone").val(),
                pAddress: $("#pAddress").val(),
                appointDate: $("#appointDate").val(),
                doctor: $("#doctor").val(),
                csrfmiddlewaretoken: $('[name="csrfmiddlewaretoken"]').val(),
            },
        
            success: function (data) {
                
                if( data.success == true){
                    alert(data.msg)
                    if(data.msg.includes("Appointment booked successfully")){
                        window.location.href="/viewBooking/"
                    }
                }
                else{
                    location.reload()
                }
            },
        })
    } 
})

