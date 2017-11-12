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
        datatype : "json",
        success : function(dataReceived) {
            var newHtml = '<div class="connections">';

            for (var i = 0; i < dataReceived.length; i++)
            {
                newHtml += '<div class="musician-block">';
                newHtml += '<h4>' + dataReceived[i]["musicianName"] + '</h4>';
                newHtml += '<p>' + dataReceived[i]["country"] + ' - ' + dataReceived[i]["city"] + '</p>';
                newHtml += '<p>' + dataReceived[i]["email"] + '</p>';
                newHtml += '</div>';
            }

            newHtml += '</div>';
            $("#connectionsSection").html(newHtml);
        },
        error : function(errorMessage) {
            alert(errorMessage.statusText);
        }
    });

    $.ajax({
        url : "../data/applicationLayer.php",
        type : "POST",
        data : { "action" : "GET_SENT_REQUESTS" },
        ContentType : "application/json",
        datatype : "json",
        success : function(dataReceived) {
            var newHtml = '<div class="sentRequests">';
            
            for (var i = 0; i < dataReceived.length; i++)
            {
                newHtml += '<div class="musician-block">';
                newHtml += '<h4>' + dataReceived[i]["musicianName"] + '</h4>';
                newHtml += '<p>' + dataReceived[i]["country"] + ' - ' + dataReceived[i]["city"] + '</p>';
                newHtml += '<p>' + dataReceived[i]["email"] + '</p>';
                newHtml += '</div>';
            }

            newHtml += '</div>';
            $("#sentRequestsSection").html(newHtml);
        },
        error : function(errorMessage) {
            alert(errorMessage.statusText);
        }
    });
    
    $.ajax({
        url : "../data/applicationLayer.php",
        type : "POST",
        data : { "action" : "GET_RECEIVED_REQUESTS" },
        ContentType : "application/json",
        datatype : "json",
        success : function(dataReceived) {
            var newHtml = '<div class="receivedRequests">';
            
            for (var i = 0; i < dataReceived.length; i++)
            {
                newHtml += '<div class="musician-block">';
                newHtml += '<h4>' + dataReceived[i]["musicianName"] + '</h4>';
                newHtml += '<p>' + dataReceived[i]["country"] + ' - ' + dataReceived[i]["city"] + '</p>';
                newHtml += '<p class="emailRequest">' + dataReceived[i]["email"] + '</p>';
                newHtml += '<button type="submit" class="acceptButton">Accept</button>'
                newHtml += '<button type="submit" class="rejectButton">Reject</button>';
                newHtml += '</div>';
            }

            newHtml += '</div>';
            $("#receivedRequestsSection").html(newHtml);
        },
        error : function(errorMessage) {
            alert(errorMessage.statusText);
        }
    });
    
    $(document).on('click', ".acceptButton", function() {
         var musicianToAccept = $(this).parent().find(".emailRequest").html();

        var jsonToSend = {
            "musicianToAccept" : musicianToAccept,
            "action" : "ACCEPT_REQUEST"
        };

        $.ajax({
            url : "../data/applicationLayer.php",
            type : "POST",
            data : jsonToSend,
            ContentType : "application/json",
            datatype : "json",
            success : function(dataReceived) {
                location.reload();
                alert("Connection request accepted.");
            },
            error : function (errorMessage) {
                alert(errorMessage.statusText);
            }
        });
        
        $(this).parent().html("");
    });
    
    $(document).on('click', ".rejectButton", function() {
         var musicianToReject = $(this).parent().find(".emailRequest").html();

        var jsonToSend = {
            "musicianToReject" : musicianToReject,
            "action" : "REJECT_REQUEST"
        };
        
        $.ajax({
            url : "../data/applicationLayer.php",
            type : "POST",
            data : jsonToSend,
            ContentType : "application/json",
            datatype : "json",
            success : function(dataReceived) {
                location.reload();
                alert("Connection request rejected.");
            },
            error : function (errorMessage) {
                alert(errorMessage.statusText);
            }
        });
        
        $(this).parent().html("");
    });
});