import { useContext } from 'react';
import { AuthContext } from './AuthProvider';
import { Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) return <h1 className='text-5xl'>Loading...</h1>

    if (!user?.email) {
        toast.error("Authentication is required to access the page");

        return <Navigate to='/login'></Navigate>
    }

    return children;
};

export default PrivateRoute;