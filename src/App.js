import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Login from './components/User/Login';
import Register from './components/User/Register';
import Profile from './components/User/Profile';
import PublicGames from './components/Game/PublicGames';
import MyGame from './components/MyGame/MyGame';
import Footer from './Footer';
import './App.css';

const App = () => {
  return (
    <React.Fragment>
      <Navbar />
      <Routes>
        <Route path='/' element={<PublicGames />}/>
        <Route path='/mygames' element={<MyGame />}/>
        <Route path='login' element={<Login />}/>
        <Route path='register' element={<Register />}/>
        <Route path='profile' element={<Profile />}/>
      </Routes>
      <Footer />
    </React.Fragment>
  );
}

export default App;
