<?php
    header('Content-type: application/json');
    header('Accept: application/json');
    require_once __DIR__ . '/dataLayer.php';

    $action = $_POST["action"];

    switch($action)
    {
        case "LOGIN" : 
            subLoginFunction();
            break;
        case "REGISTRATION" : 
            subRegistrationFunction();
            break;
        case "GET_SESSION" : 
            subGetSessionFunction();
            break;
        case "GET_COOKIES" : 
            subGetCookiesFunction();
            break;
        case "DELETE_SESSION" :
            subDeleteSessionFunction();
            break;
    }

    function subLoginFunction()
    {
        $email = $_POST["email"];
        $password = $_POST["password"];
        $rememberMe = $_POST["rememberMe"];
        
        $loginResponse = jsonAttemptLogin($email, $password, $rememberMe);
        
        if ($loginResponse["MESSAGE"] == "SUCCESS")
        {
            if ($rememberMe == "true")
            {
                setcookie("Email", $email, time() + (86400 * 30));
                setcookie("MusicianId", $loginResponse["MusicianId"], time() + (86400 * 30));
            }
            
            session_start();
            if (!isset($_SESSION['MusicianId']))
            {
                $_SESSION['MusicianId'] = $loginResponse['MusicianId'];
            }
            
            $response = array("MESSAGE"=>"SUCCESS");
            
            echo json_encode($response);
        }
        else
        {
            subGetErrorByCode($loginResponse["MESSAGE"]);
        }
    }

    function subRegistrationFunction()
    {
        $firstName = $_POST['firstName'];
        $lastName = $_POST['lastName'];
        $email = $_POST['email'];
        $musicianName = $_POST['musicianName'];
        $password = $_POST['password'];
        $country = $_POST['country'];
        $city = $_POST['city'];
        
        $registrationResponse = jsonAttemptRegistration($firstName, $lastName, $email, $musicianName, $password, $country, $city);
        
        if ($registrationResponse["MESSAGE"] == "SUCCESS")
        {   
            session_start();
            if (!isset($_SESSION['MusicianId']))
            {
                $_SESSION['MusicianId'] = $registrationResponse['MusicianId'];
            }
            
            $response = array("MESSAGE"=>"SUCCESS");
            
            echo json_encode($response);
        }
        else
        {
            subGetErrorByCode($registrationResponse["MESSAGE"]);
        }
    }

    function subGetSessionFunction()
    {
        session_start();
        if (isset($_SESSION['MusicianId']))
        {
            echo json_encode(array("MESSAGE" => "SUCCESS"));   	    
        }
        else
        {
            subGetErrorByCode("406");
        }
    }

    function subGetCookiesFunction()
    {
        if (isset($_COOKIE['Email']) && isset($_COOKIE['MusicianId']))
        {
            echo json_encode(array('Email' => $_COOKIE['Email']));   	    
        }
        else
        {
            subGetErrorByCode("406");
        }
    }

    function subDeleteSessionFunction()
    {
        session_start();
        if (isset($_SESSION['MusicianId']))
        {
            unset($_SESSION['MusicianId']);
            session_destroy();
            echo json_encode(array('success' => 'Session deleted'));   	    
        }
        else
        {
            subGetErrorByCode("406");
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