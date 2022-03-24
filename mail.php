<?php
// файлы phpmailer
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

$title = "Тема письма";
$file = $_FILES['file']; // если нужна отправка файлов

$c = true;
// Формирование самого письма
$title = "Заголовок письма";
foreach ($_POST as $key => $value) {
  if ($value != "" && $key != "project_name" && $key != "admin_email" && $key != "form_subject") {
    $body .= "
    " . ( ($c = !$c) ? '<tr>':'<tr style="background-color: #f8f8f8;">' ) . "
      <td style='padding: 10px; border: 1px solild #e9e9e9;'><b>$key</b></td>
      <td style='padding: 10px; border: 1px solild #e9e9e9;'>$value</td>
    </tr>
    ";
  }
}

$body = "<table style='width: 100%;'>$body</table>";

// Настройка PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();

try {
  $mail->isSMTP();
  $mail->CharSet  = "UTF-8";
  $mail->SMTPAuth = true;

  // Настройки вашей почты
  $mail->Host     = 'smtp.gmail.com'; // SMTP сервера вашей почты
  // $mail->Host = 'smtp.yandex.com'; // SMTP сервера вашей почты
  $mail->Username = 'mirovygin.matrix@gmail.com';  // Логин на почте
  $mail->Password = 'vmubgtkgzvdithxo'; // Пароль на почте (не пароль от самой почты)
  $mail->SMTPSecure = 'ssl';
  $mail->Port = '465'; // Порт

  $mail->setFrom('mirovygin.matrix@gmail.com', 'Заявка с сайта');

  // Получатели письма
  $mail->addAddress('mirovygin.matrix@gmail.com');
  // $mail->addAddress('podvalenko.oleg@gmail.com'); // можно добавить и другие адреса получателей

  // Отправка сообщения
  $mail->isHTML(true);
  $mail->Subject = $title;
  $mail->Body = $body;

  $mail->send();

} catch (Exception $e) {
  $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}