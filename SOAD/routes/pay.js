const paytm = require('paytm-nodejs')
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Order = require('../Models/Order').Order;

const baseUrl = process.env.REACT_APP_BASE_URL;

const config = {
    MID : 'paXgGX93917473089891', // Get this from Paytm console
    KEY : 'J1KbAQLigbn#@01h', // Get this from Paytm console
    ENV : 'dev', // 'dev' for development, 'prod' for production
    CHANNEL_ID : 'WEB',
    INDUSTRY : 'Retail',
    WEBSITE : 'WEBSTAGING',
    CALLBACK_URL : 'http://elated-lovelace-401e9a.netlify.app/paytm/webhook',  // webhook url for verifying payment
}


router.get('/:order_id/:user_id/:total_cost', async(req, res) => {
     let data = {
         TXN_AMOUNT : req.params.total_cost, // request amount
         ORDER_ID : req.params.order_id, // any unique order id
         CUST_ID : req.params.user_id // any unique customer id
     }
     
     Order.findOne({_id: req.params.order_id}, function(err, doc){
        doc.is_paid = true
        doc.save()
     })


     console.log(data);
     // let data = {
     //     TXN_AMOUNT : 1200,
     //     ORDER_ID :"paying123",
     //     CUST_ID :  "321"
     // }

     // create Paytm Payment
     paytm.createPayment(config,data,function(err,data){
         if(err){
             // handle err
         }

         //success will return

         /*{
             MID: '###################',
             WEBSITE: 'DEFAULT',
             CHANNEL_ID: 'WAP',
             ORDER_ID: '#########',
             CUST_ID: '#########',
             TXN_AMOUNT: '##',
             CALLBACK_URL: `${baseUrl}/paytm/webhook`,
             INDUSTRY_TYPE_ID: 'Retail',
             url: 'https://securegw-stage.paytm.in/order/process',
             checksum: '####################################'
         }*/

         //store the url and checksum
         let url = data.url;
         let checksum = data.checksum;

         // delete it from data object
         delete data.url;
         delete data.checksum;

         /* Prepare HTML Form and Submit to Paytm */
         res.writeHead(200, {'Content-Type': 'text/html'});
         res.write('<html>');
         res.write('<head>');
         res.write('<title>Merchant Checkout Page</title>');
         res.write('</head>');
         res.write('<body>');
         res.write('<center><h1>Please do not refresh this page...</h1></center>');
         res.write('<form method="post" action="' + url + '" name="paytm_form">');
         for(var x in data){
             res.write('<input type="hidden" name="' + x + '" value="' + data[x] + '">');
         }
         res.write('<input type="hidden" name="CHECKSUMHASH" value="' + checksum + '">');
         res.write('</form>');
         res.write('<script type="text/javascript">');
         res.write('document.paytm_form.submit();');
         res.write('</script>');
         res.write('</body>');
         res.write('</html>');
         res.end();
     });
});

// your create payment controller function
module.exports = router;
