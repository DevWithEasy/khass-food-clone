const accountVeification=(userEmail,code )=>{
    return {
        from : process.env.EMAIL,
        to : userEmail,
        subject : 'Account verification code',
        html : `<div>
        Email verification code is <b>${code}</b>
        <br/>
        Code will be expire 6 hours later
        </div>`
    }
}

const verifySuccessfully=(userEmail)=>{
    return {
        from : process.env.EMAIL,
        to : userEmail,
        subject : 'Verification successfully verified',
        html : `<div>Account verified successfully</div>`
    }
}

const ForgetPassword=(userEmail, token, code)=>{
    return {
        from : process.env.EMAIL,
        to : userEmail,
        subject : 'Forget account password',
        html : `<div>
        Reset your password <a href='http://localhost:3000/forget/${token}/${code}' target='_blank'>Click here</a>
        </div>`
    }
}

const successfullResetPassword=(userEmail)=>{
    return {
        from : process.env.EMAIL,
        to : userEmail,
        subject : 'Successfully password reset',
        html : `<div>
        Successfully password change.please login with new password.
        </div>`
    }
}

module.exports = {accountVeification,verifySuccessfully,ForgetPassword,successfullResetPassword}