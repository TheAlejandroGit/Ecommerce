import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import "../styles/cart.css";
import { useNavigate } from 'react-router-dom';
import {deleteProductThunk } from '../redux/actions';

const Cart = ({isOpen}) => {
    const products=useSelector(state=>state.cart);
    const navigate= useNavigate();
    const dispatch= useDispatch();


    return (
        <div className={`cart-modal ${isOpen ? "open": ""}`}>

            <ul className='cart-list'>
            {
                products.map(product=>(
                    <li key={product.id} onClick={()=>navigate(`./product/${product.id}`)} >
                        <h3>{product.title}</h3>
                        <b>Quantity: {product?.productsInCart?.quantity}</b>
                        <button onClick={()=>dispatch(deleteProductThunk(product.productsInCart.productId))}>Delete</button>
                    </li>
                ))
            }
            </ul>
        </div>
    );
};

export default Cart;