const paytm = require('paytm-nodejs')

const baseUrl = 'https://elated-lovelace-401e9a.netlify.app/';

const config = {
    MID : 'bPdqef86135815495874', // Get this from Paytm console
    KEY : 'P4h0OGPNnNit1E4C', // Get this from Paytm console
    ENV : 'dev', // 'dev' for development, 'prod' for production
    CHANNEL_ID : 'WAP',
    INDUSTRY : 'Retail',  
    WEBSITE : 'Default',
    CALLBACK_URL : `${baseUrl}/paytm/webhook`,  // webhook url for verifying payment
}
 
// Webhook controller function
exports.webhook = function(req,res){ 
    res.write('<html>');
    res.write('<head>');
    res.write('<title>Success Page</title>');
    res.write(`<script>    function myFunction() {     window.location.href=${baseUrl};    }    </script>`)
    res.write('</head>');
    res.write('<body onload="myFunction()">');
    res.write('<br><br><br><br><div style="text-align:center"><h1>Payment Succesful!</h1>')
    res.write('<h3><a href="/mybookings">Go to bookings</a></h3></div>')
    res.write('</body>');
    res.write('</html>');
    
    paytm.validate(config,req.body,function(err,data){
        console.log('in  paytm validate')
        if(err){
            // handle err
        }
        if(data){
            if(data.status == 'verified'){
                // mark payment done in your db
                console.log(data)
            }
        }
    })
 
}