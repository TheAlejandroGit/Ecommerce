import React, { useState } from 'react';
import "../styles/navbar.css";
import { useDispatch } from 'react-redux';
import { getCartThunk, loginThunk } from '../redux/actions';
import Cart from './Cart';


const NavBar = () => {
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
                <strong>Product App</strong>
                <button onClick={()=> setIsLoginOpen(!isLoginOpen)}>Login</button>
                <button onClick={openCart}>Cart</button>
            </nav>  
              
                <form onSubmit={login} className={`login ${isLoginOpen? "open": ""}`}>
                    {
                    localStorage.getItem("token")  ? (
                    <button onClick={()=>localStorage.setItem("token","")} type="button"  >
                        Log out
                    </button>
                    ):(
                    <>

                    <input type="email" value={email} onChange={e=> setEmail(e.target.value)} placeholder='email' />
                    <input type="password" value={password} onChange={e=> setPassword(e.target.value)} placeholder='password' />
                    <button>Submit</button>
                 <p>{loginError}</p>  
                 </> 
                 )
                 }
                </form>
                <Cart isOpen={isCartOpen}/>
            
        </div>
    );
};

export default NavBar;