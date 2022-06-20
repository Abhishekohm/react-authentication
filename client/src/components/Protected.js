import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'


const Protected = ({ loggedIn, token }) => {
    const getPrivateData = async () => {
        const { data } = await axios.get('/private', {
            headers: {
                'authorization': `Bearer ${token}`
            }
        })
        console.log(data)
    }
    useEffect(() => {
        getPrivateData()
    })
    return (
        <div>
            <h1>This is protected route</h1>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
        </div>
    )
}


export default Protected
