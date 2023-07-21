const config = require("../config/config");

module.exports.SIGNUPOTP = ({name,otp})=>{

    const str = `
    <body style="margin:50px 0 0 0; padding:0; background:#fafafa;">
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
	
	
	<div style="margin:0 auto; max-width:600px; font-family: 'Poppins', sans-serif; border:solid 1px #f0f0f0; border-top:solid 10px #eb3022; background:#FFFFFF;">
		<div style="text-align:center; padding:25px;"><img src="${config.hostname.dev}/images/logo.jpg"></div>
		<h2 style="text-align: center; font: normal normal 600 18px/27px Poppins; letter-spacing: 0px; color: #EB3022; padding:0 35px;">Hey there,</h2>
		<div style="text-align: center; font-size:14px; line-height:23px; letter-spacing: 0px; color: #383F45; font-family: 'Poppins', sans-serif; padding:0 35px 15px 35px;">
				We’ve got some buzz-worthy news for you. Someone just tried to join the BuzzDealz hive using your email address. If that someone was you (which we hope it was), then you’re in luck! You’re about to join the hive of the sweetest deals in Dubai and the Middle East.
<br/><br/>
To confirm that it was indeed you, just enter this secret code in the app:
<br/><br/>
<div style="text-align:center;">
<div style="display:inline-block; padding:18px 40px; background:#f0f0f0; border-radius:15px;">
<div style="display: flex; align-items: center; justify-content: center;">
<span style="font-size:20px; font-weight:700; color:#000000; margin-right:10px">${otp}</span>
</div>
</div>
</div>
<br/>
And if it wasn’t you, then <a href="#" style="color:#eb3022; text-decoration:none;">click here to report it.</a>
<br/><br/>
Now, we know what you’re thinking: “Why do I need to enter a code? Can’t I just sign up?” Well, the code is like our way of giving you a secret handshake. It lets us know that you’re a true honeybee, and that you’re ready to start buzzing with joy.
<br/><br/>
So go ahead and enter that code, <strong>${name[0].toUpperCase()+name.substr(1)}</strong>. We can’t wait to welcome you to the BuzzDealz hive!
<br/><br/>
Best regards,
<br/>
<h3 style="text-align: center; font: normal normal 600 18px/27px Poppins; letter-spacing: 0px; color: #000000;">The BuzzDealz Team</h3>
		</div>
		
		<div style="background:url(${config.hostname.dev}/images/footer-bg.jpg) top center no-repeat; background-size:cover; padding:35px 35px; text-align:center;">
			<div style="text-align:center; margin-bottom:25px;"><img src="${config.hostname.dev}/images/footer-logo.png"></div>
			<div style="text-align:center; margin-bottom:25px;"><img src="${config.hostname.dev}/images/footer-card.png"></div>
			<ul style="margin:0 0 20px 0; padding:0; list-style:none; text-align:center;">
                <li style="margin:0 8px 0 0; padding:0; list-style:none; display:inline-block; font-size:13px; line-height:22px;">
                <a href="https://www.facebook.com/buzzzdealz" style="color:#000000; text-decoration:none; display:flex; align-items: end;"><img src="${config.hostname.dev}/images/facebook.png" style="margin-right:7px;"> <span>facebook</span></a>
                </li>
                <li style="margin:0 8px 0 0; padding:0; list-style:none; display:inline-block; font-size:13px; line-height:22px;">
                    <a href="https://www.instagram.com/buzzdealzhive/" style="color:#000000; text-decoration:none; display:flex; align-items: end;"><img src="${config.hostname.dev}/images/instagram.png" style="margin-right:7px;"> <span>instagram</span></a>
                </li>
                
                <li style="margin:0 8px 0 0; padding:0; list-style:none; display:inline-block; font-size:13px; line-height:22px;">
                    <a href="https://twitter.com/BuzzDealzHive" style="color:#000000; text-decoration:none; display:flex; align-items: end;"><img src="${config.hostname.dev}/images/twitter.png" style="margin-right:7px;"> <span>twitter</span></a>
                </li>
			</ul>
			<div style="text-align:center; font-size:14px; color:#000000;">BuzzDealz. &copy; 2023 | All rights reserved</div>
		</div>
	</div>
  

</body>
    `;

    return str;

}


