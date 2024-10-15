<?php
/*
 *Base Controller
 *Loads the models and views
*/

class Controller
{

    protected $userModel;
    protected $serverKey;
    protected $auth_header;
    
    
    // public $account = (string)$this->generateUniqueUserID();
    public $appId = "994c5ec6485943e59acef3f1f12e7213";
    public $appCertificate = "3bd5c77ce4d34969803a7c16725b50e0";
    // public $channelName = $this->generateUniqueChannelName();
    public $expire = 432000;
    // public $uid = $this->generateUniqueUserID();
    // public $uidStr = (string)$this->generateUniqueUserID();



    public function __construct() {}

    // Load model
    public function model($model)
    {
        // Require model file
        require_once '../app/models/' . $model . '.php';

        // Instantiate model
        return new $model();
    }
    public function makeGetRequest($url) {
            // Initialize a cURL session
            $ch = curl_init();
        
            // Set the URL of the API endpoint
            curl_setopt($ch, CURLOPT_URL, $url);
        
            // Set the request method to GET
            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");
        
            // Return the response instead of outputting it directly
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        
            // Execute the request and store the response
            $response = curl_exec($ch);
        
            // Check for errors
            if(curl_errno($ch)) {
                return 'cURL error: ' . curl_error($ch);
            }
        
            // Close the cURL session
            curl_close($ch);
        
            // Return the response
            return $response;
        }

   public function makePostRequest($url, $data) {
    // Initialize a cURL session
    $ch = curl_init();
    $jsonData = json_encode($data);

    // Set the URL of the API endpoint
    curl_setopt($ch, CURLOPT_URL, $url);

    // Set the request method to POST
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");

    // Pass the POST data
    curl_setopt($ch, CURLOPT_POSTFIELDS,($jsonData));

    // Return the response instead of outputting it directly
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    // Execute the request and store the response
    $response = curl_exec($ch);

    // Check for errors
    if(curl_errno($ch)) {
        return 'cURL error: ' . curl_error($ch);
    }

    // Close the cURL session
    curl_close($ch);

    // Return the response
    return $response;
}

   public function test_buildTokenWithUid_ROLE_PUBLISHER()
    {
        $cname = $this->generateUniqueChannelName();
        $uid = $this->generateUniqueUserID();
        
        $token = RtcTokenBuilder2::buildTokenWithUserAccountAndPrivilege($this->appId, $this->appCertificate, $cname, (string)$uid,
            $this->expire, $this->expire, $this->expire, $this->expire, $this->expire);
        $accessToken = new AccessToken2();
         $accessToken->parse($token);

        Util::assertEqual($this->appId, $accessToken->appId);
        Util::assertEqual($this->expire, $accessToken->expire);
        Util::assertEqual($uid, $accessToken->services[ServiceRtc::SERVICE_TYPE]->channelName);
        Util::assertEqual((string)$uid, $accessToken->services[ServiceRtc::SERVICE_TYPE]->uid);
        Util::assertEqual(ServiceRtc::SERVICE_TYPE, $accessToken->services[ServiceRtc::SERVICE_TYPE]->type);
        Util::assertEqual($this->expire, $accessToken->services[ServiceRtc::SERVICE_TYPE]->privileges[ServiceRtc::PRIVILEGE_JOIN_CHANNEL]);
        Util::assertEqual($this->expire, $accessToken->services[ServiceRtc::SERVICE_TYPE]->privileges[ServiceRtc::PRIVILEGE_PUBLISH_AUDIO_STREAM]);
        Util::assertEqual($this->expire, $accessToken->services[ServiceRtc::SERVICE_TYPE]->privileges[ServiceRtc::PRIVILEGE_PUBLISH_VIDEO_STREAM]);
        Util::assertEqual($this->expire, $accessToken->services[ServiceRtc::SERVICE_TYPE]->privileges[ServiceRtc::PRIVILEGE_PUBLISH_DATA_STREAM]);
   
    }


