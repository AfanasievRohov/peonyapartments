import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '../../features/profile/profileSlice';
import { Navigate } from 'react-router-dom';

function Authentication({ children }) {
    const dispatch = useDispatch();
    let { profile, isLoading } = useSelector(state => state.profile);

    useEffect(()=> {
        isLoading = true;
        dispatch(getProfile())
    }, []);

    if (isLoading === true) {
        return <h1>Loading...</h1>
    }

    if (!profile) {
        return <Navigate replace to={'/'} />
    }

    return children;
}

export default Authentication
