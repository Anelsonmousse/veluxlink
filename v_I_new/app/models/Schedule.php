<?php




Class Schedule 
{
    private $db;


    public function __construct(){
        $this->db = new Database();
    }


    public function setScheduleFee($data)
    {
        $this->db->query('UPDATE  userprofile SET schedule_fee = :schedule_fee WHERE user_id= :user_id ');
        $this->db->bind(':schedule_fee', $data['schedule_fee']);
        $this->db->bind(':user_id', $data['user_id']);
        // Execute
        if ($this->db->execute()) {
            return true;
        } else {
            return false;
        }
    }
    public function setVoiceFee($data)
    {
        $this->db->query('UPDATE  userprofile SET voice_charge = :voice_charge WHERE user_id= :user_id ');
        $this->db->bind(':voice_charge', $data['voice_fee']);
        $this->db->bind(':user_id', $data['user_id']);
        // Execute
        if ($this->db->execute()) {
            return true;
        } else {
            return false;
        }
    }
    public function setVideoFee($data)
    {
        $this->db->query('UPDATE  userprofile SET video_charge = :video_charge WHERE user_id= :user_id ');
        $this->db->bind(':video_charge', $data['video_fee']);
        $this->db->bind(':user_id', $data['user_id']);
        // Execute
        if ($this->db->execute()) {
            return true;
        } else {
            return false;
        }
    }
    public function setAvailability($user_id)
    {
        $cal = 1;
        $this->db->query('UPDATE  userprofile SET availability = :availability WHERE user_id= :user_id ');
        $this->db->bind(':availability', $cal);
        $this->db->bind(':user_id', $user_id);
        // Execute
        if ($this->db->execute()) {
            return true;
        } else {
            return false;
        }
    }
    public function unSetAvailability($user_id)
    {
        $cal = 0;
        $this->db->query('UPDATE  userprofile SET availability = :availability WHERE user_id= :user_id ');
        $this->db->bind(':availability', $cal);
        $this->db->bind(':user_id', $user_id);
        // Execute
        if ($this->db->execute()) {
            return true;
        } else {
            return false;
        }
    }
    
     public function getSchedulledCalls($id)
    {
        $this->db->query("SELECT * FROM calls_logs WHERE  caller_user_id = :user_id OR receiver_user_id = :user_id");

        // Bind Values
        $this->db->bind(':user_id', $id);

        $row1 = $this->db->resultSet();

        // Check roow
       
         if ($this->db->rowCount() > 0) {
             return $row1;
        } else {
          
            return false;
        }
    
    }
    
     public function getSchedulledDetails($id1, $id2)
    {
        $this->db->query("SELECT * FROM calls_logs WHERE  call_log_id = :call_log_id AND receiver_user_id = :receiver_user_id OR caller_user_id = :caller_user_id");

        // Bind Values
        $this->db->bind(':call_log_id', $id1);
        $this->db->bind(':caller_user_id', $id2);
        $this->db->bind(':receiver_user_id', $id2);

        $row1 = $this->db->resultSet();

        // Check roow
       
         if ($this->db->rowCount() > 0) {
             return $row1;
        } else {
          
            return false;
        }
    
    }
 
    public function insertCallLog($data)
{
    $value = 1;
    // Prepare the SQL query
    $this->db->query('INSERT INTO calls_logs (
            receiver_user_id,
            caller_user_id,
            call_log_id,
            call_type,
            booked_date,
            from_,
            to_,
            call_duration,
            call_date,
            call_price,
            receiver_name,
            caller_name,
            caller_email,
            r_email,
            app_id,
            channel_name,
            uid,
        
            token_with_uid,
            
            token_expires_in
            
        ) VALUES (
            :receiver_user_id,
            :caller_user_id,
            :call_log_id,
            :call_type,
            :booked_date,
            :from_,
            :to_,
            :call_duration,
            :call_date,
            :call_price,
            :receiver_name,
            :caller_name,
            :caller_email,
            :r_email,
            :app_id,
            :channel_name,
            :uid,
            
            :token_with_uid,
            
            :token_expires_in
        )
    ');

    // Bind the data to the query
    $this->db->bind(':receiver_user_id', $data['receiver_user_id']);
    $this->db->bind(':caller_user_id', $data['caller_user_id']);
    $this->db->bind(':call_log_id', $data['call_log_id']);
    $this->db->bind(':call_type', $data['call_type']);
    $this->db->bind(':booked_date', $data['booked_date']);
    $this->db->bind(':from_', $data['from_']);
    $this->db->bind(':to_', "");
    $this->db->bind(':call_duration', "");
    $this->db->bind(':call_date', $data['call_date']);
    $this->db->bind(':call_price', "");
    $this->db->bind(':receiver_name', $data['receiver_name']);
    $this->db->bind(':caller_name', $data['caller_name']);
    $this->db->bind(':caller_email', $data['caller_email']);
    $this->db->bind(':r_email', $data['r_email']);
    $this->db->bind(':app_id', $data['app_id']);
    $this->db->bind(':channel_name', $data['channel_name']);
    $this->db->bind(':uid', $data['uid']);
    // $this->db->bind(':role', $data['role']);
    $this->db->bind(':token_with_uid', $data['token_with_uid']);
    // $this->db->bind(':token_with_user_account', $data['token_with_user_account']);
    $this->db->bind(':token_expires_in', $data['token_expires_in']);


    // Execute the query
    if ($this->db->execute()) {
          $this->db->query('UPDATE userprofile SET on_schedule = :on_schedule WHERE user_id = :user_id');
            $this->db->bind(':user_id', $data['receiver_user_id']);
    $this->db->bind(':on_schedule', $value);
    
    if($this->db->execute()){
          return true;
    }else{
        return false;
    }
      
    } else {
        return false;
    }
}


}