    public function generateAgoraToken($channelName, $uid, $role, $expireTimeInSeconds)
    {
        putenv("AGORA_APP_ID=994c5ec6485943e59acef3f1f12e7213");
        putenv("AGORA_APP_CERTIFICATE=3bd5c77ce4d34969803a7c16725b50e0");
        
        // Now you can access the variables like this
        $appId = getenv("AGORA_APP_ID");
        $appCertificate = getenv("AGORA_APP_CERTIFICATE");

        // Validations
        if (!$appId || !$appCertificate) {
            return json_encode([
                'status' => 'error',
                'message' => 'Need to set environment variable AGORA_APP_ID and AGORA_APP_CERTIFICATE'
            ]);
        }

        if (!$channelName || !$uid || !$role || !$expireTimeInSeconds) {
            return json_encode([
                'status' => 'error',
                'message' => 'Invalid parameters. Ensure channelName, uid, role, and expireTimeInSeconds are provided.'
            ]);
        }

        // Initialize the expiration time
        $currentTimestamp = (new DateTime("now", new DateTimeZone('UTC')))->getTimestamp();
        $privilegeExpiredTs = $currentTimestamp + $expireTimeInSeconds;

        // Generate token with integer UID
        try {
            $tokenWithUid = RtcTokenBuilder::buildTokenWithUid($appId, $appCertificate, $channelName, $uid, $role, $privilegeExpiredTs);
        } catch (Exception $e) {
            return json_encode([
                'status' => 'error',
                'message' => 'Failed to generate token with UID: ' . $e->getMessage()
            ]);
        }

        // Generate token with user account (assuming UID as a string)
        try {
            $uidStr = (string) $uid; // Convert UID to string
            $tokenWithUserAccount = RtcTokenBuilder::buildTokenWithUserAccount($appId, $appCertificate, $channelName, $uidStr, $role, $privilegeExpiredTs);
        } catch (Exception $e) {
            return json_encode([
                'status' => 'error',
                'message' => 'Failed to generate token with user account: ' . $e->getMessage()
            ]);
        }

        // Return the tokens as a JSON response
        return json_encode([
            'status' => 'success',
            'appId' => $appId,
            'channelName' => $channelName,
            'uid' => $uid,
            'role' => $role,
            'expireTimeInSeconds' => $expireTimeInSeconds,
            'tokenWithUid' => $tokenWithUid,
            'tokenWithUserAccount' => $tokenWithUserAccount
        ]);
    }


public function generateUniqueChannelName($length = 16)
{
    // Ensure the length does not exceed 63 characters to stay within the 64-byte limit
    if ($length > 63) {
        $length = 63;
    }

    // Agora approved character set: lowercase, uppercase, digits, space, and allowed special characters
    $characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    // Shuffle the characters and create the channel name
    $channelName = '';
    $charLength = strlen($characters);

    for ($i = 0; $i < $length; $i++) {
        // Use random_int for secure random generation
        $channelName .= $characters[random_int(0, $charLength - 1)];
    }

    // Trim spaces at the start and end to avoid accidental padding
    $channelName = trim($channelName);

    // Ensure the final channel name is within 64 bytes
    while (mb_strlen($channelName, '8bit') > 63) {
        $channelName = substr($channelName, 0, -1); // Truncate if it exceeds 64 bytes
    }

    return $channelName;
}






    public function generateUniqueUserID()
    {
        // Define the minimum and maximum values for a 32-bit unsigned integer
        $min = 1;
        $max = 4294967295; // 2^32 - 1

        // Generate a random number between the defined range
        $uid = random_int($min, $max);

        return $uid;
    }

    // Load view
    public function view($view, $data = [])
    {
        // Check for view file
        if (file_exists('../app/views/' . $view . '.php')) {
            require_once '../app/views/' . $view . '.php';
        } else {
            // View doesn't exist
            die("view does not exist");
        }
    }



    public function generateUniqueId()
    {
        // Generate a UUID
        $uuid = uniqid('', true);

        // Get the current timestamp
        $timestamp = microtime(true);

        // Hash them together to ensure uniqueness
        $uniqueId = hash('sha256', $uuid . $timestamp);

        return $uniqueId;
    }



    // public function emailSent($data)
    // {
    //     return true;
    // }

    // public function generateSixDigitValue() {
    //     $random = mt_rand(0, 999);
    //     $timeString = date('s'); 
    //     $combined = $random . $timeString;
    //     return substr(str_pad($combined, 6, '0', STR_PAD_LEFT), -6);
    // }
    public function getData()
    {
        $raw = file_get_contents('php://input');
        $data = json_decode($raw, true);

        if (json_encode($data) === 'null') {
            return $data = $_POST;
        } else {
            return $data;
        }
    }

