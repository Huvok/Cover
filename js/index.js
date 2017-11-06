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
    
    $("#signupButton").on("click", function() {
        var firstName = $("#firstNameSignup").val();
        var lastName = $("#lastNameSignup").val();
        var musicianName = $("#musicianNameSignup").val();
        var email = $("#emailSignup").val();
        var password = $("#passwordSignup").val();
        var passwordConfirmation = $("#passwordConfirmationSignup").val();
        var country = $("#countrySignup").find(":selected").val();
        
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
            validateEmail(email))
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
                "action" : "REGISTRATION"
            };
            
            $.ajax({
                url : "../data/applicationLayer.php",
                type : "POST",
                data : jsonToSend,
                ContetType : "json/application",
                success : function(dataReceived) {
                    localStorage.setItem("MusicianId", dataReceived["MusicianId"]);
                    window.location.href = "./home.html";
                },
                error : function(errorMessage) {
                    alert(errorMessage.statusText);
                    $("#registerButtonMessage").text("There has been an error.");
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