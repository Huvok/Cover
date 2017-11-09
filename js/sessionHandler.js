var jsonToSend = {
    "action" : "GET_SESSION"
};

$.ajax({
    url : "./data/applicationLayer.php",
    type : "POST",
    data : jsonToSend,
    ContetType : "json/application",
    datatype: 'json',
    success : function(dataReceived) {
        window.location.replace("./html/home.html");
    }
});