<?php
    header('Content-type: application/json');
    header('Accept: application/json');
    require_once __DIR__ . '/dataLayer.php';

    $action = $_POST["action"];

    switch($action)
    {
        case "REGISTRATION" : 
            subRegistrationFunction();
            break;
    }

    function subRegistrationFunction()
    {
        $firstName = $_POST['firstName'];
        $lastName = $_POST['lastName'];
        $email = $_POST['email'];
        $musicianName = $_POST['musicianName'];
        $password = $_POST['password'];
        $country = $_POST['country'];
        
        $registrationResponse = jsonAttemptRegistration($firstName, $lastName, $email, $musicianName, $password, $country);
        
        if ($registrationResponse["MESSAGE"] == "SUCCESS")
        {   
            $response = array("MusicianId"=>$registrationResponse["MusicianId"]);
            
            echo json_encode($response);
        }
        else
        {
            subGetErrorByCode($registrationResponse["MESSAGE"]);
        }
    }

    function subGetErrorByCode($errorCode)
    {
        switch($errorCode)
        {
            case "500" : 
                header("HTTP/1.1 500 Bad connection, portal down");
                die("The server is down, we couln't stablish a connection.");
                break;
            case "409" :
                header("HTTP/1.1 409 The username is already taken.");
                die("The username is already taken.");
                break;
            case "406" : 
                header("HTTP/1.1 406 User not found.");
                die("Wrong credentials provided");
                break; 
        }
    }
     
 ?>