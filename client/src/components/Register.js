import React, { useState } from 'react'
import axios from '../api/axios'
import { useNavigate, Link, useLocation } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form"
import useAuth from "../hooks/useAuth"
const REGISTER_URL = '/auth/register'

const Register = () => {
    let navigate = useNavigate();
    const { setAuth } = useAuth()
    const location = useLocation();
    const from = location.state?.from || "/home";

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [error, setError] = useState({ status: false });
    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            const { data } = await axios.post(
                REGISTER_URL,
                JSON.stringify({ username, password, email }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            )
            console.log(data);
            setUsername('')
            setPassword('')
            setEmail('')
            setAuth(
                {
                    accessToken: data.accessToken,
                    user: data.user
                }
            )
            navigate(from)
        } catch (e) {
            console.log(e.message)
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
                        controlId="formBasicEmail"
                    >
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                                setError({ status: false })
                            }}
                        />
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
                    <Link to={{ pathname: "/login" }} state={{ from: from }} style={{
                        fontSize: "1.5em",
                    }}  >
                        Login
                    </Link>
                </div>
            </div>
        </div >
    )
}

export default Register
