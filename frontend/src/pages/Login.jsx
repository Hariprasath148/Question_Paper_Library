import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import "../style/login.css"
import gnc_logo from "../assets/images/login/gnc.png"
import gnc_banner from "../assets/images/login/main-backdrop.png"

export const Login = () => {
  return (
    <>
      <div className="login-main-container w-100 vh-100 d-flex align-items-center">
        <div className="login-form-container d-flex justify-content-center align-items-start flex-column vh-100 p-4 w-25">
          <div className='d-flex justify-content-center align-items-center w-100'>
            <img id='clg-logo' src={gnc_logo} alt="" />
          </div>
          <div className="header h2 mb-4 text-center">Log in to your account</div>
          <form action="" className='w-100'>
            <div className="mb-3 form-group">
              <label htmlFor="staffID" className='mb-2'>Enter your staffID :</label>
              <input type="text" className="form-control mb-2" id="staffId" aria-describedby="staffhelp"/>
              <div id='staffhelp' className='form-text'>Example : 234231235412</div>
            </div>
            <div className="mb-2 form-group">
              <label htmlFor="staffpassword" className='mb-2'>Enter your password :</label>
              <input type="text" className="form-control" id="staffpassword" aria-describedby="staffhelp"/>
            </div>
            <div className='error-text mb-3 form-text text-decoration-underline text-danger'>invalid password</div>
            <div className='form-group'>
              <button type='submit' id='login-btn' className='btn text-center w-25'>Login</button>
            </div>
          </form>
        </div>
        <div className='login-banner w-75 h-100'>
          <img id='' className='w-100 h-100'  src={gnc_banner} alt="" />
        </div>
      </div>
    </>
  )
};