module.exports.FOTP = ({otp})=>{

    const str=`<body style="margin:50px 0 0 0; padding:0; background:#fafafa;">
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
	
	
	<div style="margin:0 auto; max-width:600px; font-family: 'Poppins', sans-serif; border:solid 1px #f0f0f0; border-top:solid 10px #eb3022; background:#FFFFFF;">
		<div style="text-align:center; padding:25px;"><img src="${config.hostname.dev}/images/logo.jpg"></div>
		<h2 style="text-align: center; font: normal normal 600 18px/27px Poppins; letter-spacing: 0px; color: #EB3022; padding:0 35px;">Hey there,</h2>
		<div style="text-align: center; font-size:14px; line-height:23px; letter-spacing: 0px; color: #383F45; font-family: 'Poppins', sans-serif; padding:0 35px 15px 35px;">
				Someone just tried to reset their password on your BuzzDealz account using your email address. If that someone was you (which we hope it was), then you’re in luck!
<br/><br/>
To confirm that it was indeed you, just enter this secret code in the app:
<br/><br/>
<div style="text-align:center;">
<div style="display:inline-block; padding:18px 40px; background:#f0f0f0; border-radius:15px;">
<div style="display: flex; align-items: center; justify-content: center;">
<span style="font-size:20px; font-weight:700; color:#000000; margin-right:10px" id="valholder">${otp}</span>
</div>
</div>
</div>
<br/>
And if it wasn’t you, then <a href="#" style="color:#eb3022; text-decoration:none;">click here to report it.</a>
<br/><br/>
Best regards,
<br/>
<h3 style="text-align: center; font: normal normal 600 18px/27px Poppins; letter-spacing: 0px; color: #000000;">The BuzzDealz Team</h3>
		</div>
		
		<div style="background:url(${config.hostname.dev}/images/footer-bg.jpg) top center no-repeat; background-size:cover; padding:35px 35px; text-align:center;">
			<div style="text-align:center; margin-bottom:25px;"><img src="${config.hostname.dev}/images/footer-logo.png"></div>
			<div style="text-align:center; margin-bottom:25px;"><img src="${config.hostname.dev}/images/footer-card.png"></div>
			<ul style="margin:0 0 20px 0; padding:0; list-style:none; text-align:center;">
				<li style="margin:0 8px 0 0; padding:0; list-style:none; display:inline-block; font-size:13px; line-height:22px;">
					<a href="https://www.facebook.com/buzzzdealz" style="color:#000000; text-decoration:none; display:flex; align-items: end;"><img src="${config.hostname.dev}/images/facebook.png" style="margin-right:7px;"> <span>facebook</span></a>
				</li>
				<li style="margin:0 8px 0 0; padding:0; list-style:none; display:inline-block; font-size:13px; line-height:22px;">
					<a href="https://www.instagram.com/buzzdealzhive/" style="color:#000000; text-decoration:none; display:flex; align-items: end;"><img src="${config.hostname.dev}/images/instagram.png" style="margin-right:7px;"> <span>instagram</span></a>
				</li>
				
				<li style="margin:0 8px 0 0; padding:0; list-style:none; display:inline-block; font-size:13px; line-height:22px;">
					<a href="https://twitter.com/BuzzDealzHive" style="color:#000000; text-decoration:none; display:flex; align-items: end;"><img src="${config.hostname.dev}/images/twitter.png" style="margin-right:7px;"> <span>twitter</span></a>
				</li>
				
			</ul>
			<div style="text-align:center; font-size:14px; color:#000000;">BuzzDealz. &copy; 2023 | All rights reserved</div>
		</div>
	</div>
  <script>
    function copy(){
        const val = document.getElementById('valholder').innerHTML;
        navigator.clipboard.writeText(val);
    }
  </script>

    </body>`;

return str;

}

