<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Welcome to VeluxLink</title>
</head>
<body bgcolor="black"; style="margin: 0;background-color: black; padding: 0; font-family: 'Arial', 'Helvetica', sans-serif; color: #fff;">
    <div class="email" style="width: 100%; max-width: 600px; margin: auto; padding: 20px; box-sizing: border-box; font-size: 16px; line-height: 1.5;">

        <div class="logo">
            <img src="{IMGSRC}" alt="logo" srcset="">
        </div>

        <p style="color: purple;"> Hello <span>@{USERNAME}</span></p>
        <p>Your password reset OTP  is</p>

        <div style="display: flex; justify-content: center; align-items: center;">
    <div id="codeDiv" style="width: 90%; height: 43px; background-color: #55166b; text-align: center; font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif; align-items: center; padding-top: 20px; margin-bottom: 20px; font-size: larger;" class="signin">
        {CODE}
    </div>
    <button onclick="copyToClipboard()">Copy</button>
</div>

        <div class="msg">
            Use the code to reset your password in VELUXLINK. <br>
            VELUXLINK will never ask you to share this code with anyone. <br>
            Visit our site for more info <span style="color: #7E219E;"><a href="https://www.veluxlink.com" style="color: #7E219E;">www.veluxlink.com</a></span>
            <br>
            <br>
            <div class="refrain">
                Don't recognize this activity? <br>
                Do not share the code with anyone
            </div>
        </div>

        <div class="footer" style="margin-top: 20px; text-align: center; background-color: #3f0f50; padding: 15px;">
            <span style="font-size: 18px;">Join our community on</span> <br>
            <div class="icons" style="justify-content: center; align-items: center; padding: 15px;">
                <img src="{TWITTER}" alt="twitter" style="max-width: 30px; margin: 0 10px;">
                <img src="{LINKEDIN}" alt="linkedin" style="max-width: 30px; margin: 0 10px;">
                <img src="{INSTA}" alt="instagram" style="max-width: 30px; margin: 0 10px;">
            </div>

            <p style="font-size: 14px; font-style: italic;">21, Olaore Street, Lagos State, Nigeria.</p>
         
            
            <span style="font-size: 14px; font-style: italic;">Copyright @{DATE} Velux Group Limited. All rights reserved.</span>
        </div>
    </div>
</body>
<script>
function copyToClipboard() {
    const codeDiv = document.getElementById('codeDiv');
    const text = codeDiv.innerText;
    navigator.clipboard.writeText(text).then(() => {
        console.log('Code copied to clipboard');
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
}
</script>
</html>