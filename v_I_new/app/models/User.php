<?php
class User
{
    private $db;

    public function __construct()
    {
        $this->db = new Database;
    }


    public function findLoginByToken($token)
    {
        $this->db->query('SELECT * FROM initkey WHERE token= :token');
        $this->db->bind(':token', $token);

        $row = $this->db->single();
    
        
        if($this->db->rowCount() > 0){
            return $row;
        } else{
            return false;
        
        
        
        }


    }


    


    public function loginUser($email)
    {
        $this->db->query('SELECT * FROM initkey  WHERE email= :email');
        $this->db->bind(':email', $email);

        $row = $this->db->single();
       
        //return $row;
        if($this->db->rowCount() > 0){
            return $row;
        } else {
          
           return false;
       
        
        }


    }





    //Find user by email
    public function findUserByEmail_det($email)
    {
        $this->db->query("SELECT * FROM initkey WHERE  email = :email");

        // Bind Values
        $this->db->bind(':email', $email);

        $row = $this->db->single();

        if($this->db->rowCount() > 0){
        return $row;
        }else{
            
            return false;
        }
    
    }
    public function findUserByEmail_det2($email)
    {
        $this->db->query("SELECT * FROM userprofile WHERE  email = :email");

        // Bind Values
        $this->db->bind(':email', $email);

        $row = $this->db->single();

        if($this->db->rowCount() > 0){
        return $row;
        }else{
            
            return false;
        }
    
    }


public function findUserByEmail($email)
{
    $this->db->query("SELECT * FROM initkey WHERE email = :email AND activationx = 1");

    // Bind Values
    $this->db->bind(':email', $email);

    $row = $this->db->single();

    // Check row
    if ($this->db->rowCount() > 0) {
        return true;
    } else {
        return false;
    }
}

public function findUserByUname($email)
{
    $this->db->query("SELECT * FROM initkey WHERE uname = :uname");

    // Bind Values
    $this->db->bind(':uname', $email);

    $row = $this->db->single();

    // Check row
    if ($this->db->rowCount() > 0) {
        return true;
    } else {
        return false;
    }
}

public function findUserByEmail1($email)
{
    $this->db->query("SELECT * FROM initkey WHERE email = :email");

    // Bind Values
    $this->db->bind(':email', $email);

    $row = $this->db->single();

    // Check row
    if ($this->db->rowCount() > 0) {
        return true;
    } else {
        return false;
    }
}
public function findHospitalByEmail2($email)
{
    $this->db->query("SELECT * FROM hospitaldetails WHERE email = :email");

    // Bind Values
    $this->db->bind(':email', $email);

    $row = $this->db->single();

    // Check row
    if ($this->db->rowCount() > 0) {
        return true;
    } else {
        return false;
    }
}

 


    //Get user by Id
    public function getUserByid($id)
    {
        $this->db->query("SELECT * FROM initkey WHERE  user_id = :user_id");

        // Bind Values
        $this->db->bind(':user_id', $id);

        $row1 = $this->db->single();

        // Check roow
       
         if ($this->db->rowCount() > 0) {
             return $row1;
        } else {
          
            return false;
        }
    
    }
 
    public function getUser($id)
    {
        $this->db->query("SELECT * FROM userprofile WHERE  user_id = :user_id");

        // Bind Values
        $this->db->bind(':user_id', $id);

        $row1 = $this->db->single();

        // Check roow
       
         if ($this->db->rowCount() > 0) {
             return $row1;
        } else {
          
            return false;
        }
    
    }
    public function findUserByUsername($id)
    {
        $this->db->query("SELECT * FROM userprofile WHERE  uname = :uname");

        // Bind Values
        $this->db->bind(':uname', $id);

        $row1 = $this->db->single();

        // Check roow
       
         if ($this->db->rowCount() > 0) {
             return $row1;
        } else {
          
            return false;
        }
    
    }
    public function getAllusers()
    {
        $this->db->query("SELECT * FROM userprofile");

        // Bind Values
        // $this->db->bind(':uname', $id);

        $row1 = $this->db->resultSet();

        // Check roow
       
         if ($this->db->rowCount() > 0) {
             return $row1;
        } else {
          
            return false;
        }
    
    }

//     public function verifyUser_id_token($dataToken)
//     {

//         //echo "removed"; exit;
//         $this->db->query('SELECT * FROM  initkey WHERE token = :token and user_id = :user_id');
//         $this->db->bind(':user_id', $dataToken->user_id);
//         $this->db->bind(':token', $dataToken->appToken);

//         $row = $this->db->single();

//         // Check$row = roow
// //print_r($dataToken);
//         if ($this->db->rowCount() > 0) {
//             return $row;
//         } else {
//             return false;
//         }
//     }

 


    //Get user by Id
    public function cookieChecker($live)
    {
        $this->db->query("SELECT * FROM initkey WHERE token = :token");

        // Bind Valuesrid
        $this->db->bind(':token', $live);

        $row = $this->db->single();

        // Check roow



        if ($this->db->rowCount() > 0) {
            return true;
        } else {

            return false;
        }

    }

    public function getUserBytoken($token)
    {
        $this->db->query("SELECT * FROM initkey WHERE token = :token");

        // Bind Values
        $this->db->bind(':token', $token);

        $row = $this->db->single();

        // Check roow
        return $row;

    }
    public function findAllUsers()
    {
        $this->db->query("SELECT * FROM initkey");

        $rows = $this->db->resultSet();

        // Check roow
        return $rows;

    }





    public function deleteToken($user_id, $token)
    {
        $token = '';
        //echo "removed"; exit;
        $this->db->query('UPDATE  initkey SET token = :token WHERE user_id= :user_id');
        $this->db->bind(':user_id', $user_id);
        $this->db->bind(':token', $token);

        // Execute
        if ($this->db->execute()) {
            return true;
        } else {
            return false;
        }
    }



