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
        url : "../data/loadTracks.php",
        type : "POST",
        dataType : "json",
        success : function(dataReceived) {
            for (var i = 0; i < dataReceived.length; i++)
            {
                var image = document.createElement("source");
                image.src = 'data:audio/mpeg;base64,' + dataReceived[i];

                var list = document.getElementById("track-list"),
                li   = document.createElement("li"),
                audioControl = document.createElement("audio");
                audioControl.controls = "controls";

                li.appendChild(audioControl);
                audioControl.appendChild(image);
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
        data : { "action" : "GET_OWN_PERFORMANCES" },
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
    
   $('.form_datetime').datetimepicker({
        weekStart: 1,
        todayBtn:  1,
		autoclose: 1,
		todayHighlight: 1,
		startView: 2,
		forceParse: 0,
        showMeridian: 1
    });
    
    $("#newPerformanceButton").on("click", function () {
        if ($("#dateTimeNewPerformance").val() == "")
            $("#dateTimeNewPerformanceMessage").text("You must provide an input.");
        else 
            $("#dateTimeNewPerformanceMessage").text("");
        
        if ($("#placeNewPerformance").val() == "")
            $("#placeNewPerformanceMessage").text("You must provide an input.");
        else
            $("#placeNewPerformanceMessage").text("");
        
        if ($("#locationNewPerformance").val() == "")
            $("#locationNewPerformanceMessage").text("You must provide an input.");
        else
            $("#locationNewPerformanceMessage").text("");
        
        if ($("#dateTimeNewPerformance").val() != "" &&
            $("#placeNewPerformance").val() != "" &&
            $("#locationNewPerformance").val() != "")
        {
            var jsonToSend = {
                "place" : $("#placeNewPerformance").val(),
                "location" : $("#locationNewPerformance").val(),
                "datetime" : stringParseDateTime($("#dateTimeNewPerformance").val()),
                "action" : "SUBMIT_NEW_PERFORMANCE"
            };
            
            $.ajax({
                url : "../data/applicationLayer.php",
                type : "POST",
                dataType : "json",
                data : jsonToSend,
                ContetType : "json/application",
                success : function(dataReceived) {
                    var newHtml = "";
                    newHtml += '<div class="performance">'
                    newHtml += '<h5>' + $("#placeNewPerformance").val() + '</h5>';
                    newHtml += '<p>' + $("#locationNewPerformance").val() + '</p>';
                    newHtml += '<p>' + stringParseDateTime($("#dateTimeNewPerformance").val()) + '</p>';
                    newHtml += '</div>';

                    $("#performances").append(newHtml);
                    
                    $("#dateTimeNewPerformance").val("");
                    $("#placeNewPerformance").val("");
                    $("#locationNewPerformance").val("");
                }
            });
        }
    });
    
    var input = document.getElementById("images"), formdata = false;

    if (window.FormData) 
    {
        formdata = new FormData();
        document.getElementById("btn").style.display = "none";
    }
    
    if (input.addEventListener) 
    {
        input.addEventListener("change", function (evt) {
            var i = 0, len = this.files.length, img, reader, file;

            document.getElementById("response").innerHTML = "Uploading . . ."

            for ( ; i < len; i++ ) 
            {
                file = this.files[i];

                if (!!file.type.match(/image.*/)) 
                {
                    if ( window.FileReader ) 
                    {
                        reader = new FileReader();
                        reader.onloadend = function (e) { 
                            showUploadedImage(e.target.result);
                        };
                        reader.readAsDataURL(file);
                    }
                    
                    if (formdata) 
                    {
                        formdata.append("images", file);
                    }
                } 
            }

            if (formdata) 
            {
                formdata.append("action", "UPLOAD_IMAGE")
                $.ajax({
                    url: "../data/applicationLayer.php",
                    type: "POST",
                    data: formdata,
                    dataType: "json",
                    processData: false,
                    contentType: false,
                    success: function (res) {
                        document.getElementById("response").innerHTML = res["MESSAGE"]; 
                    },
                    error : function(errorMessage)
                    {
                        alert(errorMessage.statusText);
                    }
                });
            }
        });
    }
    
    var input = document.getElementById("tracks"), formdata = false;

    if (window.FormData) 
    {
        formdata = new FormData();
        document.getElementById("btnTracks").style.display = "none";
    }

    if (input.addEventListener) 
    {
        input.addEventListener("change", function (evt) {
            var i = 0, len = this.files.length, img, reader, file;

            document.getElementById("responseTracks").innerHTML = "Uploading . . ."

            for ( ; i < len; i++ ) 
            {
                file = this.files[i];

                if (!!file.type.match(/audio.*/)) 
                {
                    if ( window.FileReader ) 
                    {
                        reader = new FileReader();
                        reader.onloadend = function (e) { 
                            showUploadedTrack(e.target.result);
                        };
                        reader.readAsDataURL(file);
                    }
                    
                    if (formdata) 
                    {
                        formdata.append("tracks", file);
                    }
                } 
            }

            if (formdata) 
            {
                formdata.append("action", "UPLOAD_TRACK")
                $.ajax({
                    url: "../data/applicationLayer.php",
                    type: "POST",
                    data: formdata,
                    dataType : "json",
                    processData: false,
                    contentType: false,
                    success: function (res) {
                        document.getElementById("responseTracks").innerHTML = res["MESSAGE"]; 
                    }
                });
            }
        });
    }
});

