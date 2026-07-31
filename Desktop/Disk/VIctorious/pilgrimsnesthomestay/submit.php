<?php
// submit.php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle preflight requests for CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Get the POST data
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data) {
    echo json_encode(["status" => "error", "message" => "No data provided."]);
    exit;
}

// Add a timestamp
$data['submitted_at'] = date('Y-m-d H:i:s');

// The file will be saved in data/enquiries.json relative to where this script is placed
$dir = __DIR__ . '/data';
$file = $dir . '/enquiries.json';

// Create data directory if it doesn't exist securely
if (!is_dir($dir)) {
    mkdir($dir, 0755, true);
}

// Read existing entries from the JSON file
$entries = [];
if (file_exists($file)) {
    $existingData = file_get_contents($file);
    if ($existingData) {
        $entries = json_decode($existingData, true);
        if (!is_array($entries)) {
            $entries = [];
        }
    }
}

// Append new entry
$entries[] = $data;

// Save the updated list back to the JSON file
$isSaved = file_put_contents($file, json_encode($entries, JSON_PRETTY_PRINT));

// Prepare Email content
$name = htmlspecialchars($data['name'] ?? 'N/A');
$phone = htmlspecialchars($data['phone'] ?? 'N/A');
$checkin = htmlspecialchars(($data['checkin'] ?? 'N/A') . " at " . ($data['checkin_time'] ?? 'N/A'));
$checkout = htmlspecialchars(($data['checkout'] ?? 'N/A') . " at " . ($data['checkout_time'] ?? 'N/A'));
$guests = htmlspecialchars($data['guests'] ?? 'N/A');
$rooms = htmlspecialchars($data['rooms'] ?? 'N/A');
$amenities = htmlspecialchars($data['amenities'] ?? 'N/A');
$addons = htmlspecialchars($data['addons'] ?? 'N/A');
$message = nl2br(htmlspecialchars($data['message'] ?? 'N/A'));
$submittedAt = htmlspecialchars($data['submitted_at']);

