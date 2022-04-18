import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { filterCategoryThunk, filterProductNameThunk, getCategoriesThunk, getProductsThunk } from '../redux/actions';

const Home = () => {
    const dispatch=useDispatch();
    const products= useSelector(state=>state.products);
    const categories= useSelector(state=>state.categories);

    const [productName, setProductName]= useState("");

    useEffect(()=>{
        dispatch(getProductsThunk());
        dispatch(getCategoriesThunk());
        

    },[dispatch])


    const searchProducts=e=>{
        e.preventDefault();
        console.log(productName);
        dispatch(filterProductNameThunk(productName));
    }

    return (
        <div>
            <h1>Home</h1>
            <form onSubmit={searchProducts}>
                <input type="text" placeholder='Search product for headline' value={productName} onChange={e=>setProductName(e.target.value)}/>
                <button>Search</button>
            </form>

            {
                categories.map(category=>(
                    <button key={category.id} onClick={()=>dispatch(filterCategoryThunk(category.id))}>{category.name}</button>
                ))
            }



            <ul>
                {
                    products.length===0 ? (
                        <p>We didn't found the product with those filters</p>
                    ):(
                    products.map((product)=>(
                      <Link to={`/product/${product.id}`}key={product.id}>  
                      <li> 
                           <h3> {product.title}</h3>
                            <img src={product.productImgs[0]} alt="" />
                        </li>
                      </Link>
                        
                        )))
                }
                
            </ul>
        </div>
    );
};

export default Home;