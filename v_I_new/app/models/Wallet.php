<?php
class Wallet
{
    private $db;

    public function __construct()
    {
        $this->db = new Database;
    }
    
    
    public function getWalletInfoById($id)
    {
         $this->db->query("SELECT * FROM walletInfo WHERE  user_id = :user_id");

        // Bind Values
        $this->db->bind(':user_id', $id);

        // $row1 = $this->db->single();

        // Check roow
       
     
        $row = $this->db->single();
    //   print_r(json_encode($row));exit;
        
        if($this->db->rowCount() > 0){
            return $row;
        } else{
            return false;
        
        
        
        }
    }
    public function setAndGetWalletInfoById($id, $key)
    {
             
         $this->db->query("INSERT INRO walletInfo SET user_id = :user_id, userPublicKey = :userPublicKey, balance = :balance");

        // Bind Values
        $this->db->bind(':user_id', $id);
        $this->db->bind(':userPublicKey', $key);
        $this->db->bind(':balance', 0);
        
        $this->db->execute();
        
         $this->db->query("SELECT * FROM walletInfo WHERE  user_id = :user_id");

        // Bind Values
        $this->db->bind(':user_id', $id);

        // $row1 = $this->db->single();

        // Check roow
       
     
        $row = $this->db->single();
    //   print_r(json_encode($row));exit;
        
        if($this->db->rowCount() > 0){
            return $row;
        } else{
            return false;
        
        
        
        }
    }
    public function makeDeposit($id, $amount, $key, $time, $tr_id)
    {
             
         $this->db->query("INSERT INTO transaction_log SET receiver_id = :receiver_id, receiver_key = :receiver_key, amount = :amount, time = :time, tr_type = :tr_type, tr_id = :tr_id");

        // Bind Values
        $this->db->bind(':receiver_id', $id);
    
        $this->db->bind(':receiver_key', $key);
        $this->db->bind(':amount', $amount);
        $this->db->bind(':time', $time);
        $this->db->bind(':tr_type', 'Deposite');
        $this->db->bind(':tr_id', $tr_id);
        
       if($this->db->execute()) {
           
                $this->db->query("SELECT * FROM walletInfo WHERE  user_id = :user_id");

        // Bind Values
        $this->db->bind(':user_id', $id);
        $row = $this->db->single(); 
    

        if($this->db->rowCount() > 0){
             $balance = $amount  + $row->balance;
             $this->db->query("UPDATE walletInfo SET balance = :balance WHERE user_id = :user_id AND userPublicKey = :userPublicKey ");

        // Bind Values
        $this->db->bind(':user_id', $id); 
        $this->db->bind(':userPublicKey', $key);
        $this->db->bind(':balance', $balance);
         
       if($this->db->execute()) {
           return true;
       }else{
           return false;
       }
        } else{
            $balance = $amount  + $row->balance;
         $this->db->query("INSERT INTO walletInfo SET user_id = :user_id, userPublicKey = :userPublicKey, balance = :balance");

        // Bind Values
        $this->db->bind(':user_id', $id);
        $this->db->bind(':userPublicKey', $key);
        $this->db->bind(':balance',$balance );
        
          
       if($this->db->execute()) {
           return true;
       }else{
           return false;
       }
        
        
        }
       }
        
        
        
        
        
 
    }

}