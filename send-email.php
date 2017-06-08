<?php
  error_reporting(0);
  require_once('PHPMailer/PHPmailerAutoload.php');
  $subject = "";

  if($_POST['form-name'] == 'join-cogent'){

  }
  switch ($_POST['form-name']) {
    case 'join-cogent':
      $subject = "Application email from " . $_POST['name'];
      break;
    case 'contact-us':
      $subject = "General inquiry from " . $_POST['name'];
      break;
    case 'the-cogent-argument':
      $info = "";
      foreach($_POST as $key=>$value) {
        if ($key == "textarea" || $key == "form-name" {
          continue;
        }
        $line = $key . ": " . $value . "\n";
        $info .= $line;
      }
      $_POST['textarea'] = $info . $_POST['textarea'];
      $subject = "General inquiry from " . $_POST['companyName'];
      break;
  }

  smtpmailer('bashir@cogentworld.com', $_POST['email'], $_POST['name'], $subject, $_POST['textarea'], $_FILES);

  function smtpmailer($to, $from, $from_name, $subject, $body, $file) {
  	global $error;
  	$mail = new PHPMailer();  // create a new object
  	$mail->IsSMTP(); // enable SMTP
  	$mail->SMTPDebug = 0;  // debugging: 1 = errors and messages, 2 = messages only
  	$mail->SMTPAuth = true;  // authentication enabled
  	$mail->SMTPSecure = 'ssl'; // secure transfer enabled REQUIRED for GMail
  	$mail->Host = 'smtp.gmail.com';
  	$mail->Port = 465;
  	$mail->Username = 'bashir@cogentworld.com';
  	$mail->Password = 'Platinum1!';
  	$mail->SetFrom($from, $from_name);
  	$mail->Subject = $subject;
  	$mail->Body = $body;
  	$mail->AddAddress($to);
    $mail->AddAttachment($file['file']['tmp_name'],
                         $file['file']['name']);
  	if(!$mail->Send()) {
  		$error = 'Mail error: '.$mail->ErrorInfo;
  		return false;
  	} else {
  		$error = 'Message sent!';
  		return true;
  	}
  }



?>
