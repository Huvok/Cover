<?php
    function getDatabaseConnection()
    {
        $servername = "localhost";
        $username = "root";
        $password = "root";
        $dbname = "Cover";

	   $conn = new mysqli($servername, $username, $password, $dbname);
        
        if ($conn->connect_error)
        {
            return null;
        }
        else
        {
            return $conn;
        }
    }

    function jsonAttemptRegistration($firstName, $lastName, $email, $musicianName, $password, $country)
    {
        $connection = getDatabaseConnection();
        
        if ($connection != null)
        {
            $sql = "SELECT *
                FROM Musician
                WHERE MusicianName = '$musicianName';";
   
            $result = $connection->query($sql);

            if ($result->num_rows == 0)
            {            
                $sql = "INSERT INTO Musician (MusicianId, FirstName, LastName, Email, MusicianName, Password, Country, RegDate)
                    VALUES (NULL, '$firstName', '$lastName', '$email', '$musicianName', '$password', '$country', DEFAULT);";
                $connection->query($sql);

                $sql = "SELECT *
                    FROM Musician
                    WHERE MusicianName = '$musicianName';"; 
                $result = $connection->query($sql);
                $response;
                while ($row = $result->fetch_assoc())
                {
                    $response = array("MusicianId"=>$row["MusicianId"], "MESSAGE" => "SUCCESS");
                }
                
                $connection->close();
                return $response;
            }
            else
            {
                $connection->close();
                return array("MESSAGE" => "409");
            }
        }
        else
        {
            return array("MESSAGE" => "500");
        }
    }
?>