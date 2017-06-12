<?php
  error_reporting(0);
  require_once('PHPMailer/PHPmailerAutoload.php');

  switch ($_POST['form-name']) {
    case 'join-cogent':
      $subject = "Application email from " . $_POST['name'];
      $body .= $_POST['textarea'];
      break;
    case 'contact-us':
      $subject = "General inquiry from " . $_POST['name'];
      $body .= $_POST['textarea'];
      break;
    case 'influencer-form':
      $body = "";
      $subject = "Influencer request from " . $_POST['name'];
      foreach($_POST as $key=>$value) {
        if ($key == "form-name") {
          continue;
        }
        $line = $key . ": " . $value . "\n";
        $body .= $line;
      }
      echo $body;
      break;
  }

  // smtpmailer('jobs@cogentworld.com', $_POST['email'], $_POST['name'], $subject, $_POST['textarea'], $_FILES);
  smtpmailer('francis.m.kim@gmail.com', $_POST['email'], $_POST['name'], $subject, $body, $_FILES);


  function smtpmailer($to, $from, $from_name, $subject, $body, $file) {
  	global $error;
  	$mail = new PHPMailer();  // create a new object

    // $mail->SMTPDebug = 1;  // debugging: 1 = errors and messages, 2 = messages only
    $mail->Debugoutput = 'html';

  	$mail->IsSMTP(); // enable SMTP
    $mail->SMTPOptions = array(
        'ssl' => array(
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true
        )
    );
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;  // authentication enabled
  	$mail->SMTPSecure = 'tls'; // secure transfer enabled REQUIRED for GMail
  	$mail->Port = 587;
    $mail->SMTPAuth = true;
    $mail->Username = 'from.cogent.world.web@gmail.com';
    $mail->Password = 'Platinum1!';

  	// $mail->Username = 'jobs@cogentworld.com';
  	// $mail->Password = 'cogentworld';



  	$mail->SetFrom($from, $from_name);
  	$mail->Subject = $subject;
  	$mail->Body = $body;
  	$mail->AddAddress($to);
    $mail->AddAttachment($file['file']['tmp_name'],
                         $file['file']['name']);

    // $mail->isHTML(true);

  	if(!$mail->Send()) {
  		$error = 'Mail error: '.$mail->ErrorInfo;
      echo $error;
  		return false;
  	} else {
      header('Location: ' . "http://www.cogentworld.com");
  	}
  }



?>
