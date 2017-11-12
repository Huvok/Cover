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
        url : "../data/applicationLayer.php",
        type : "POST",
        data : { "action" : "GET_CONNECTIONS" },
        ContentType : "application/json",
        dataType : "json",
        success : function(dataReceived) {
      
            for (var i = 0; i < dataReceived.length; i++)
            {   
                $.ajax({
                    url : "../data/applicationLayer.php",
                    type : "POST",
                    data : { "musicianId" : dataReceived[i]["musicianId"],
                            "musicianName" : dataReceived[i]["musicianName"],
                            "country" : dataReceived[i]["country"],
                            "city" : dataReceived[i]["city"],
                            "email" : dataReceived[i]["email"],
                            "action" : "GET_RECENT_ACTIVITY" },
                    ContentType : "application/json",
                    dataType : "json",
                    success : function(dataReceived2) {
                        newHtml = '<div class="musician-block col-sm-12 row">';
                        newHtml += '<div class="col-sm-5">'
                        newHtml += '<h4>' + dataReceived2["musicianName"] + '</h4>';
                        newHtml += '<p>' + dataReceived2["country"] + ' - ' + dataReceived2["city"] + '</p>';
                        newHtml += '<p>' + dataReceived2["email"] + '</p>';
                        newHtml += '</div>';
                        newHtml += '<div class="col-sm-3">';
                       
                        console.log(dataReceived2["Image"]);
                        if (dataReceived2["type"] == "Performance")
                        {
                            newHtml += '<h4>Performing:</h4>';
                            newHtml += '<p>' + dataReceived2["place"] + ' - ' + dataReceived2["location"] + '</p>';
                            newHtml += '<p>' + dataReceived2["dateTime"] + '</p>';
                        }
                        else if (dataReceived2["type"] == "Image")
                        {
                            newHtml += '<h4>Published:</h4>';
                            newHtml += '<img src=' + ('data:image/jpeg;base64,' + dataReceived2["image"]) + '>';
                        }
                        else if (dataReceived2["type"] == "Track")
                        {
                            newHtml += '<h4>Published:</h4>';
                            newHtml += '<audio controls><source src=' + ('data:audio/mpeg;base64,' + dataReceived2["track"]) + '></audio>';
                        }

                        newHtml += '</div></div>';
                        $("#connections").append(newHtml);
                    },
                    error : function(errorMessage) {
                        alert(errorMessage.statusText);
                    }
                });
            }
        },
        error : function(errorMessage) {
            alert(errorMessage.statusText);
        }
    });
});