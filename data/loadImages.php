<?php
    $directory = "C:/Users/Huvok/Documents/GitHub/Cover/uploads/images/";
    session_start();
    $images = glob($directory . $_SESSION["MusicianId"] . "/*.jpg");

    $response = array();
    foreach($images as $image)
    {
      $response[] = base64_encode(file_get_contents($image));
    }

    echo json_encode($response);
?>