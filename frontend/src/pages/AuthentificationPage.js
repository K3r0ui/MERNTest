import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { message } from 'antd';
import SigninForm from '../components/Auth/SigninForm';
import { register,login,reset } from '../services/auth.service';
import RegisterForm from '../components/Auth/RegisterForm';
import ResetPasswordForm from '../components/Auth/ResetPasswordForm';
const AuthentificationPage = () => {
   const navigate = useNavigate();
   const [values, setValues] = useState({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phonenumber: '',
   });

   const [resetState,setResetState] = useState(false)
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
 const handleResetChange = (email) => (e) => {
    console.log(e.target.value);
    setValues({ ...values, [email]: e.target.value });
 };
  
 const handleResetSubmit = async (e) => {
    e.preventDefault();
    try {
       const res = await reset(email);
       console.log(res)
       message.success('Password sent to mail');
    } catch (err) {
       console.error(err.message);
       message.error('reset failed!');
    }
 };
   
   return (
    
      <>
      {resetState && <> <ResetPasswordForm handleResetChange={handleResetChange} handleResetSubmit={handleResetSubmit}  /></>}
      {!resetState && authState ? <>
      <button>
      <Link onClick={()=>{setAuthState(false);setResetState(false)}} to="/auth">login now!</Link></button>
      <RegisterForm setResetState={setResetState} handleRegisterSubmit={handleRegisterSubmit} handleRegisterChange={handleRegisterChange} /> </>:
      <>{!resetState &&       <><button>
        <Link onClick={()=>{setAuthState(true);setResetState(false)}} to="/auth">register now!</Link></button>
        <SigninForm  setResetState={setResetState} handleLoginSubmit={handleLoginSubmit} handleLoginChange={handleLoginChange} />
        </> } </> 
}
       
      </>
      
   );
   
};

export default AuthentificationPage;
