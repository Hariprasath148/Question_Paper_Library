import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import "../style/login.css"

export const Login = () => {
  return (
    <>
      <div className="login-main-container w-100 vh-100 d-flex justify-content-center align-items-center">
        <div className="login-form-container rounded p-3">
          <div className="header mb-3 text-center">Login</div>
          <form action="">
            <div className="mb-3">
              <input type="text" className="form-control" id="staffId" aria-describedby="staffhelp" placeholder='Enter your StaffID'/>
              <div id='staffhelp' className='form-text'>Example : 234231235412</div>
            </div>
            <div className="mb-3">
              <input type="text" className="form-control" id="staffId" aria-describedby="staffhelp" placeholder='Enter your Password'/>
            </div>
            <div className='error-text mb-3'>invalid password</div>
            <div className='d-flex justify-content-center align-items-center'>
              <button type='submit' className='btn btn-primary text-center'>Submit</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
};