$mailText = "
<!DOCTYPE html>
<html>
<head>
  <meta charset='UTF-8'>
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7f6; margin: 0; padding: 0; }
    .email-container { max-width: 600px; margin: 30px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(135deg, #b8860b, #daa520); padding: 25px; text-align: center; }
    .header h1 { color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 1px; }
    .header .tagline { font-size: 13px; text-transform: uppercase; letter-spacing: 1.5px; color: #fff8dc; margin-top: 5px; }
    .content { padding: 30px; }
    .section-title { color: #b8860b; font-size: 16px; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid #daa520; padding-bottom: 8px; margin-top: 0; margin-bottom: 20px; font-weight: bold; }
    .details-table { width: 100%; border-collapse: collapse; }
    .details-table td { padding: 12px 0; border-bottom: 1px solid #f0f0f0; vertical-align: top; }
    .details-table td.label { width: 35%; color: #666; font-size: 13px; font-weight: 600; text-transform: uppercase; }
    .details-table td.value { color: #333; font-size: 15px; font-weight: 500; }
    .footer { background-color: #f9f9f9; padding: 20px; text-align: center; font-size: 12px; color: #888; border-top: 1px solid #eee; }
  </style>
</head>
<body>
  <div class='email-container'>
    <div class='header'>
      <h1>Pilgrim's Nest Homestay</h1>
      <div class='tagline'>New Booking Enquiry</div>
    </div>
    <div class='content'>
      <div class='section-title'>Booking Details</div>
      <table class='details-table'>
        <tr>
          <td class='label'>Name</td>
          <td class='value'>{$name}</td>
        </tr>
        <tr>
          <td class='label'>Phone</td>
          <td class='value'>{$phone}</td>
        </tr>
        <tr>
          <td class='label'>Check-In</td>
          <td class='value'>{$checkin}</td>
        </tr>
        <tr>
          <td class='label'>Check-Out</td>
          <td class='value'>{$checkout}</td>
        </tr>
        <tr>
          <td class='label'>Guests</td>
          <td class='value'>{$guests}</td>
        </tr>
        <tr>
          <td class='label'>Rooms</td>
          <td class='value'>{$rooms}</td>
        </tr>
        <tr>
          <td class='label'>Room Preference</td>
          <td class='value'>{$amenities}</td>
        </tr>
        <tr>
          <td class='label'>Add-ons</td>
          <td class='value'>{$addons}</td>
        </tr>
        <tr>
          <td class='label'>Message</td>
          <td class='value'>{$message}</td>
        </tr>
        <tr>
          <td class='label'>Submitted At</td>
          <td class='value'>{$submittedAt}</td>
        </tr>
      </table>
    </div>
    <div class='footer'>
      <p>This is an automated notification from the Pilgrim's Nest Homestay website.</p>
    </div>
  </div>
</body>
</html>
";

$subject = 'New Booking Enquiry: ' . $name . ' (Pilgrim\'s Nest Homestay)';

$mailSent = sendSmtpEmail('tsb.73540@gmail.com', $subject, trim($mailText));

if ($isSaved) {
    echo json_encode(["status" => "success", "message" => "Enquiry saved and email notification triggered."]);
} else {
    echo json_encode(["status" => "error", "message" => "Failed to save enquiry."]);
}

// Custom SMTP Socket Helper
function sendSmtpEmail($to, $subject, $messageText)
{
  $host = 'ssl://mail.victoriousinnovatechsolutions.com';
  $port = 465;
  $username = 'contact@victoriousinnovatechsolutions.com';
  $password = 'victoriousinnovatechsolutions@1234';
  $from = 'contact@victoriousinnovatechsolutions.com';

  $socket = @fsockopen($host, $port, $errno, $errstr, 15);
  if (!$socket) {
    return false;
  }

  $readResponse = function ($socket, $expectedCode) {
    $serverResponse = '';
    while (substr($serverResponse, 3, 1) !== ' ') {
      if (!($serverResponse = fgets($socket, 256))) {
        return false;
      }
    }
    if (substr($serverResponse, 0, 3) !== $expectedCode) {
      return false;
    }
    return true;
  };

  if (!$readResponse($socket, '220')) {
    fclose($socket);
    return false;
  }

  fwrite($socket, "EHLO " . (isset($_SERVER['SERVER_NAME']) ? $_SERVER['SERVER_NAME'] : 'localhost') . "\r\n");
  if (!$readResponse($socket, '250')) {
    fclose($socket);
    return false;
  }

  fwrite($socket, "AUTH LOGIN\r\n");
  if (!$readResponse($socket, '334')) {
    fclose($socket);
    return false;
  }

  fwrite($socket, base64_encode($username) . "\r\n");
  if (!$readResponse($socket, '334')) {
    fclose($socket);
    return false;
  }

  fwrite($socket, base64_encode($password) . "\r\n");
  if (!$readResponse($socket, '235')) {
    fclose($socket);
    return false;
  }

  fwrite($socket, "MAIL FROM:<$from>\r\n");
  if (!$readResponse($socket, '250')) {
    fclose($socket);
    return false;
  }

  fwrite($socket, "RCPT TO:<$to>\r\n");
  if (!$readResponse($socket, '250')) {
    fclose($socket);
    return false;
  }

  fwrite($socket, "DATA\r\n");
  if (!$readResponse($socket, '354')) {
    fclose($socket);
    return false;
  }

  $encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
  $headers = "From: \"Pilgrim's Nest Enquiries\" <$from>\r\n";
  $headers .= "To: <$to>\r\n";
  $headers .= "Subject: $encodedSubject\r\n";
  $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
  $headers .= "Content-Transfer-Encoding: base64\r\n";
  $headers .= "MIME-Version: 1.0\r\n";

  $body = $headers . "\r\n" . chunk_split(base64_encode($messageText));

  fwrite($socket, $body . "\r\n.\r\n");
  if (!$readResponse($socket, '250')) {
    fclose($socket);
    return false;
  }

  fwrite($socket, "QUIT\r\n");
  fclose($socket);
  return true;
}
?>
