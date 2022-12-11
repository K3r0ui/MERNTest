import axios from 'axios';
import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { message } from 'antd';
import SigninForm from '../components/Auth/SigninForm';
import { register,login } from '../services/auth.service';
import RegisterForm from '../components/Auth/RegisterForm';
const AuthentificationPage = () => {
   const navigate = useNavigate();
   const [values, setValues] = useState({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phonenumber: '',
   });
   const [authState,setAuthState] = useState(true)
   const { firstName, lastName, email, phonenumber,  password} = values;

   const handleRegisterChange = (firstName) => (e) => {
      setValues({ ...values, [firstName]: e.target.value });
   };

   const handleRegisterSubmit = async (e) => {
      e.preventDefault();
      try {
         const src = await register(firstName,lastName,email,phonenumber,password);
         console.log(password)
         console.log(src)
         setAuthState(false)
         message.success('Sign up succesffully , Please Login Now');

         navigate('/auth');
      } catch (err) {
         console.error(err.message);
         message.error('register failed!');
      }
   };
   const handleLoginChange = (email) => (e) => {
    console.log(e.target.value);
    setValues({ ...values, [email]: e.target.value });
 };
  
 const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
       const res = await login(email, password);
       message.success('Log In successfully');
       localStorage.setItem('token', res.token);
       setValues({
          email: '',
          password: '',
       });
        return window.location = '/';
    } catch (err) {
       console.error(err.message);
       message.error('login failed!');
    }
 };
   
   return (
    
      <>
      {authState ? <>
      <button>
      <Link onClick={()=>{setAuthState(false)}} to="/auth">login now!</Link></button>
      <RegisterForm  handleRegisterSubmit={handleRegisterSubmit} handleRegisterChange={handleRegisterChange} /> </>: 
      <><button>
      <Link onClick={()=>{setAuthState(true)}} to="/auth">register now!</Link></button>
      <SigninForm  handleLoginSubmit={handleLoginSubmit} handleLoginChange={handleLoginChange} />
      </>}
      
      </>
   );
   
};

export default AuthentificationPage;
