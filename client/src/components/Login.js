import React, { useState } from 'react'
import axios from "./../api/axios"
import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form"
import "../CSS/Login.css";
import useAuth from '../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const LOGIN_URL = "/auth/login"

const Login = () => {
    const { setAuth } = useAuth();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState({ status: false })
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/home"; // this is page from where we were redirected here and state will be only defined if while redirecting we set state to state={{ from: location }} 
    console.log(from)

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(username, password)
        try {
            const { data } = await axios.post(
                LOGIN_URL,
                JSON.stringify({ username, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            )
            console.log(data)
            setAuth({ user: data.user, accessToken: data.accessToken })
            setUsername("");
            setPassword("");
            navigate(from, { replace: true });
        } catch (e) {
            console.log(e.response)
            setError({ status: true, message: e?.response?.data?.error || "Server Error" })
        }
    }
    return (
        <div className='w-100 h-100 d-flex justify-content-center align-items-center backgound-image-login'>
            <div className='w-25 h-auto'>
                <div>
                    {
                        error.status === true &&
                        <p>{error.message}</p>
                    }
                </div>
                <Form className='login-form' autoComplete="off" onSubmit={handleSubmit}>
                    <Form.Group
                        className="mb-3 text-light"
                        controlId="formBasicEmail"
                    >
                        <Form.Label>Username </Form.Label>
                        <Form.Control
                            type="text"
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value)
                                setError({ status: false })
                            }} />
                    </Form.Group>

                    <Form.Group
                        className="mb-3 text-light"
                        controlId="formBasicPassword"
                    >
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value)
                                setError({ status: false })
                            }}
                        />
                    </Form.Group>
                    <Button
                        variant="primary"
                        type="submit"
                    >
                        Submit
                    </Button>
                </Form>
                <div className="d-flex p-2 justify-content-around col-example">
                    <Link to="/home" style={{
                        fontSize: "1.5em",
                    }} >
                        Home
                    </Link>
                    <Link to={{ pathname: "/register" }} state={{ from: from }} style={{
                        fontSize: "1.5em",
                    }}  >
                        Register
                    </Link>
                </div>
            </div>
        </div >
    )
}

export default Login
