$(document).ready(function() {
    $.ajax({
		url : "../data/applicationLayer.php",
		type : "POST",
		dataType : "json",
        data : { "action" : "GET_SESSION" },
		success : function(dataReceived){
			
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
    
    var url = new URL(window.location.href);
    var musicianId = -1;
    $.ajax({
       url : "../data/applicationLayer.php",
        type : "POST",
        dataType : "json",
        data : { "email" : url.searchParams.get("email"),
                "action" : "GET_ID_BY_EMAIL" },
        success: function(dataReceived) {
            musicianId = dataReceived["musicianId"];
            
            $.ajax({
                url : "../data/applicationLayer.php",
                type : "POST",
                dataType : "json",
                data : { "musicianId" : musicianId,
                        "action" : "GET_COVER_PICTURE_BY_ID" },
                success : function(dataReceived) {
                    $("#cover").css('background-image', 'url("' + dataReceived["url"] + '.jpg")');
                },
                error : function(errorMessage)
                {
                    alert(errorMessage.statusText);
                }
            });
           
            $.ajax({
                url : "../data/applicationLayer.php",
                type : "POST",
                dataType : "json",
                data : { "musicianId" : musicianId,
                        "action" : "GET_INFO_BY_ID" },
                success : function(dataReceived) {
                    $("#musicianName").html(dataReceived["musicianName"]);
                },
                error : function(errorMessage)
                {
                    alert(errorMessage.statusText);
                }
            });
            
            $.ajax({
                url : "../data/applicationLayer.php",
                type : "POST",
                dataType : "json",
                data : { "musicianId" : musicianId,
                        "action" : "GET_IMAGES_BY_ID" },
                success : function(dataReceived) {
                    for (var i = 0; i < dataReceived.length; i++)
                    {
                        var image = new Image();
                        image.src = 'data:image/jpeg;base64,' + dataReceived[i];

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
            });

            $.ajax({
                url : "../data/applicationLayer.php",
                type : "POST",
                dataType : "json",
                data : { "musicianId" : musicianId,
                        "action" : "GET_TRACKS_BY_ID" },
                success : function(dataReceived) {
                    for (var i = 0; i < dataReceived.length; i++)
                    {
                        var track = document.createElement("source");
                        track.src = 'data:audio/mpeg;base64,' + dataReceived[i];

                        var list = document.getElementById("track-list"),
                        li   = document.createElement("li"),
                        audioControl = document.createElement("audio");
                        audioControl.controls = "controls";

                        li.appendChild(audioControl);
                        audioControl.appendChild(track);
                        list.appendChild(li);
                    }
                },
                error : function(errorMessage)
                {
                    alert(errorMessage.statusText);
                }
            });

            $.ajax({
                url : "../data/applicationLayer.php",
                type : "POST",
                dataType : "json",
                data : { "musicianId" : musicianId,
                        "action" : "GET_PERFORMANCES_BY_ID" },
                success : function(dataReceived) {
                    var newHtml = "";
                    for (var i = 0; i < dataReceived.length; i++)
                    {
                        newHtml += '<div class="performance">'
                        newHtml += '<h5>' + dataReceived[i]["place"] + '</h5>';
                        newHtml += '<p>' + dataReceived[i]["location"] + '</p>';
                        newHtml += '<p>' + dataReceived[i]["dateTime"] + '</p>';
                        newHtml += '</div>';
                    }

                    $("#performances").html(newHtml);
                }
            });
        },
        error : function(errorMessage)
        {
            alert(errorMessage.statusText);
        }
    });
    

    $("#navbar-search-button").on('click', function() {
        window.location.replace("./discover.html?search=" + $("#navbar-search").val());
    });
});