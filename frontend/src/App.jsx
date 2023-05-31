import './App.css'
import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getProfile } from './features/profile/profileSlice';

import DashboardMain from './components/dashboard/DashboardMain';
import MainPage from './components/mainPage/MainPage';
import { Navigate } from 'react-router-dom';

function App() {
  const dispatch = useDispatch();
  const { profile, isLoading } = useSelector(state => state.profile);

  useEffect(()=> {
    dispatch(getProfile())
  }, []);

  if (isLoading === true) {
    return <h1>Loading...</h1>
  }

  if (!profile) {
    return <MainPage />
  }

  return (
    <Navigate replace to={'/dashboard'} />
  )
}

export default App
