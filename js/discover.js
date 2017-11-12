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
    
    $("#submitSearch").on("click", function () {
        var search = $("#searchInput") .val();
        
        var jsonToSend = {
            "search" : search,
            "action" : "SEARCH"
        };
        
        $.ajax({
            url : "../data/applicationLayer.php",
            type : "POST",
            data : jsonToSend,
            ContentType : "application/json",
            datatype : "json",
            success : function(dataReceived) {
                var newHtml = '<div class="musicians">';
                for(var i = 0; i < dataReceived.length; i++)
                {
                    newHtml += '<div class="musicianSearch">';
                    newHtml += '<h4>' + dataReceived[i]["musicianName"] + '</h4>'
                        + '<p>' + dataReceived[i]["country"] + ' - ' + dataReceived[i]["city"] + '<p>';
                    newHtml += '<p class="musicianEmail">' + dataReceived[i]["email"] + '</p>';
                    newHtml += '<button type="submit" class="connectButton">Connect</button>';
                    newHtml += '</div>';
                }

                newHtml += '</div>';
                $("#searchResult").html(newHtml);
            },
            error : function(errorMessage) {
                alert(errorMessage.statusText);
            }
        });
    });
    
    $(document).on('click', ".connectButton", function() {
        var musicianToConnect = $(this).parent().find(".musicianEmail").html();
        
        var jsonToSend = {
            "MusicianToConnect" : musicianToConnect,
            "action" : "CONNECT_REQUEST"
        };
        
        $.ajax({
            url : "../data/applicationLayer.php",
            type : "POST",
            data : jsonToSend,
            ContentType : "application/json",
            datatype : "json",
            success : function(dataReceived) {
                alert("Connection request sent.");
            },
            error : function (errorMessage) {
                alert(errorMessage.statusText);
            }
        });
        
        $(this).parent().html("");
    });
});