module.exports.WELCOME = ({name})=>{
    const str=`<body style="margin:50px 0 0 0; padding:0; background:#fafafa;">
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
	
	
	<div style="margin:0 auto; max-width:600px; font-family: 'Poppins', sans-serif; border:solid 1px #f0f0f0; border-top:solid 10px #eb3022; background:#FFFFFF;">
		<div style="text-align:center; padding:25px;"><img src="${config.hostname.dev}/images/logo.jpg"></div>
		<h2 style="text-align: center; font: normal normal 600 18px/27px Poppins; letter-spacing: 0px; color: #EB3022; padding:0 35px;">Dear ${name[0].toUpperCase()+name.substr(1)},</h2>
		<div style="text-align: center; font-size:14px; line-height:23px; letter-spacing: 0px; color: #383F45; font-family: 'Poppins', sans-serif; padding:0 35px 15px 35px;">
			Congratulations, you’ve joined the hive of the best deals in Dubai and the Middle East! We’re BuzzDealz, and we’re excited to have you buzzing with joy over the amazing deals we offer. If you’re anything like us, you’re always on the lookout for the best experiences and deals, and we’re here to help make that a reality.
<br /><br />
We know you’re itching to get started, so let us give you the lowdown on how to start saving like a queen bee:<br />
<h3 style="text-align: center; font: normal normal 600 18px/27px Poppins; letter-spacing: 0px; color: #000000;">Step 1: Browse Our Deals</h3>
Our deals range from the sweetest spa treatments to the most thrilling adventures and more. To start browsing, just head to our website and scroll through the hive of deals. We promise you’ll find something that’ll make you buzz with joy.
<br />
<h3 style="text-align: center; font: normal normal 600 18px/27px Poppins; letter-spacing: 0px; color: #000000;">Step 2: Buy Your Favorite Deals</h3>
Once you’ve found something that’s got you buzzing, hit that “Buy Now” button and complete your purchase. You’ll then receive an email confirmation with all the details you need.
<br />
<h3 style="text-align: center; font: normal normal 600 18px/27px Poppins; letter-spacing: 0px; color: #000000;">Step 3: Get Buzzing!</h3>

Now that you’ve bought your deal, it’s time to redeem it and start buzzing with excitement. Follow the instructions on your voucher, and you’ll be on your way to a sweet experience in no time.
<br /><br />
But wait, there’s more! As a member of the BuzzDealz hive, you’ll also receive exclusive offers and discounts. Just keep an eye on your inbox, and you’ll never miss a sweet deal.
<br /><br />
We’re thrilled to have you on board, <strong>${name[0].toUpperCase()+name.substr(1)}</strong>, and we can’t wait to see you buzzing with joy over the amazing deals we offer. Don’t worry, we won’t sting you with high prices - we’re all about spreading the buzz about the best deals in town.
<br /><br />
Cheers to sweet savings!
<h3 style="text-align: center; font: normal normal 600 18px/27px Poppins; letter-spacing: 0px; color: #000000;">!The BuzzDealz Team</h3>
		</div>
		
		<div style="background:url(${config.hostname.dev}/images/footer-bg.jpg) top center no-repeat; background-size:cover; padding:35px 35px; text-align:center;">
			<div style="text-align:center; margin-bottom:25px;"><img src="${config.hostname.dev}/images/footer-logo.png"></div>
			<div style="text-align:center; margin-bottom:25px;"><img src="${config.hostname.dev}/images/footer-card.png"></div>
			<ul style="margin:0 0 20px 0; padding:0; list-style:none; text-align:center;">
				
                <li style="margin:0 8px 0 0; padding:0; list-style:none; display:inline-block; font-size:13px; line-height:22px;">
                    <a href="https://www.facebook.com/buzzzdealz" style="color:#000000; text-decoration:none; display:flex; align-items: end;"><img src="${config.hostname.dev}/images/facebook.png" style="margin-right:7px;"> <span>facebook</span></a>
                </li>
                <li style="margin:0 8px 0 0; padding:0; list-style:none; display:inline-block; font-size:13px; line-height:22px;">
                    <a href="https://www.instagram.com/buzzdealzhive/" style="color:#000000; text-decoration:none; display:flex; align-items: end;"><img src="${config.hostname.dev}/images/instagram.png" style="margin-right:7px;"> <span>instagram</span></a>
                </li>
                
                <li style="margin:0 8px 0 0; padding:0; list-style:none; display:inline-block; font-size:13px; line-height:22px;">
                    <a href="https://twitter.com/BuzzDealzHive" style="color:#000000; text-decoration:none; display:flex; align-items: end;"><img src="${config.hostname.dev}/images/twitter.png" style="margin-right:7px;"> <span>twitter</span></a>
                </li>
			</ul>
			<div style="text-align:center; font-size:14px; color:#000000;">BuzzDealz. &copy; 2023 | All rights reserved</div>
		</div>
	</div>
  

</body>`;
return str;
}

