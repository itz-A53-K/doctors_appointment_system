let table = new DataTable('#myTable');

$('.dataTables_filter input').attr("placeholder", "Search by anything")
$(".btn-dlt").click(function(){
    tds=$(this).parent().parent().children('td')
    if( confirm("Do you really want to cancel the appointment of the patient with the following details ?\n\n   Name:- "+ tds.eq(1).text()+"      Age:- "+ tds.eq(2).text()+"\n   Doctor:- "+ tds.eq(5).text()+"\n   Specialization:- "+ tds.eq(4).text()+"\n   Appointment Date:- "+ tds.eq(7).text()))
    {
        $.ajax({
    
            type: "POST",
            url: "/dltBooking/",
            data: {
                id: $(this).attr('id'),
                csrfmiddlewaretoken: '{{csrf_token}}',
            },
        
            success: function (data) {
                
                if( data.success == true){
                    location.reload()
                }
            },
        })
    }
})