import React, { useState } from 'react';
import "../styles/navbar.css";
import { useDispatch } from 'react-redux';
import { getCartThunk, loginThunk } from '../redux/actions';
import Cart from './Cart';
import { useNavigate } from 'react-router-dom';


const NavBar = () => {
    const navigate= useNavigate();
    const [isLoginOpen, setIsLoginOpen]= useState(false);
    const [isCartOpen, setIsCartOpen]=useState(false);
    const[email,setEmail]= useState("");
    const[password, setPassword]=useState("");

    const [loginError, setLoginError]=useState("");
    const dispatch= useDispatch();

    const openCart=()=>{
        setIsCartOpen(!isCartOpen);
        dispatch(getCartThunk());

    }

    const login=e=>{
        e.preventDefault()
        const credentials={email,password}
        dispatch(loginThunk(credentials))
        .then(res=>{
            localStorage.setItem("token",res.data.data.token)
            setLoginError("")
            setIsLoginOpen(false)
        })
        .catch(error=>{
            setLoginError(error.response.data.message)
        })
    }

   
    return (
        <div className='navbar'>
            <nav>
                <div onClick={()=>navigate("/")}><strong>e-commerce</strong></div>
                <button onClick={()=> setIsLoginOpen(!isLoginOpen)}><i class="fa-solid fa-user"></i></button>
                <button><i class="fa-solid fa-box-archive"></i></button>
                <button onClick={openCart}><i class="fa-solid fa-cart-shopping"></i></button>
            </nav>  
              
                <form onSubmit={login} className={`login ${isLoginOpen? "open": ""}`}>
                    {
                    localStorage.getItem("token")  ? (
                    <button onClick={()=>localStorage.setItem("token","")} type="button" className='it lo' >
                        Log out
                    </button>
                    ):(
                    <div className='lg'>
                        <div className="it">
                            <h3>Test Data</h3>
                            <p> <i class="fa-solid fa-envelope"></i> john@gmail.com</p>
                            <p> <i class="fa-solid fa-lock"></i> john1234</p>

                        </div>
                        <input type="email" value={email} onChange={e=> setEmail(e.target.value)} placeholder='email' className='it'/>
                        <input type="password" value={password} onChange={e=> setPassword(e.target.value)} placeholder='password' className='it'/>
                        <button>Login</button>
                        <p>{loginError}</p>  
                   </div> 
                 )
                 }
                </form>
                <Cart isOpen={isCartOpen}/>
            
        </div>
    );
};

export default NavBar;