function showUploadedImage (source) 
{
    var list = document.getElementById("image-list"),
    li   = document.createElement("li"),
    img  = document.createElement("img");
    img.src = source;
    li.appendChild(img);
    list.appendChild(li);
}

function showUploadedTrack (source) 
{
    var list = document.getElementById("track-list"),
    li   = document.createElement("li"),
    audioControl = document.createElement("audio"),
    img  = document.createElement("source");
    audioControl.controls = "controls";
    img.src = source;
    img.type = "audio/mpeg";
    li.appendChild(audioControl);
    audioControl.appendChild(img);
    list.appendChild(li);
}

function stringParseDateTime(str)
{
    var ans = "";
    var day = "", month = "", year = "", hourMinute = "", meridian = "";
    
    var i = 0;
    while (str[i] != " ") 
    {
        day += str[i];
        i++;
    }
    
    i++;
    while (str[i] != " ") 
    {
        month += str[i];
        i++;
    }
    
    i++;
    while (str[i] != " ")
    {
        year += str[i];
        i++;
    }
    
    i++;
    while (str[i] != " ") i++;
    
    i++;
    while (str[i] != " ") 
    {
        hourMinute += str[i];
        i++;
    }
    
    i++;
    while (i < str.length)
    {
        meridian += str[i];
        i++;
    }
    
    if (month == "January") month = "01";
    else if (month == "February") month = "02";
    else if (month == "March") month = "03";
    else if (month == "April") month = "04";
    else if (month == "May") month = "05";
    else if (month == "June") month = "06";
    else if (month == "July") month = "07";
    else if (month == "August") month = "08";
    else if (month == "September") month = "09";
    else if (month == "October") month = "10";
    else if (month == "November") month = "11";
    else month = "12";
    
    if (meridian == "pm")
    {
        if (hourMinute[0] == "1" &&
           hourMinute[1] == "0")
        {
            hourMinute[0] = "2";
            hourMinute[1] = "2";
        }
        else if (hourMinute[0] == "1" &&
            hourMinute[1] == "1")
        {
            hourMinute[0] = "2";
            hourMinute[1] = "3";
        }
        else if (hourMinute[1] == "1")
        {
            hourMinute[0] = "1";
            hourMinute[1] = "3";
        }
        else if (hourMinute[1] == "2")
        {
            hourMinute[0] = "1";
            hourMinute[1] = "4";
        }
        else if (hourMinute[1] == "3")
        {
            hourMinute[0] = "1";
            hourMinute[1] = "5";
        }
        else if (hourMinute[1] == "4")
        {
            hourMinute[0] = "1";
            hourMinute[1] = "6";
        }
        else if (hourMinute[1] == "5")
        {
            hourMinute[0] = "1";
            hourMinute[1] = "7";
        }
        else if (hourMinute[1] == "6")
        {
            hourMinute[0] = "1";
            hourMinute[1] = "8";
        }
        else if (hourMinute[1] == "7")
        {
            hourMinute[0] = "1";
            hourMinute[1] = "9";
        }
        else if (hourMinute[1] == "8")
        {
            hourMinute[0] = "2";
            hourMinute[1] = "0";
        }
        else if (hourMinute[1] == "9")
        {
            hourMinute[0] = "2";
            hourMinute[1] = "1";
        }
    }
    
    ans = year + "-" + month + "-" + day + " " + hourMinute + ":00";
    return ans;
}
