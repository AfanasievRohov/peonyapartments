import './App.css'
import TestComponent from './components/TestComponent';
import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getProfile } from './features/profile/profileSlice';

function App() {
  const { profile, isLoading } = useSelector(state => state.profile);
  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(getProfile())
  }, []);

  if (isLoading === true) {
    return <h1>Loading...</h1>
  }

  return (
    <>
      <TestComponent />
    </>
  )
}

export default App
