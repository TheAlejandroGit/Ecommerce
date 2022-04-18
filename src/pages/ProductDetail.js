import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addCartThunk, getProductsThunk } from '../redux/actions';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Shop = () => {
    const {id}= useParams();
    const dispatch= useDispatch();
    const products= useSelector(state=>state.products);
    useEffect(()=>dispatch(getProductsThunk()),[dispatch]);

    const[productsFiltered, setProductsFiltered]= useState([]);
    const[quantity, setQuantity]=useState(0);


   
    const productFound= products.find(product=>product.id===Number(id));
    // console.log(productFound);

    const addCart=()=>{
        const product=({
            
                "id": id,
                "quantity": quantity

        })

        dispatch(addCartThunk(product));

    }

    useEffect(()=>{
        if (productFound) {
            axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products?category=${productFound?.category.id}`)
            .then(res=>setProductsFiltered(res.data?.data?.products)) 
        }
 
    },[productFound]);

    // console.log(productsFiltered);

   
    return (
        <div>

            <div className="cart">
                <div className="container">
                    <label htmlFor="quantity"> Quantity</label>
                    <input type="text" id='quantity' value={quantity} onChange={e=>setQuantity(e.target.value)}/>
                    <button onClick={addCart}>Add Cart</button>

                </div>

            </div>

            <h1>{productFound?.title}</h1>
            <img src={productFound?.productImgs} alt="" />

            <ul>
                {
                    productsFiltered.map(product=>(
                        <Link to={`/product/${product.id}`}key={product.id}>  
                        <li> 
                             <h3> {product.title}</h3>
                              <img src={product.productImgs[0]} alt="" />
                          </li>
                        </Link>
                    ))
                }
            </ul>
        </div>
    );
};

export default Shop;