import useAuth from './useAuth'
import axios from "../api/axios"
import { useNavigate } from 'react-router-dom';

const useLogout = () => {
    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const logout = async () => {
        try {
            axios.get('/logout',
                {
                    withCredentials: true
                }
            );
            setAuth({});
            navigate('/login')
        } catch (e) {
            console.log(JSON.stringify(e));
        }
    }
    return logout;
}

export default useLogout