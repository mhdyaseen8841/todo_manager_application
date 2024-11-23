import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar';
import Projects from './Pages/Projects';
import Todo from './Pages/Todo';
import SignUp from './Pages/Signup';
import Login from './Pages/Login';

import { useState } from 'react';
import NotFound from './Pages/NotFound';
import BreadcrumbNavigation from './Components/BreadCrumpNavigation';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [toDos, setTodos] = useState([]);
  const [toDo, setTodo] = useState('');

  return (
    <div className="app">
      <Router>
        <Navbar />
        <ToastContainer
            autoClose={2000}
            position='top-right'
          />
      <BreadcrumbNavigation />
        <Routes>
          <Route path='/' element={<Projects />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/todo/:id' element={<Todo />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