    public function getMyJsonID($token, $serverKey)
    {
        return    $JWT_token = JWT::encode($token, $serverKey);
    }

    public function generateSixDigitValue()
    {
        $random = mt_rand(0, 999); // Generate a random number between 0 and 999
        $timeString = date('s'); // Get current seconds (or you can use 'u' for microseconds)

        // Concatenate and then take the last 6 digits to ensure it's always 6 digits
        $combined = $random . $timeString;
        return substr(str_pad($combined, 6, '0', STR_PAD_LEFT), -6);
    }


    public function getAuthorizationHeader()
    {
        $headers =  null;
        if (isset($_SERVER['Authorization'])) {

            $headers = trim($_SERVER['Authorization']);
        } else if (isset($_SERVER['HTTP_ATHORIZATION'])) {
            $headers = trim($_SERVER['HTTP_ATHORIZATION']);
        } elseif (function_exists('apache_request_headers')) {
            $requestHeaders = apache_request_headers();
            $request_headers = array_combine(array_map('ucwords', array_keys($requestHeaders)), array_values($requestHeaders));
            if (isset($requestHeaders['Authorization'])) {
                $headers = trim($requestHeaders['Authorization']);
            }
        }


        return $headers;
    }

    public function bearer()
    {


        $this->auth_header  = $this->getAuthorizationHeader();


        if (
            $this->auth_header
            &&
            preg_match('#Bearer\s(\S+)#', $this->auth_header, $matches)
        ) {

            return $bearer = $matches['1'];
        }
    }




    public function myJsonID($bearer, $serverKey)
    {
        $myJsonID = JWT::decode($bearer, $serverKey);
        if ($myJsonID === 401) {
            return false;
        } else {

            return $myJsonID;
        }
    }



    public function serverKey()
    {
        return   'secret_server_keysa' . date("M");
    }



    //JWT::decode($bearer,'secret_server_key'.date("H"))
    public function RouteProtecion()
    {

        $headers =  $this->getAuthorizationHeader();

        if (!isset($headers)) {
            $response = ['error' => 'Authorization header missing', 'status' => 401];
            print_r(json_encode($response));
            exit;
        } else {
            $jwt = str_replace('Bearer ', '', $headers);
            $decoded = $this->myJsonID($jwt, $this->serverKey);

            $thisuser = $this->getuserbyid();
            return $thisuser;
            if (!$decoded) {
                $response = ['error' => 'Invalid token', 'status' => 401];
                print_r(json_encode($response));
                exit;
            }
        }
    }
    
    public function emailer($data)
    {
        $currentYear = date('Y');
        $insta = 'https://api.veluxpay.com/public/assets/img/it.png';
        $twitter = 'https://api.veluxpay.com/public/assets/img/tw.png';
        $linkedin = 'https://api.veluxpay.com/public/assets/img/lkn.png';
        $img = "https://drive.google.com/uc?id=1BIvv3INlHEqs52KCaZQNzweM65t8LKaY";
       $imagePath = 'https://api.veluxlink.com/public/assets/img/icons/logolink.jpg';
        $template_file = "/home/smfhervm/api.veluxlink.com/app/controllers/scheduled_call_email.php";

        $swap_arr = array(
            "IMGSRC" => $imagePath,
            "USERNAME" => $data['receiver_name'],
            "CALL" => $data['call_type'],
            "CALLER" => $data['caller_name'],
            "PERSON" => $data['call_date'] = 'you',
            "DATETIME" => $data['call_date'],
            "FROMTIME" => $data['from_'],
            //  "TOTIME" => $data['to_'],
            "TWITTER" => $twitter,
            "LINKEDIN" => $linkedin,
            "INSTA" => $insta,
            "DATE" => $currentYear,
        );


        if (file_exists($template_file)) {
            $message = file_get_contents($template_file);

            foreach ($swap_arr as $key => $value) {
                if (strlen($key) > 2 && trim($key) != "" && !empty($value)) {
                    $message = str_replace("{" . $key . "}", $value, $message);
                } else {
                    $res = [
                        "status" => "false",
                        "message" => "Unable to replace placeholder: {$key}",
                    ];
                    echo json_encode($res);
                    exit;
                }
            }
        } else {
            $res = [
                "status" => "false",
                "message" => "The file {$template_file} is not found",
            ];
            echo json_encode($res);
            exit;
        }

        $success = $this->sendHtmlEmailWithAttachment($data['r_email'], 'CALL SCHEDULE ', $message);
        //   print_r(json_encode($data));
        //     exit;


        if ($success) {
            return true;
        } else {
            return false;
        }
    }
    
