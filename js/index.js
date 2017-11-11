$(document).ready(function() {
    $(".tabs > li").on("click", function (event) {
        event.preventDefault();
        $(".selected").removeClass("selected");
        var currentClass = $(this).attr("class");
        $(this).addClass("selected");
        
        $(".selectedSection").hide();
        $(".selectedSection").removeClass("selectedSection").addClass("notSelectedSection");
        
        $("#" + currentClass + "Section").fadeIn(600);
        $("#" + currentClass + "Section").addClass("selectedSection").removeClass("notSelectedSection");
    });
    
    jsonToSend = {
        "action" : "GET_COOKIES"
    };
    
    $.ajax({
		url : "./data/applicationLayer.php",
		type : "POST",
        data : jsonToSend,
        ContetType : "json/application",
        datatype: 'json',
		success : function(dataReceived) {
			$("#emailLogin").val(dataReceived.Email);
		}
	});
    
    $("#loginButton").on("click", function () {
        var email = $("#emailLogin").val();
        var password = $("#passwordLogin").val();
        var remember = $("#rememberMe").is(":checked");
        
        if (email == "")
        {
            $("#usernameLoginMessage").text("You must provide an input.");
            $("#loginButtonMessage").text("");
        }
        else if (!validateEmail(email))
        {
            $("#usernameLoginMessage").text("You must provide a valid email.");
        }
        else
        {
            $("#usernameLoginMessage").text("");
        }
        
        if (password == "")
        {
            $("#passwordLoginMessage").text("You must provide an input.");
            $("#loginButtonMessage").text("");
        }
        else
        {
            $("#passwordLoginMessage").text("");
        }
        
        if (email != "" &&
            password != "")
        {
            var jsonToSend = {
                "email" : email,
                "password" : password,
                "rememberMe" : remember,
                "action" : "LOGIN"
            };

            $.ajax({
                url : "./data/applicationLayer.php",
                type : "POST",
                data : jsonToSend,
                ContentType : "application/json",
                datatype: 'json',
                success : function(dataReceived) {
                    window.location.replace("./html/home.html");
                },
                error : function(errorMessage) {
                    alert(errorMessage.statusText);
                    $("#loginButtonMessage").text("Your credentials are not valid.");
                }
            });
        }
    });
    
    $("#signupButton").on("click", function() {
        var firstName = $("#firstNameSignup").val();
        var lastName = $("#lastNameSignup").val();
        var musicianName = $("#musicianNameSignup").val();
        var email = $("#emailSignup").val();
        var password = $("#passwordSignup").val();
        var passwordConfirmation = $("#passwordConfirmationSignup").val();
        var country = $("#countrySignup").find(":selected").val();
        var city = $("#citySignup").val();
        
        if (firstName == "") $("#firstNameSignupMessage").text("You must provide an input.");
        else $("#firstNameSignupMessage").text("");
        
        if (lastName == "") $("#lastNameSignupMessage").text("You must provide an input.");
        else $("#lastNameSignupMessage").text("");
        
        if (musicianName == "") $("#musicianNameSignupMessage").text("You must provide an input.");
        else $("#musicianNameSignupMessage").text("");

        if (email == "") $("#emailSignupMessage").text("You must provide an input.");
        else if (!validateEmail(email))  $("#emailSignupMessage").text("You must provide a valid email");
        else  $("#emailSignupMessage").text("");
        
        if (password == "") $("#passwordSignupMessage").text("You must provide an input.");
        else $("#passwordSignupMessage").text("");
        
        if (passwordConfirmation == "") $("#passwordConfirmationSignupMessage").text("You must provide an input.");
        else $("#passwordConfirmationSignupMessage").text("");
        
        if (country == 0) $("#countrySignupMessage").text("Please select a country.");
        else $("#countrySignupMessage").text("");
        
        if (city == "") $("#citySignupMessage").text("You must provide an input.");
        else $("#citySignupMessage").text("");

        if (password != "" &&
           passwordConfirmation != "" &&
           password != passwordConfirmation)
        {
            $("#passwordConfirmationSignupMessage").text("Your password does not match your password confirmation.");
        }
        else if (firstName != "" &&
            lastName != "" &&
            musicianName != "" &&
            email != "" &&
            password != "" &&
            passwordConfirmation != "" &&
            country != 0 &&
            validateEmail(email) &&
            city != "")
        {
            $("#passwordConfirmationSignupMessage").text("");
            
            country = $("#countrySignup").find(":selected").text();

            var jsonToSend = {
                "firstName" : firstName,
                "lastName" : lastName,
                "email" : email,
                "musicianName" : musicianName,
                "password" : password,
                "country" : country,
                "city" : city,
                "action" : "REGISTRATION"
            };
            
            $.ajax({
                url : "./data/applicationLayer.php",
                type : "POST",
                data : jsonToSend,
                ContetType : "json/application",
                success : function(dataReceived) {
                    window.location.href = "./html/home.html";
                },
                error : function(errorMessage) {
                    alert(errorMessage.statusText);
                    $("#signupButtonMessage").text("There has been an error.");
                }
            });
        }
    });
});

function validateEmail(email) 
{
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}