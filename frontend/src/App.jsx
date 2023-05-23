import './App.css'
import TestComponent from './components/TestComponent';
import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getProfile } from './features/profile/profileSlice';
import MainPage from './components/mainPage/MainPage';
import Login from './components/authorization/Login'
import SignUpTest from './components/authorization/SignUpTest'

function App() {
  const dispatch = useDispatch();
  const { profile, isLoading } = useSelector(state => state.profile);
  const {page} = useSelector((state) => state.pages);

  useEffect(()=> {
    dispatch(getProfile())
  }, []);

  if (isLoading === true) {
    return <h1>Loading...</h1>
  }

  if (page === 'login') {
    return <Login />
  } else if (page === 'signup') {
    return <SignUpTest />
  } else if (!profile || page === 'main') {
    return <MainPage />
  }

  return (
    <>
      <TestComponent />
    </>
  )
}

export default App