    public function emailer2($data)
    {
        $currentYear = date('Y');
        $insta = 'https://api.veluxpay.com/public/assets/img/it.png';
        $twitter = 'https://api.veluxpay.com/public/assets/img/tw.png';
        $linkedin = 'https://api.veluxpay.com/public/assets/img/lkn.png';
        $img = "https://drive.google.com/uc?id=1BIvv3INlHEqs52KCaZQNzweM65t8LKaY";
       
    $imagePath = 'https://api.veluxlink.com/public/assets/img/icons/logolink.jpg';
        $template_file = "/home/smfhervm/api.veluxlink.com/app/controllers/scheduled_call_email.php";

        $swap_arr = array(
            "IMGSRC" => $imagePath,
            "USERNAME" => $data['caller_name'],
            "CALL" => $data['call_type'],
            "CALLER" => $data['caller_name'] = 'You',
            "PERSON" => $data['receiver_name'],
            "DATETIME" => $data['call_date'],
            "FROMTIME" => $data['from_'],
            // "TOTIME" => $data['to_'],
            "TWITTER" => $twitter,
            "LINKEDIN" => $linkedin,
            "INSTA" => $insta,
            "DATE" => $currentYear,
        );


        if (file_exists($template_file)) {
            $message = file_get_contents($template_file);

            foreach ($swap_arr as $key => $value) {
                if (strlen($key) > 2 && trim($key) != "" && !empty($value)) {
                    $message = str_replace("{" . $key . "}", $value, $message);
                } else {
                    $res = [
                        "status" => "false",
                        "message" => "Unable to replace placeholder: {$key}",
                    ];
                    echo json_encode($res);
                    exit;
                }
            }
        } else {
            $res = [
                "status" => "false",
                "message" => "The file {$template_file} is not found",
            ];
            echo json_encode($res);
            exit;
        }

        $success = $this->sendHtmlEmailWithAttachment($data['r_email'], 'CALL SCHEDULE ', $message);
        //   print_r(json_encode($data));
        //     exit;


        if ($success) {
            return true;
        } else {
            return false;
        }
    }
    
    
    public function passresetemailer($data)
    {
        $currentYear = date('Y');
        $insta = 'https://api.veluxpay.com/public/assets/img/it.png';
        $twitter = 'https://api.veluxpay.com/public/assets/img/tw.png';
        $linkedin = 'https://api.veluxpay.com/public/assets/img/lkn.png';
        // $img = "https://drive.google.com/uc?id=1BIvv3INlHEqs52KCaZQNzweM65t8LKaY";
         $imagePath = 'https://api.veluxlink.com/public/assets/img/icons/logolink.jpg';
        $template_file = '/home/smfhervm/api.veluxlink.com/app/controllers/forget_pass_email.php';

        $swap_arr = array(
            // "IMGSRC" => $imagePath,
            "USERNAME" => $data['email'],
            "CODE" => $data['otp'],
            "TWITTER" => $twitter,
            "LINKEDIN" => $linkedin,
            "INSTA" => $insta,
            "DATE" => $currentYear,
        );

        if (file_exists($template_file)) {
            $message = file_get_contents($template_file);

            foreach ($swap_arr as $key => $value) {
                if (strlen($key) > 2 && trim($key) != "" && !empty($value)) {
                    $message = str_replace("{" . $key . "}", $value, $message);
                } else {
                    $res = [
                        "status" => "false",
                        "message" => "Unable to replace placeholder: {$key}",
                    ];
                    echo json_encode($res);
                    exit;
                }
            }
        } else {
            $res = [
                "status" => "false",
                "message" => "The file {$template_file} is not found",
            ];
            echo json_encode($res);
            exit;
        }

        $data['r_email'] = $data['email'];
        $success = $this->sendHtmlEmailWithAttachment($data['r_email'], 'PASSWORD RESET', $message);


        // print_r(json_encode($data));
        // exit;


        if ($success) {
            //   $res = [
            //     "status" => "true",
            //     "message" => "Email sent successfully",
            //   ];
            //   echo json_encode($res);
            return true;
        } else {
            return false;
        }
    }
    
    
    
    
    public function passresetemailer2($data)
    {
        $currentYear = date('Y');
        $insta = 'https://api.veluxpay.com/public/assets/img/it.png';
        $twitter = 'https://api.veluxpay.com/public/assets/img/tw.png';
        $linkedin = 'https://api.veluxpay.com/public/assets/img/lkn.png';
        // $img = "https://drive.google.com/uc?id=1BIvv3INlHEqs52KCaZQNzweM65t8LKaY";
        // $imagePath = 'https://api.veluxpay.com/public/assets/img/WelcomeEmail.png';
        $template_file = '/home/smfhervm/api.veluxlink.com/app/controllers/forget_pass_email.php';

        $swap_arr = array(
            // "IMGSRC" => $imagePath,
            "USERNAME" => $data['email'],
            "CODE" => $data['otp'],
            "TWITTER" => $twitter,
            "LINKEDIN" => $linkedin,
            "INSTA" => $insta,
            "DATE" => $currentYear,
        );

        if (file_exists($template_file)) {
            $message = file_get_contents($template_file);

            foreach ($swap_arr as $key => $value) {
                if (strlen($key) > 2 && trim($key) != "" && !empty($value)) {
                    $message = str_replace("{" . $key . "}", $value, $message);
                } else {
                    $res = [
                        "status" => "false",
                        "message" => "Unable to replace placeholder: {$key}",
                    ];
                    echo json_encode($res);
                    exit;
                }
            }
        } else {
            $res = [
                "status" => "false",
                "message" => "The file {$template_file} is not found",
            ];
            echo json_encode($res);
            exit;
        }

        $data['r_email'] = $data['email'];
        $success = $this->sendHtmlEmailWithAttachment($data['r_email'], 'PASSWORD RESET', $message);


        // print_r(json_encode($data));
        // exit;


        if ($success) {
            //   $res = [
            //     "status" => "true",
            //     "message" => "Email sent successfully",
            //   ];
            //   echo json_encode($res);
            return true;
        } else {
            return false;
        }
    }

