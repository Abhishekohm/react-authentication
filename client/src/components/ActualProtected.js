import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation, Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";


const ActualProtected = ({ token }) => {
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    const logout = useLogout();
    let onceClick = false;

    const getPrivateData = async () => {
        try {
            const { data = undefined } = await axiosPrivate.get('/private')
            console.log(data);
            if (onceClick === false) {
                alert("Check console")
                onceClick = true
            }
        } catch (e) {
            console.log(JSON.stringify(e));
            navigate('/login', { state: { from: location }, replace: true });
            logout();
        }
    }
    return (
        <div className='w-100 h-100 d-flex flex-column justify-content-center align-items-center backgound-image-login'>
            <h1>
                Private Data
            </h1>
            <div>
                <button onClick={() => {
                    getPrivateData()
                }}>
                    Get Private Data
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

export default ActualProtected
