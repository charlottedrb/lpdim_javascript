<?php 
session_start();

if(isset($_GET["code"]) && $_GET["code"] == "012"){
    $_SESSION["connected"] = true; 
} else {
    unset($_SESSION["connected"]);
}