    private function sendHtmlEmailWithAttachment($to, $subject, $message)
    {
                  $mail = new PHPMailer;
            
            //$mail->SMTPDebug = 3;                               // Enable verbose debug output
            
            $mail->isSMTP();                                      // Set mailer to use SMTP
            $mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
            $mail->SMTPAuth = true;                               // Enable SMTP authentication
            $mail->Username = 'veluxlink@gmail.com';                 // SMTP username
            $mail->Password = 'qrjpzperskjigeyf';                           // SMTP password
            $mail->SMTPSecure = 'TLS';                            // Enable TLS encryption, `ssl` also accepted
            $mail->Port = 587;                                    // TCP port to connect to
            
            $mail->setFrom('info@veluxlink.com', 'VELUXLINK');
            $mail->addAddress($to, 'me');     // Add a recipient
            //  $mail->addAddress('osarogodwin17@gmail.com', 'Cc');
                //  $mail->addCC('osarogodwin17@gmail.com');
    $mail->addBCC('brainiacog833@gmail.com');
            // $mail->addCC('osarogodwin17@gmail.com');
            
            
            $mail->isHTML(true);                                  // Set email format to HTML
            
            $mail->Subject = $subject;
            $mail->Body    = $message;
            // $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';
         
              if ($mail->send()) {
          
            return true;
        } else {
            print_r(json_encode(['status' => false,'message' => 'Mailer Error: ' . $mail->ErrorInfo]));
        }
           
          
    }


    //echo $bearer;
    public function getuserbyid()
    {
        $bearer = $this->bearer();

        if ($bearer) {
            $userId = $this->myJsonID($bearer, $this->serverKey);

            if (!isset($userId)) {
                $response = array(

                    'status' => 'false',
                    'message' => 'Oops Something Went Wrong x get!!',

                );
                print_r(json_encode($response));
                exit;
            }
            $vb = $this->userModel->getuserbyid($userId->user_id);

            if (empty($userId->user_id)) {

                $response = array(
                    'status' => 'false',
                    'message' => 'No user with this userID!'
                );
                print_r(json_encode($response));
            } else {

                return $vb;
            }
        }
    }
}
