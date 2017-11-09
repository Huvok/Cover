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
    
    $.ajax({
        url : "../data/loadImages.php",
        type : "POST",
        dataType : "json",
        success : function(dataReceived) {
            for (var i = 0; i < dataReceived.length; i++)
            {
                var image = new Image();
                image.src = 'data:image/jpeg;base64,' + dataReceived[i];
                console.log(dataReceived[i]);
                var list = document.getElementById("image-list"),
                  li   = document.createElement("li");
                li.appendChild(image);
              list.appendChild(li);
            }
        },
        error : function(errorMessage)
        {
            alert(errorMessage.statusText);
        }
    })
});
