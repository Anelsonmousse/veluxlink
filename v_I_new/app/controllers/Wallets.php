<?php

Class Wallets extends Controller 
{
      protected $serverKey;
    protected $userModel;
    protected $walletModel;
   
    public function __construct()
    {
        //  $this->scheduleModel = $this->model("Schedule");
         $this->userModel = $this->model('User');
    
    $this->serverKey  = 'secret_server_key' . date("H");
    $this->walletModel = $this->model('Wallet');
    }
    
    
    public function getSolBalance()
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
            //  
            $walletinfo = $this->walletModel->getWalletInfoById($userData->user_id);
           
            $url = "https://node-api-j9tc.onrender.com/api/getUserBalance";
            $data = [
                'userPubkeyx' => $walletinfo->userPublicKey,
                'programID' => PROGRAM_ID
                ];
            
            $postRes = $this->makePostRequest($url,$data);
            
            if(!$postRes){
                $res = json_encode([
                        'status' => true,
                        'message' => []
                    ]);
                    print_r($res);
            }
            
            $object =  json_decode($postRes);
            
            if($object->userBalance == $walletinfo->balance){
                $res = json_encode(['status'=>true,'balance'=>$object->userBalance]);
                print_r(($res));
            }
            
            
            // return;
            
    }
    public function getSolBalancewithData($key)
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
            //  
            $walletinfo = $this->walletModel->getWalletInfoById($userData->user_id);
            
            if(!$walletinfo){
                 $walletinfo = $this->walletModel->setAndGetWalletInfoById($userData->user_id, $key);
            }
           
            $url = "https://node-api-j9tc.onrender.com/api/getUserBalance";
            $data = [
                'userPubkeyx' => $key,
                'programID' => PROGRAM_ID
                ];
            
            $postRes = $this->makePostRequest($url,$data);
            
            if(!$postRes){
                $res = [
                        'status' => false,
                        'message' => 'failed to get balance'
                    ];
                    print_r($res);
            }
            
            $object =  json_decode($postRes);
            
            if($object->userBalance == $walletinfo->balance){
                return false;
            }
            if($object->userBalance >= $walletinfo->balance){
                return true;
            }
            
            
           
            
    }
    
       public function depositSol()
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

        $amount = $sentData['amount'];
        $public = $sentData['public_key'];
        $time = $sentData['time'];
        
        if(empty($amount) || empty($public) || empty($time)){
            $res = json_encode([
                'status' => false,
                'message' => 'an empty parameter'
                ]);
                print_r($res);
                
        }
   
    
        $check = $this->getSolBalancewithData($public);
        
        // if($check === false){
        //         $res = json_encode([
        //         'status' => false,
        //         'message' => 'failed transaction'
        //         ]);
        //         print_r($res);
        //         exit;
        // }
        if(isset($check->status) && $check->status === false){
                $res = json_encode([
                'status' => false,
                'message' => 'failed to get balance'
                ]);
                print_r($res);
                exit;
        }
        
        $tr_id = $this->generateUniqueId();
      
        if ($this->walletModel->makeDeposit($userData->user_id, $amount, $public, $time, $tr_id)) {
         $res = [
          'status'=> true,
          'message'=> 'Deposite successful',
          ];
          print_r(json_encode($res));
          exit;
        }else {
          $res = [
            'status'=> false,
            'message'=> 'failed to log deposite',
            ];
            print_r(json_encode($res));
            exit;
        }
       



      
    }

}
