import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addCartThunk, getProductsThunk } from '../redux/actions';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../styles/detail.css"

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
        <>
        <div className='container'>

                <div className='pFound'>
                    <div>
                         <img src={productFound?.productImgs} alt="" />
                    </div>

                    
                        
                <div className="pInfo">
                    <h1 className='it'>{productFound?.title}</h1>
                    <p className='it'>{productFound?.description}</p>
                    
                    <div className='number it'>
                        <p><b>Price:</b> {productFound?.price}</p>
                        <label htmlFor="quantity">  <b>Quantity: </b> </label>
                        <input type="text" id='quantity' value={quantity} onChange={e=>setQuantity(e.target.value)}/>
                    </div>
                    <button onClick={addCart}>Add to cart <i class="fa-solid fa-cart-shopping" className='it'></i></button>

                </div>

                    

                    
                    
                </div>

                <div className='similar'>
                        <h3>Discover similar items</h3>
                        <ul>
                            {
                                productsFiltered.map(product=>(
                                    <Link to={`/product/${product.id}`}key={product.id}>  
                                    <li> 
                                        <div className='image'>
                                            <img src={product.productImgs[0]} alt="" className='it' />
                                            <h3 className='it'> {product.title}</h3>
                                            <p className='it'><b>Price: </b> ${product.price}</p>
                                            
                                        </div>
                                    </li>
                                    </Link>
                                ))
                            }
                        </ul>
                </div>
                
                
        </div>
        <footer></footer>
        </>
    );
};

export default Shop;