import React from 'react';
import CreateAccount from '../Authtication/Signup/CreateAccount'
import AddProfile from '../Authtication/Signup/AddProfile'
import Login from '../Authtication/Login/Login';
import {Routes, Route} from 'react-router-dom'
import Forgotpwd from '../Authtication/Login/Forgotpwd';
import ResetPwd from '../Authtication/Login/ResetPwd'
import ActivateAc from '../Authtication/Signup/ActivateAc';
import SecurityQuestin from '../Authtication/Signup/SecurityQuestin';
import PaymentDetails from '../Authtication/Signup/PaymentDetails';
import Membership from '../Authtication/Signup/Membership';
import PasswordRecovry from '../Authtication/Signup/PasswordRecovry';
import EmailRecovery from '../Authtication/Login/EmailRecovery';




export default function Auth() {
    return (
        <>  
      
            <Routes>
                <Route path="/createAccount" element={<CreateAccount />}></Route>
                <Route path="/addProfile" element={<AddProfile/>}></Route>
                <Route path="/activateac" element={<ActivateAc/>}></Route>
                <Route path="/securityquestion" element={<SecurityQuestin/>}></Route>
                <Route path="/paymentdetails" element={<PaymentDetails/>}></Route>
                <Route path="/membership" element={<Membership/>}></Route>
                <Route path="/password_r_ques" element={<PasswordRecovry/>}></Route>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/forgotpwd" element={<Forgotpwd/>}></Route>
                <Route path="/resetpassword" element={<ResetPwd/>}></Route>
                <Route path="/emailrecovery" element={<EmailRecovery/>}></Route>
            </Routes>
        </>
    )
}





