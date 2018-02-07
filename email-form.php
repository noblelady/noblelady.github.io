<?php
/**
 * Created by PhpStorm.
 * User: Claire
 * Date: 2/6/2018
 * Time: 7:18 PM
 */

//My info
$to = "csn6973@rit.edu, cnoble9196@gmail.com";

$subject = $_POST['subject'];
$sender_email = $_POST['email'];
$message = $_POST['message'];
$headers = "From:$sender_email \r\n";

mail($to,$subject,$message);
