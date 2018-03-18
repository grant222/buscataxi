<?php
header("Access-Control-Allow-Origin: *");

//Connect & Select Database
//mysqli_connect("localhost","belas823_buscata","fe184235") or die("could not connect server");
$con=mysqli_connect("localhost","belas823_buscata","fe184235","belas823_buscataxi");

mysqli_select_db($con ,"belas823_buscataxi") or die("could not connect database");

//Create New Account
if(isset($_POST['signup']))
{
	$fullname=mysql_real_escape_string(htmlspecialchars(trim($_POST['fullname'])));
	$email=mysqli_real_escape_string(htmlspecialchars(trim($_POST['email'])));
	$password=mysqli_real_escape_string(htmlspecialchars(trim($_POST['password'])));
	$login=mysqli_num_rows(mysqli_query("select * from `phonegap_login` where `email`='$email'"));
	if($login!=0)
	{
		echo "exist";
	}
	else
	{
		$date=date("d-m-y h:i:s");
		$q=mysqli_query("insert into `phonegap_login` (`reg_date`,`fullname`,`email`,`password`) values ('$date','$fullname','$email','$password')");
		if($q)
		{
			echo "success";
		}
		else
		{
			echo "failed";
		}
	}
	echo mysqli_error();
}

//Login
if(isset($_POST['login']))
{
	//$email=mysqli_real_escape_string(htmlspecialchars(trim($_POST['email'])));
	//$password=mysqli_real_escape_string(htmlspecialchars(trim($_POST['password'])));
	//$login=mysqli_num_rows(mysqli_query("select * from `phonegap_login` where `email`='$email' and `password`='$password'"));
	
	$email= trim($_POST['email']);
	$password=trim($_POST['password']);
	$login=mysqli_num_rows(mysqli_query($con, "select * from `phonegap_login` where `email`='$email' and `password`='$password'"));
	
	if($login!=0)
	{
		echo "success";
	}
	else
	{
		echo "failed";
	}
}

//Change Password
if(isset($_POST['change_password']))
{
	$email=mysqli_real_escape_string(htmlspecialchars(trim($_POST['email'])));
	$old_password=mysqli_real_escape_string(htmlspecialchars(trim($_POST['old_password'])));
	$new_password=mysqli_real_escape_string(htmlspecialchars(trim($_POST['new_password'])));
	$check=mysqli_num_rows(mysqli_query("select * from `phonegap_login` where `email`='$email' and `password`='$old_password'"));
	if($check!=0)
	{
		mysqli_query("update `phonegap_login` set `password`='$new_password' where `email`='$email'");
		echo "success";
	}
	else
	{
		echo "incorrect";
	}
}

// Forget Password
if(isset($_POST['forget_password']))
{
	$email=mysqli_real_escape_string(htmlspecialchars(trim($_POST['email'])));
	$q=mysqli_query("select * from `phonegap_login` where `email`='$email'");
	$check=mysqli_num_rows($q);
	if($check!=0)
	{
		echo "success";
		$data=mysqli_fetch_array($q);
		$string="Hey,".$data['fullname'].", Your password is".$data['password'];
		mail($email, "Your Password", $string);
	}
	else
	{
		echo "invalid";
	}
}

?>