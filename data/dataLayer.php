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

    function jsonAttemptLogin($email, $password)
    {
        $connection = getDatabaseConnection();
        $key = pack('H*', "bcb04b7e103a0cd8b54763051cef08bc55abe029fdebae5e1d417e2ffb2a00a3");
        if ($connection != null)
        {
            $iv_size = mcrypt_get_iv_size(MCRYPT_RIJNDAEL_128, MCRYPT_MODE_CBC);
            
            $sql = "SELECT *
                FROM Musician
                WHERE Email = '$email'";
            
            $result = $connection->query($sql);
            
            if ($result->num_rows > 0)
            {
                $cypher_password;
                while ($row = $result->fetch_assoc())
                {
                    $response = array("MusicianId"=>$row["MusicianId"],
                            "MESSAGE"=>"SUCCESS");
                    $cypher_password = $row["Password"];
                }
                
                $ciphertext_dec = base64_decode($cypher_password);
                $iv_dec = substr($ciphertext_dec, 0, $iv_size);
                $ciphertext_dec = substr($ciphertext_dec, $iv_size);
                $plaintext_dec = mcrypt_decrypt(MCRYPT_RIJNDAEL_128, $key,
                    $ciphertext_dec, MCRYPT_MODE_CBC, $iv_dec);
                
                $plaintext_dec = clean($plaintext_dec);
                
                $connection->close();
                
                if ($password == $plaintext_dec)
                {
                    return $response;
                }
                else
                {
                    return array("MESSAGE" => "406");
                }
            }
            else
            {
                $connection->close();
                return array("MESSAGE" => "406");
            }
        }
        else
        {
            return array("MESSAGE" => "500");
        }
    }

    function jsonAttemptRegistration($firstName, $lastName, $email, $musicianName, $password, $country, $city)
    {
        $connection = getDatabaseConnection();
        $key = pack('H*', "bcb04b7e103a0cd8b54763051cef08bc55abe029fdebae5e1d417e2ffb2a00a3");
        if ($connection != null)
        {
            $iv_size = mcrypt_get_iv_size(MCRYPT_RIJNDAEL_128, MCRYPT_MODE_CBC);
            $iv = mcrypt_create_iv($iv_size, MCRYPT_RAND);
            $ciphertext = mcrypt_encrypt(MCRYPT_RIJNDAEL_128, $key, $password, MCRYPT_MODE_CBC, $iv);
            $ciphertext = $iv . $ciphertext;
            $password = base64_encode($ciphertext);
            
            $sql = "SELECT *
                FROM Musician
                WHERE MusicianName = '$musicianName';";
  
            $result = $connection->query($sql);

            if ($result->num_rows == 0)
            {            
                $sql = "INSERT INTO Musician (MusicianId, FirstName, LastName, Email, MusicianName, Password, Country, City, RegDate)
                    VALUES (NULL, '$firstName', '$lastName', '$email', '$musicianName', '$password', '$country', '$city', DEFAULT);";
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

    function clean($string) 
    {
        return preg_replace('/[\x00-\x09\x0B\x0C\x0E-\x1F\x7F]/', '', $string);
    }
?>