import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TestComponent from './components/TestComponent';
import Login from './components/Login';
import { useGlobalContext } from './components/AppContext';

function App() {
  const {user} = useGlobalContext();

  if(!user) {
    return <Login />
  }

  return (
    <>
    <TestComponent />
    </>
  )
}

export default App
