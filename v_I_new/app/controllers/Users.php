<?php 


Class Users extends Controller 
{

  protected $userModel;
  protected $serverKey;
  
  public function __construct()
  {
    $this->userModel = $this->model('User');
    
    $this->serverKey  = 'secret_server_key' . date("H");
    
  }

  public function loginfunc()
  {
    $jsonData = $this->getData();
    if (!isset($jsonData['email']) || !isset($jsonData['password'])) {
      $response = array(
        'status' => false,

        'message' => 'Enter login details',

      );

      print_r(json_encode($response));
      exit;
    }
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {

      $loginData = $this->getData();

      // Init data
      $data = [

        'email' => trim($jsonData['email']),
        'password' => trim($jsonData['password']),
        'email_err' => '',
        'msg' => '',
        'loginStatus' => '',
        'password_err' => '',
      ];
      // Validate Email
      if (empty($data['email'])) {
        $data['email_err'] = 'Please enter email';
      }

      // Validate password
      if (empty($data['password'])) {
        $data['password_err'] = 'Please enter password';
      }
      if ((empty($data['email_err'])) && (empty($data['password_err']))) {
        if ($this->userModel->findUserByEmail1($data['email'])) {
          $loginDatax = $this->userModel->loginUser($data['email']);
          $postPassword = $data['password'];
         
          $hash_password = $loginDatax->password;
          $email = $loginDatax->email;
          $user_id = $loginDatax->user_id;
       if ((password_verify($postPassword, $hash_password))) {



            $tokenX = $token = "token" . md5(date("dmyhis") . rand(1222, 89787)) . md5(date("dmyhis") . rand(1222, 89787)) . md5(date("dmyhis") . rand(1222, 89787)) . md5(date("dmyhis") . rand(1222, 89787)) . md5(date("dmyhis") . rand(1222, 89787));
            $this->userModel->updateToken($user_id, $tokenX);

            $loginData = $this->userModel->findLoginByToken($tokenX);
             
            $userData = $this->userModel->findUserByEmail_det2($loginData->email);
            $initData = [
              'loginData' => $loginData,
              'userData' => $userData,
            ];

            $datatoken = [
              'user_id' => $user_id,
              'email' => $email,
              'appToken' => $initData['loginData']->token,

            ];
            $JWT_token = $this->getMyJsonID($datatoken, $this->serverKey);
            $response = array(
              'status' => true,
              'access_token' => $JWT_token,
            //   'datatoken' => $datatoken,
              'message' => 'success',
            //   'data' => $initData,

            );


            print_r(json_encode($response));
            exit;
          } else {
            $response = array(
              'status' => false,
              'message' => 'Invalid password',

            );

            print_r(json_encode($response));
            exit;
          }

        } else {


          $response = array(
            'status' => false,

            'message' => 'invalid user email',
         
          );

          print_r(json_encode($response));
          exit;
        }
      } else {
        $response = array(
          'status' => false,
          'message' => 'All input fields must be complete',
          'data' => $data,
        );

        print_r(json_encode($response));
        exit;
      }


    } else {

      $response = array(
        'status' => false,

        'message' => 'Invalid server method',

      );

      print_r(json_encode($response));
      exit;
    }

    
  }


  
  public function edit_user()
  {

    try {
      $userData = $this->RouteProtecion();
        } catch (UnexpectedValueException $e) {
      $res = [
        'status' => 401,
        'message' =>  $e->getMessage(),
      ];
      print_r(json_encode($res));
      exit;
      }
      
      $sentData = $this->getData();
      $data = array(
          "fullname" => trim($sentData["fullname"]),
          "uname" => trim($sentData["uname"]),
          "email" => trim($sentData["email"]),
          "x_link" => trim($sentData["x_link"]),
          "user_id" =>  $userData->user_id,
          "insta_link" => trim($sentData["insta_link"]),
          "linkedin_link" => trim($sentData["linkedin_link"]),
          "image" => $_FILES["image"],
      );

      foreach ($data as $key => $value) {
          if (is_string($value) && $value === "") {
              $res = json_encode(array(
                  "status" => false,
                  "message" => "Incomplete params: " . $key . " is required."
              ));

              print_r($res);
              exit;
          }
      }

      if (!filter_var($data["email"], FILTER_VALIDATE_EMAIL)) {
        print_r(json_encode(array(
            "status" => false,
            "message" => "Invalid email."
        )));
        exit;
    }

    if($this->userModel->findUserByEmail1($data['email'])){
      print_r(json_encode(array(
        "status" => false,
        "message" => "User Already registered ."
    )));
    exit;
    }

      $new_image_names = [];

      $extensions = ["jpeg", "png", "jpg"];
      $types = ["image/jpeg", "image/jpg", "image/png"];

      $image_fields = ['image'];

      foreach ($image_fields as $image_field) {
          if (isset($data[$image_field])) {
              $img_name = $data[$image_field]['name'];
              $img_type = $data[$image_field]['type'];
              $tmp_name = $data[$image_field]['tmp_name'];
              $img_explode = explode('.', $img_name);
              $img_ext = end($img_explode);

              if (in_array($img_ext, $extensions) === true) {
                  if (in_array($img_type, $types) === true) {
                      $time = time();
                      $new_img_name = $time . "_" . $img_name;
                      if (move_uploaded_file($tmp_name,  "assets/img/attachment/" . $new_img_name)) {
                          $new_image_names[$image_field] = (string)(URLROOT . "/assets/img/attachment/" . $new_img_name); 
                      } else {
                          $response = array(
                              'status' => 'false',
                              'message' => "Upload failed for $image_field",
                          );
                          print_r(json_encode($response));
                          exit;
                      }
                  } else {
                      $response = array(
                          'status' => 'false',
                          'message' => "Invalid file type for $image_field. Allowed types are: " . implode(', ', $types),
                      );
                      print_r(json_encode($response));
                      exit;
                  }
              } else {
                  $response = array(
                      'status' => 'false',
                      'message' => "Invalid file extension for $image_field. Allowed extensions are: " . implode(', ', $extensions),
                  );
                  print_r(json_encode($response));
                  exit;
              }
          } else {
              $response = array(
                  'status' => 'false',
                  'message' => "$image_field not set",
              );
              print_r(json_encode($response));
              exit;
          }
      }

      foreach ($new_image_names as $key => $value) {
          $data[$key] = $value;
      }
      if ($this->userModel->edit_user($data)) {
          $res = json_encode(array(
              'status' => true,
              'message' => 'edit profile successful'
          ));
          print_r($res);
          exit;


      } else {
          
          $res = json_encode(array(
              'status' => false,
              'message' => 'registeration failed'
          ));
          print_r($res);
          exit;
      }



  }
  
  public function register_user()
  {
      
      $sentData = $this->getData();
      $data = array(
          "fullname" => trim($sentData["fullname"]),
          "uname" => trim($sentData["uname"]),
          "email" => trim($sentData["email"]),
       
          "user_id" =>  $this->generateUniqueId(),
      
          "image" => $_FILES["image"],
          "password"=> trim($sentData["password"]),
          "confirm_password"=> trim($sentData["confirm_password"]),
      );

      foreach ($data as $key => $value) {
          if (is_string($value) && $value === "") {
              $res = json_encode(array(
                  "status" => false,
                  "message" => "Incomplete params: " . $key . " is required."
              ));

              print_r($res);
              exit;
          }
      }
        $data["x_link"]= trim($sentData["x_link"]);
          $data["insta_link"] = trim($sentData["insta_link"]);
          $data["linkedin_link"] = trim($sentData["linkedin_link"]);

      if (!filter_var($data["email"], FILTER_VALIDATE_EMAIL)) {
        print_r(json_encode(array(
            "status" => false,
            "message" => "Invalid email."
        )));
        exit;
    }

    if($this->userModel->findUserByEmail1($data['email'])){
      print_r(json_encode(array(
        "status" => false,
        "message" => "User Already registered ."
    )));
    exit;
    }
    if($this->userModel->findUserByUname($data['uname'])){
      print_r(json_encode(array(
        "status" => false,
        "message" => "Uaer Name Already taken ."
    )));
    exit;
    }

      $new_image_names = [];

      $extensions = ["jpeg", "png", "jpg"];
      $types = ["image/jpeg", "image/jpg", "image/png"];

      $image_fields = ['image'];

      foreach ($image_fields as $image_field) {
          if (isset($data[$image_field])) {
              $img_name = $data[$image_field]['name'];
              $img_type = $data[$image_field]['type'];
              $tmp_name = $data[$image_field]['tmp_name'];
              $img_explode = explode('.', $img_name);
              $img_ext = end($img_explode);

              if (in_array($img_ext, $extensions) === true) {
                  if (in_array($img_type, $types) === true) {
                      $time = time();
                      $new_img_name = $time . "_" . $img_name;
                      if (move_uploaded_file($tmp_name,  "assets/img/attachment/" . $new_img_name)) {
                          $new_image_names[$image_field] = (string)(URLROOT . "/assets/img/attachment/" . $new_img_name); 
                      } else {
                          $response = array(
                              'status' => 'false',
                              'message' => "Upload failed for $image_field",
                          );
                          print_r(json_encode($response));
                          exit;
                      }
                  } else {
                      $response = array(
                          'status' => 'false',
                          'message' => "Invalid file type for $image_field. Allowed types are: " . implode(', ', $types),
                      );
                      print_r(json_encode($response));
                      exit;
                  }
              } else {
                  $response = array(
                      'status' => 'false',
                      'message' => "Invalid file extension for $image_field. Allowed extensions are: " . implode(', ', $extensions),
                  );
                  print_r(json_encode($response));
                  exit;
              }
          } else {
              $response = array(
                  'status' => 'false',
                  'message' => "$image_field not set",
              );
              print_r(json_encode($response));
              exit;
          }
      }

      foreach ($new_image_names as $key => $value) {
          $data[$key] = $value;
      }
//  print_r($data);
//           exit;

      $data['password'] = password_hash($data['password'], PASSWORD_DEFAULT);
      
      
      if ($this->userModel->register_user($data)) {

          ///////// sends email




          //////////end


          $res = json_encode(array(
              'status' => true,
              'message' => 'registeration successful'
          ));
          print_r($res);
          exit;


      } else {
          
          $res = json_encode(array(
              'status' => false,
              'message' => 'registeration failed'
          ));
          print_r($res);
          exit;
      }



  }



  public function forgetPassword() {

    $sentData = $this->getData();

    $data = [
      'email'=> $sentData['email'],
    ];

    if ($this->userModel->findUserByEmail1($data['email'])) {

      ///////sends email with otp////

      $data['otp'] = $this->generateSixDigitValue();
      $otp = $data['otp'];

      if($this->passresetemailer($data)){
        $data['otp'] = password_hash($data['otp'], PASSWORD_DEFAULT);
        $this->userModel->updateResetToken($data);
        $res = json_encode(array(
          'status'=> true,
          'message'=> 'otp sent',
          'otp' => $otp
          ));
          print_r($res);
      }else {
        $res = json_encode(array(
          'status'=> false,
          'message'=> 'otp not sent'
          ));
          print_r($res);
      }





    }
  }


  public function resetPassword() {

    $sentData = $this->getData();

    $data = [
      'otp' => $sentData['otp'],
      'password'=> $sentData['password'],
      'confirm_password' => $sentData['confirm_password'],
    ];

    foreach ($data as $key => $value) {
      if (is_string($value) && $value === "") {
          $res = json_encode(array(
              "status" => false,
              "message" => "Incomplete params: " . $key . " is required."
          ));

          print_r($res);
          exit;
      }
  }

  if ($data['confirm_password'] != $data['password']) {
    $res = json_encode(array(
      'status'=> false,
      'message'=> 'password do not match'

    ));
    print_r($res);
  }

    $usersData = $this->userModel->findAllUsers();

    foreach ($usersData as $user) {
      $hash_otp = $user->password_reset_token;
      if(password_verify($data['otp'], $hash_otp)){
        ///// send reset password email////
        $data['password'] = password_hash($data['password'], PASSWORD_DEFAULT);
        $data['user_id'] = $user->user_id;
        $data['email'] = $user->email;
        if ($this->userModel->updatePassword($data)) {
           $res = json_encode(array(
            'status'=> true,
            'message'=> 'password reset successful'
            ));
            print_r($res);
        }else {
          $res = json_encode(array(
            'status'=> false,
            'message'=> 'password reset failed'

          ));
          print_r($res);
        }
      }
    }
  }

  public function getuserbyid12(){

    try {
      $userData = $this->RouteProtecion();
        } catch (UnexpectedValueException $e) {
      $res = [
        'status' => 401,
        'message' =>  $e->getMessage(),
      ];
      print_r(json_encode($res));
      exit;
      } catch(DomainException $e) {
        $res = [
          'status' => 401,
          'message' =>  $e->getMessage(),
        ];
        print_r(json_encode($res));
        exit;
      }

      // print_r(json_decode($userData));
      // exit;
      $user_id = $userData->user_id;

    $user = $this->userModel->getUser($user_id);


    if($user){
      $res = json_encode(array(
        'status'=> true,
        'message'=> 'success',
        'data'=> $user
        ));
        print_r($res);
    }else {
      $res = json_encode(array(
        'status'=> false,
        'message'=> []
        ));
        print_r($res);
    }
  }
  public function getAllusers(){

    try {
      $userData = $this->RouteProtecion();
        } catch (UnexpectedValueException $e) {
      $res = [
        'status' => 401,
        'message' =>  $e->getMessage(),
      ];
      print_r(json_encode($res));
      exit;
      } catch(DomainException $e) {
        $res = [
          'status' => 401,
          'message' =>  $e->getMessage(),
        ];
        print_r(json_encode($res));
        exit;
      }

      // print_r(json_decode($userData));
      // exit;
      $user_id = $userData->user_id;

    $user = $this->userModel->getAllusers();


    if($user){
      $res = json_encode(array(
        'status'=> true,
        'message'=> 'success',
        'data'=> $user
        ));
        print_r($res);
    }else {
      $res = json_encode(array(
        'status'=> false,
        'message'=> []
        ));
        print_r($res);
    }
  }


  public function findThisUser(){

    try {
      $userData = $this->RouteProtecion();
        } catch (UnexpectedValueException $e) {
      $res = [
        'status' => 401,
        'message' =>  $e->getMessage(),
      ];
      print_r(json_encode($res));
      exit;
      } catch(DomainException $e) {
        $res = [
          'status' => 401,
          'message' =>  $e->getMessage(),
        ];
        print_r(json_encode($res));
        exit;
      }

      $sentData = $this->getData();
      $username = $sentData['username'];
      $user_id = $userData->user_id;

    $user = $this->userModel->findUserByUsername($username);


    if($user){
      $res = json_encode(array(
        'status'=> true,
        'message'=> 'success',
        'data'=> $user
        ));
        print_r($res);
    }else {
      $res = json_encode(array(
        'status'=> false,
        'message'=> []
        ));
        print_r($res);
    }
  }


  





}