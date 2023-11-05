import React, { useRef, useState } from "react";
import { useLoginMutation, useRegisterMutation } from "../store/api/authApi";
import { useDispatch } from "react-redux";
import {login} from '../store/api/reducer/authSlice'
import { useLocation, useNavigate } from "react-router-dom";

const AuthForm = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);

const [regFn,{error:regError}]=useRegisterMutation()
const [loginFn, {error:loginError}] = useLoginMutation()

  const usernameInp = useRef();
  const pwsInp = useRef();
  const emailInp=useRef()

const dispatch = useDispatch()

const navigate = useNavigate()
const location = useLocation()
const from = location.state?.preLocation?.pathname || '/';
// console.log(from)
  const submitHandler = (e) => {
    e.preventDefault();
    const username = usernameInp.current.value;
    const password = pwsInp.current.value;

    if(isLoginForm){
      loginFn({
        identifier:username,
        password
      }).then(res=>{
        // console.log(res)
        if(!res.error){
         //login successfully 
         dispatch(login({
          token:res.data.jwt,
          user:res.data.user
         }))
         navigate(from,{replace:true})
        }
      })
    }else{
      const email = emailInp.current.value;
      regFn({
        username,
        password,
        email
      }).then(res=>{
        // console.log(res)
        if(!res.error){
          setIsLoginForm(true)
        }
      })
    }
  };

  return (
    <div>
      <p style ={{color:'red'}}>
        {regError && 'Username or email is repeated!'}
        {loginError && 'Username or email is incorrect!'}

      </p>
      <h2>{isLoginForm ? "Sign In Your Account" : "Registration"}</h2>
      <form onSubmit={submitHandler}>
        <div>
          <input ref={usernameInp} type="text" placeholder="User Name" />
        </div>
        {
          !isLoginForm && 
          <div>
            <input ref={emailInp} type="email" placeholder="Email"/>
          </div>
        }
        <div>
          <input ref={pwsInp} type="password" placeholder="Passwords" />
        </div>
        <div>
          <button>
            {isLoginForm ? "Sign In" : "Registration"}
          </button>
          <a
            href="/#"
            onClick={(event) => {
              event.preventDefault();
              setIsLoginForm((prevState) => !prevState);
            }}
          >
            {isLoginForm
              ? "Need an account?Sign Up"
              : "Already have an account?Sign In"}
          </a>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
