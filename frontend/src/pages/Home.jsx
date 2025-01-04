import React from 'react'
import "../style/index.css"
import {NavLink} from "react-router-dom"
export const Home = () => {
  return (
      <>
          <header>
              <div className='row d-flex justify-contend-end'>
                  <div className="col-12 col-md-9">
                      <img src="" alt="" />
                      <h1 className='Nav_header'>Guru Nanak College</h1>
                      <h3>(Autonomous) , Chennai</h3>
                  </div>
                  <div className='col-12 col-md-3 mt-5 '>
                    <NavLink to="/login" className="Login_button">Teacher Login</NavLink>
                  </div>
              </div>
          </header>
      </>
  )
};
