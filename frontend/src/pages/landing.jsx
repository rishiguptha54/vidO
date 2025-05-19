import React from 'react'
import "../App.css"
import { Link } from 'react-router-dom'

export default function LandingPage() {
  return (
    <div className='landingPageContainer'>

      <nav className="navBar">
        <div className='navHeader'>
          <h2 className="logoText">vidO</h2>
        </div>
        <div className='navlist'>
          <p>Join as Guest</p>
          <p>Register</p>
          <div role="button" className="loginBtn">
            <p>Login</p>
          </div>
        </div>
      </nav>

      <div className="landingMainContainer">
        <div className="textContainer">
          <h1>
            Stay Close, No Matter the Miles
          </h1>
          <p className="subtext">
            Experience seamless video calls with vidO — bridging hearts effortlessly.
          </p>

          <div role="button" className="getStartedBtn">
            <Link to={"/auth"}>Get Started</Link>
          </div>
        </div>
        <div className="imageContainer">
          <img src="/phone.png" alt="Mobile" />
        </div>
      </div>

      <footer>
        <p className="sizzlingQuote">
          "Grow together, stay connected — just like the endless green and flowing waters."
        </p>
      </footer>
    </div>
  )
}
