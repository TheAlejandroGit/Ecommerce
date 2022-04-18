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
            <div className='search'>
                <form onSubmit={searchProducts}>
                    <input type="text" placeholder='Search product for headline' value={productName} onChange={e=>setProductName(e.target.value)}/>
                    <button>Search</button>
                </form>
            </div>

            <main>

                <div className='categories'>

                    {
                        categories.map(category=>(
                            <button key={category.id} onClick={()=>dispatch(filterCategoryThunk(category.id))}>{category.name}</button>
                        ))
                    }
                </div>

                <div className='products'>
                    <ul>
                        {
                            products.length===0 ? (
                                <p>We didn't found the product with those filters</p>
                            ):(
                            products.map((product)=>(
                            <Link to={`/product/${product.id}`}key={product.id}>  
                            <li> 
                                <div className='image'>
                                    <img src={product.productImgs[0]} alt="" />
                                    <h3> {product.title}</h3>
                                </div>
                            </li>
                            </Link>
                                
                                )))
                        }
                        
                    </ul>
                </div>
            </main>

        </div>
    );
};

export default Home;