import React from 'react'
import "../style/index.css"
import background from "../images/background.jpeg"
import {NavLink} from "react-router-dom"
import image from "../images/gnc-logo.png"
export const Home = () => {
    
    const Background={
        backgroundImage:`url(${background})`,
        backgroundSize:"cover",
        backgroundPosition:"center",
        height: '80vh'
    }


  return (
      <>
        <header>
            <div className="container-fluid px-3 py-2">
                <div className="row align-items-center">
                    <div className="col-12 col-md-8 d-flex align-items-center mb-3 mb-md-0 ">
                        <img
                          src={image}
                          alt="Guru Nanak College Logo"
                          className="img-fluid me-3"
                          style={{ maxWidth: "100px" }} 
                        />
                        <div>
                            <h1 className="h2 mb-0">Guru Nanak College</h1>
                            <h3 className="h5 mb-0">(Autonomous), Chennai</h3>
                        </div>
                    </div>
                    <div className="col-12 col-md-4 text-md-end text-center">
                        <NavLink to="/login" className="Login_button btn-primary btn-sm">
                            Teacher Login
                        </NavLink>
                    </div>
                </div>
            </div>
        </header>

        <div style={Background} className='d-flex align-items-center justify-content-center'>
            <div className="Gnc_gen p-5 d-flex flex-column align-items-center justify-content-center">
                <h2 className='Gnc_Head text-center'>GNC Question Papers</h2>
                <p className=' fs-6 text-center mt-2 py-1'>Get the last year question paper and generate your new question paper for your practice</p>
                <NavLink to="/" className="Library_button text-center d-flex align-items-center justify-content-center">Get Into Library</NavLink>
            </div>
        </div>
      </>
  )
};
