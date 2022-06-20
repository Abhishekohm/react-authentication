import React from 'react';
import { Link } from "react-router-dom"
import useLogout from "../hooks/useLogout";

const Home = () => {
    const logout = useLogout();
    return (
        <div className='w-100 h-100 d-flex flex-column justify-content-center align-items-center backgound-image-login'>
            <div>
                <h1 style={{
                    color: "red"
                }}>
                    Welcome to Homepage
                </h1>
            </div>
            <br />
            <div>
                <button>
                    <Link to="/protected" style={{
                        textDecoration: "none",
                        color: "black"
                    }}>
                        Protected
                    </Link>
                </button>
                <button>
                    <Link to="/login" style={{
                        textDecoration: "none",
                        color: "black"
                    }}>
                        Login
                    </Link>
                </button>
                <button onClick={logout}>
                    Logout
                </button>
            </div>
        </div>
    )
}

export default Home