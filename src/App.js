
import { memo } from 'react';
import './App.css';
import SignUpForm from './component/sign-up';
import SignInForm from './component/sign-in'
import './component/style.scss'
import { BrowserRouter, Route, Routes, } from 'react-router-dom';
import CurdApp from './CurdPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SignInForm />} />
          <Route path='/sign-up' element={<SignUpForm />} />
          <Route path='/user-list' element={<CurdApp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default memo(App);
