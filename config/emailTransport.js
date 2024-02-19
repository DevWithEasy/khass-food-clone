const nodemailer =require ('nodemailer');

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: 'devwitheasy@gmail.com',
        pass: 'foxx hbdm wzis vwcu'
    }
})

module.exports = transporter