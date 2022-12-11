import Axios from 'axios'

export const login = async (email, password) => {
   const input = {
      email,
      password,
   };
   const { data } = await Axios.post(
      'http://localhost:8080/login',
      input
   );
   return data;
};

export const register = async (firstName, lastName, email, phonenumber, password) => {
   const input = {
      firstName,
      lastName,
      email,
      phonenumber,
      password,
      
   };
   const { data } = await Axios.post(
      'http://localhost:8080/signup',
      input
   );
   return data;
};