    public function updateToken($user_id, $token)
    {
        $this->db->query('UPDATE  initkey SET token = :token WHERE user_id= :user_id ');
        $this->db->bind(':user_id', $user_id);
        $this->db->bind(':token', $token);
        // Execute
        if ($this->db->execute()) {
            return true;
        } else {
            return false;
        }
    }
   
    public function updateResetToken($data)
    {
        $tokenTime = 15;
        $dateTime = new DateTime();
        $currentDate = $dateTime->format('Y-m-d H:i:s');

        $this->db->query('UPDATE  initkey SET password_reset_token = :password_reset_token,password_reset_token_time = :password_reset_token_time, reset_token_set_date = :reset_token_set_date  WHERE email = :email ');
        $this->db->bind(':email', $data['email']);
        $this->db->bind(':password_reset_token', $data['otp']);
        $this->db->bind(':reset_token_set_date', $currentDate);
        $this->db->bind(':password_reset_token_time', $tokenTime);
        // Execute
        if ($this->db->execute()) {
            return true;
        } else {
            return false;
        }
    }
    public function updatePassword($data)
    {
        $tokenTime = 0;
        $dateTime = new DateTime();
        $currentDate = $dateTime->format('Y-m-d H:i:s');

        $this->db->query('UPDATE  initkey SET password_reset_token = :password_reset_token,password_reset_token_time = :password_reset_token_time, password = :password  WHERE email = :email AND user_id = :user_id ');
        $this->db->bind(':email', $data['email']);
        $this->db->bind(':user_id', $data['user_id']);
        $this->db->bind(':password_reset_token', 0);
        $this->db->bind(':password', $data['password']);
        $this->db->bind(':password_reset_token_time', $tokenTime);
        // Execute
        if ($this->db->execute()) {
            return true;
        } else {
            return false;
        }
    }
   
   
    
    public function edit_user($data) {
        $this->db->query(" UPDATE   initkey 
            SET 
                email = :email, 
                uname = :uname,  
                password = :password  WHERE  user_id = :user_id");
        $this->db->bind(":email", $data["email"]);
        $this->db->bind(":uname", $data["uname"]);
        $this->db->bind(":user_id", $data["user_id"]);
        $this->db->bind(":password", $data["password"]);

       if ($this->db->execute()) {
        $this->db->query(" UPDATE   userprofile 
        SET 
            fullname = :fullname,
            email = :email, 
            uname = :uname, 
            x_link = :x_link, 
            insta_link = :insta_link, 
            linkedin_link = :linkedin_link, 
            image = :image, 
            password = :password WHERE  user_id = :user_id");
    $this->db->bind(":email", $data["email"]);
    $this->db->bind(":uname", $data["uname"]);
    $this->db->bind(":user_id", $data["user_id"]);
    $this->db->bind(":password", $data["password"]);
    $this->db->bind(":image", $data["image"]);
    $this->db->bind(":fullname", $data["fullname"]);
    $this->db->bind(":x_link", $data["x_link"]);
    $this->db->bind(":insta_link", $data["insta_link"]);
    $this->db->bind(":linkedin_link", $data["linkedin_link"]);

        if ($this->db->execute()) {
            return true;
        }else{
            return false;
        }
       }else{
        return false;
       }
    }
    
    
    public function register_user($data) {

        $login = 1;
        $active = "VLINK_".md5(time());
        $this->db->query(" INSERT INTO  initkey 
            SET 
                email = :email, 
                uname = :uname, 
                user_id = :user_id, 
                accessStatus = :accessStatus, 
                password = :password,
                 activeCode = :activeCode, 
                loginStatus = :loginStatus");
        $this->db->bind(":email", $data["email"]);
        $this->db->bind(":uname", $data["uname"]);
        $this->db->bind(":user_id", $data["user_id"]);
        $this->db->bind(":accessStatus", $login);
        $this->db->bind(":password", $data["password"]);
        $this->db->bind(":activeCode", $active);
        $this->db->bind(":loginStatus", $login);
       if ($this->db->execute()) {
        $this->db->query(" INSERT INTO  userprofile 
        SET 
            fullname = :fullname,
            email = :email, 
            uname = :uname, 
            user_id = :user_id, 
            x_link = :x_link, 
            insta_link = :insta_link, 
            linkedin_link = :linkedin_link, 
            status = :status, 
            image = :image, 
            password = :password,
             activeCode = :activeCode");
    $this->db->bind(":email", $data["email"]);
    $this->db->bind(":uname", $data["uname"]);
    $this->db->bind(":user_id", $data["user_id"]);
    $this->db->bind(":status", $login);
    $this->db->bind(":password", $data["password"]);
    $this->db->bind(":activeCode", $active);
    $this->db->bind(":image", $data["image"]);
    $this->db->bind(":fullname", $data["fullname"]);
    $this->db->bind(":x_link", $data["x_link"]);
    $this->db->bind(":insta_link", $data["insta_link"]);
    $this->db->bind(":linkedin_link", $data["linkedin_link"]);

        if ($this->db->execute()) {
            return true;
        }else{
            return false;
        }
       }else{
        return false;
       }
    }
    


public function userPush($fcmtoken, $user)
{
    $this->db->query('UPDATE initkey SET fcmtoken = :fcmtoken WHERE user_tag = :user_tag');
    $this->db->bind(':fcmtoken', $fcmtoken);
    $this->db->bind(':user_tag', $user);

    if ($this->db->execute()) {
        return true;
    } else {
        return false;
    }
}

}