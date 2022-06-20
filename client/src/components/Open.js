import React from 'react'
import { Link } from 'react-router-dom'

const Open = () => {
    return (
        <div className='w-100 h-100 d-flex justify-content-center align-items-center backgound-image-login'>
            <div className="w-25 d-flex p-2 justify-content-around col-example">
                <Link to="/home" style={{
                    fontSize: "1.5em",
                }} >
                    Home
                </Link>
                <Link to={{ pathname: "/register" }} style={{
                    fontSize: "1.5em",
                }}  >
                    Register
                </Link>
                <Link to={{ pathname: "/login" }} style={{
                    fontSize: "1.5em",
                }}  >
                    Login
                </Link>
            </div>
        </div>
    )
}

export default Open