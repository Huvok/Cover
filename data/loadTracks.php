<?php
    $directory = "C:/Users/Huvok/Documents/GitHub/Cover/uploads/audio/";
    session_start();
    $audio = glob($directory . $_SESSION["MusicianId"] . "/*.mp3");

    $response = array();
    foreach($audio as $track)
    {
      $response[] = base64_encode(file_get_contents($track));
    }

    echo json_encode($response);
?>