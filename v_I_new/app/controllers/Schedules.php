<?php 

Class Schedules extends Controller {

    protected $scheduleModel;
    
    protected $serverKey;
    protected $userModel;
    public function __construct() {
        $this->scheduleModel = $this->model("Schedule");
         $this->userModel = $this->model('User');
    
    $this->serverKey  = 'secret_server_key' . date("H");
    }


    public function setScheduleFee() {
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

        $data = [
            'schedule_fee'=> $sentData['schedule_fee'],
            'user_id' => $userData->user_id,
            'token' => $userData->token,
        ];


        if (empty($data['schedule_fee'])) {
            $res = [
                'status'=> false,
                'message'=> 'field must not be empty',
                ];
                print_r(json_encode($res));
                exit;
        }
        if ($data['schedule_fee'] < 0.1) {
            $res = [
                'status'=> false,
                'message'=> 'fee must be above 0.1sol',
                ];
                print_r(json_encode($res));
                exit;
        }


        if ($this->scheduleModel->setScheduleFee($data)) {
            $res = [
                'status'=> true,
                'message'=> 'schedule fee set successfully',
                ];
                print_r(json_encode($res));
                exit;
        }else {
            $res = [
                'status'=> false,
                'message'=> 'failed to set schedule fee',
                ];
                print_r(json_encode($res));
                exit;
        }
    }
    public function setVoiceFee() {
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

        $data = [
            'voice_fee'=> $sentData['voice_fee'],
            'user_id' => $userData->user_id,
            'token' => $userData->token,
        ];


        if (empty($data['voice_fee'])) {
            $res = [
                'status'=> false,
                'message'=> 'field must not be empty',
                ];
                print_r(json_encode($res));
                exit;
        }
        if (($data['voice_fee']) < 0.1) {
            $res = [
                'status'=> false,
                'message'=> 'fee must be above 0.1 sol',
                ];
                print_r(json_encode($res));
                exit;
        }


        if ($this->scheduleModel->setVoiceFee($data)) {
            $res = [
                'status'=> true,
                'message'=> 'Voice fee set successfully',
                ];
                print_r(json_encode($res));
                exit;
        }else {
            $res = [
                'status'=> false,
                'message'=> 'failed to set voice fee',
                ];
                print_r(json_encode($res));
                exit;
        }
    }
    
    
    public function getSchedulledCalls() {
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
         $id = $userData->user_id;
         
         $list = $this->scheduleModel->getSchedulledCalls($id);

        if ($list) {
            $res = [
                'status'=> true,
                'message'=> 'success',
                'data' => $list
                ];
                print_r(json_encode($res));
                exit;
        }else {
            $res = [
                'status'=> false,
                'data' => []
                ];
                print_r(json_encode($res));
                exit;
        }
    }
    
    
    public function getSchedulledDetails() {
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
            $call_log_id = $sentData['call_id'];
            // $call_token_by_uid = $sentData['token_by_uid'];
         $id = $userData->user_id;
         
         $list = $this->scheduleModel->getSchedulledDetails($call_log_id, $id);
        if ($list) {
            $res = [
                'status'=> true,
                'message'=> 'success',
                'data' => $list
                ];
                print_r(json_encode($res));
                exit;
        }else {
            $res = [
                'status'=> true,
                'message'=> [],
                ];
                print_r(json_encode($res));
                exit;
        }
    }
    
    
    public function setVideoFee() {
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

        $data = [
            'video_fee'=> $sentData['video_fee'],
            'user_id' => $userData->user_id,
            'token' => $userData->token,
        ];


        if (empty($data['video_fee'])) {
            $res = [
                'status'=> false,
                'message'=> 'field must not be empty',
                ];
                print_r(json_encode($res));
                exit;
        }

        if (($data['video_fee']) < 0.1) {
            $res = [
                'status'=> false,
                'message'=> 'fee must be more than 0.1 sol',
                ];
                print_r(json_encode($res));
                exit;
        }


        if ($this->scheduleModel->setVideoFee($data)) {
            $res = [
                'status'=> true,
                'message'=> 'Video fee set successfully',
                ];
                print_r(json_encode($res));
                exit;
        }else {
            $res = [
                'status'=> false,
                'message'=> 'failed to set video call fee',
                ];
                print_r(json_encode($res));
                exit;
        }
    }
    
    
    
    public function setAvailability() {
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
            // $sentData = $this->getData();

  

        if ($this->scheduleModel->setAvailability($userData->user_id)) {
            $res = [
                'status'=> true,
                'message'=> 'availability set successfully',
                ];
                print_r(json_encode($res));
                exit;
        }else {
            $res = [
                'status'=> false,
                'message'=> 'failed to set availability',
                ];
                print_r(json_encode($res));
                exit;
        }
    }
    
    
    
    public function unSetAvailability() {
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
            // $sentData = $this->getData();

  

        if ($this->scheduleModel->unSetAvailability($userData->user_id)) {
            $res = [
                'status'=> true,
                'message'=> 'availability unset successfully',
                ];
                print_r(json_encode($res));
                exit;
        }else {
            $res = [
                'status'=> false,
                'message'=> 'failed to set availability',
                ];
                print_r(json_encode($res));
                exit;
        }
    }


   public function scheduleCall()
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
        } catch(DomainException $e) {
          $res = [
            'status' => 401,
            'message' =>  $e->getMessage(),
          ];
          print_r(json_encode($res));
          exit;
        }
        $sentData = $this->getData();

        $r_user_id = $sentData['r_user_id'];
   
        $receiverDetails = $this->userModel->getUser($r_user_id);
        
        
        // if($receiverDetails->on_schedule === 1){
        //       $res = [
        //   'status'=> false,
        //   'message'=> 'already booked try again',
        //   ];
        //   print_r(json_encode($res));
        //   exit;
        // }
        
        // if($receiverDetails->availability === 0){
        //       $res = [
        //   'status'=> false,
        //   'message'=> 'this user is unavailable for calls',
        //   ];
        //   print_r(json_encode($res));
        //   exit;
        // }
        
        $callerDetails = $this->userModel->getUser($userData->user_id);

        $data = [
          'receiver_user_id' => $r_user_id,
          'caller_user_id'=> $userData->user_id,
          'call_log_id'=> "log_".$this->generateUniqueId(),
          "call_type"=> $sentData["call_type"],
          "booked_date"=> date("d-m-y  h:i:s"),
          "from_"=> $sentData["from"],
          
        //   "to_"=> $sentData["to"],
        //   "call_duration"=> $sentData["call_duration"],
          "call_date"=> ($sentData["call_date"]),
        //   "call_price" => $sentData["call_price"],
          "receiver_name"=> $receiverDetails->fullname,
          "caller_name"=> $callerDetails->fullname,
          "caller_email" => $userData->email,
          "r_email"=> $receiverDetails->email,
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
     $appId = "994c5ec6485943e59acef3f1f12e7213";
     $appCertificate = "3bd5c77ce4d34969803a7c16725b50e0";
     $channelName = $this->generateUniqueChannelName();
     $expire = 432000;

    $uid = $this->generateUniqueUserID();
    //   $channelName = $channelName = uniqid('channel_', true); 
$token = RtcTokenBuilder2::buildTokenWithUid($appId, $appCertificate, $channelName, $uid, RtcTokenBuilder2::ROLE_PUBLISHER, $expire, $expire);

//  print_r(( 'Token with int uid: ' . $token . PHP_EOL));
//             exit;
    //   $response = $this->test_buildTokenWithUid_ROLE_PUBLISHER();
      
    //   $response = $this->generateAgoraToken($channelName, $uid, RtcTokenBuilder::RolePublisher, 432000);
      
    //   $res2 = json_decode($response);
      $data['app_id'] = $appId;
      $data['channel_name'] = $channelName;
      $data['uid'] = $uid;
    //   $data['role'] = $res2->role;
      $data['token_with_uid'] = $token;
    //   $data['token_with_user_account'] = $res2->tokenWithUserAccount;
      $data['token_expires_in'] = $expire;


       if($this->emailer($data) && $this->emailer2($data))
       {

        if ($this->scheduleModel->insertCallLog($data)) {
         $res = [
          'status'=> true,
          'message'=> 'call schedule successful',
          'data' => $data
          ];
          print_r(json_encode($res));
          exit;
        }else {
          $res = [
            'status'=> false,
            'message'=> 'failed to log call info',
            ];
            print_r(json_encode($res));
            exit;
        }
       
   }else {
       $res = [
           'status'=> false,
           'message'=> 'failed to send email',
           ];
           print_r(json_encode($res));
           exit;
       }



      
    }
    
    
    
    
    
    
    
    
    
    

    
}