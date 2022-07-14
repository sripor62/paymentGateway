const express= require('express')

const Insta= require('instamojo-nodejs')

const bodyParser=require('body-parser')

const API_KEY="test_b2489001e1bb6915d42bc9684b7"
const AUTH_KEY="test_7dcfdcb5ce62a04c5d224277b8a"

Insta.setKeys(API_KEY,AUTH_KEY)

Insta.isSandboxMode(true)

const app= express()

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


const PORT = process.env.PORT || 3000

app.get('/',(req,res) => {
    res.sendFile(__dirname + "/index.html")

})

app.post('/pay',(req,res) => {

var name=req.body.name
var email=req.body.email
var amount=req.body.amount
console.log(name)
console.log(email)
console.log(amount)

var data = new Insta.PaymentData();

const REDIRECT_URL = "http://localhost:3000/success";

data.setRedirectUrl(REDIRECT_URL);
data.send_email = "True";
data.purpose = "Order"; // REQUIRED

data.amount=amount
data.name=name
data.email=email

Insta.createPayment(data, function (error, response) {
    if (error) {
      // some error
    } else {
      // Payment redirection link at response.payment_request.longurl
      console.log(response)
      res.send("<h1>Please check your email to make payment</h1>")
    }
  });
});


app.get('./success',(req,res) => {
    res.send("Payment was successfull. Please check your email for invoice")
})

app.listen(PORT,() => {
    console.log(`App is listening on ${PORT}`)
})