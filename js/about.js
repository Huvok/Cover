$(document).ready(function() {  
    $.ajax({
		url : "../data/applicationLayer.php",
		type : "POST",
		dataType : "json",
        data : { "action" : "GET_SESSION" },
		success : function(dataReceived){
			localStorage.setItem("MusicianId", dataReceived["MusicianId"]);
		},
		error : function(errorMessage){
			window.location.replace("../index.html");
		}
	});
    
    $("#logoutButton").on("click", function(){
		$.ajax({
			url : "../data/applicationLayer.php",
			type : "POST",
			dataType : "json",
            data : { "action" : "DELETE_SESSION" },
			success : function(dataReceived){
				window.location.replace("../index.html");
			},
			error : function(errorMessage){
				alert(errorMessage.statusText);
			}
		});
	});
     
    $("#navbar-search-button").on('click', function() {
        window.location.replace("./discover.html?search=" + $("#navbar-search").val());
    });
});