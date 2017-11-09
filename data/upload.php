<?php

session_start();

if (!file_exists('C:/Users/Huvok/Documents/GitHub/Cover/uploads/images/' . $_SESSION["MusicianId"])) 
{
    mkdir('C:/Users/Huvok/Documents/GitHub/Cover/uploads/images/' . $_SESSION["MusicianId"], 0777, true);
}

if(!move_uploaded_file($_FILES['images']['tmp_name'], 'C:/Users/Huvok/Documents/GitHub/Cover/uploads/images/' . $_SESSION["MusicianId"] . "/" . $_FILES['images']['name'])){
    die('Error uploading file - check destination is writeable.');
}

echo "<h2>Successfully Uploaded Images</h2>";
?>