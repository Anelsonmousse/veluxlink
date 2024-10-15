<?php 

  // Load headers
  //require_once 'helpers/headers.php';


require_once 'helpers/headers.php';

//Load Config

require_once 'config/config.php';

  // Load helper
  require_once 'helpers/url_helper.php';
  require_once 'helpers/src/AccessToken.php';
  require_once 'helpers/src/AccessToken2.php';
  require_once 'helpers/src/ApaasTokenBuilder.php';
  require_once 'helpers/src/ChatTokenBuilder2.php';
//   require_once 'helpers/src/DynamicKey4.php';

   require_once 'helpers/solana-php-sdk/vendor/autoload.php';



  require_once 'helpers/src/DynamicKey5.php';
  require_once 'helpers/src/EducationTokenBuilder.php';
  require_once 'helpers/src/FpaTokenBuilder.php';
  require_once 'helpers/src/RtcTokenBuilder.php';
  require_once 'helpers/src/RtcTokenBuilder2.php';
  require_once 'helpers/src/RtmTokenBuilder.php';
  require_once 'helpers/src/RtmTokenBuilder2.php';
  require_once 'helpers/src/SignalingToken.php';
  require_once 'helpers/src/Util.php';
  require_once 'helpers/phpMailer/PHPMailerAutoload.php';


 
//Autoload Core Libraries
spl_autoload_register(function($className){
    require_once 'libraries/' . $className . '.php';
});
// spl_autoload_register(function($className){
//     require_once 'helpers/src' . $className . '.php';
// });
// spl_autoload_register(function($className){
//     require_once 'helpers/phpMailer' . $className . '.php';
// });

//require_once '../vendor/autoload.php';


 