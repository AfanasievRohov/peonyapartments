import './App.css'
import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getProfile } from './features/profile/profileSlice';

import TestComponent from './components/TestComponent';
import MainPage from './components/mainPage/MainPage';
import ApartmentsGrid from './components/apartments/ApartmentsGrid';

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
    <>
      <TestComponent />
      <ApartmentsGrid />
    </>
  )
}

export default App
