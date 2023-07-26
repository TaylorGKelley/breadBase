import React, { useEffect, useState } from 'react';

import './styles.css';
import { fetchData } from '../../utils/fetchData';

const API_URL = 'http://localhost:5000/api/v1/products';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(fetchData(API_URL));
  }, []);

  console.log(fetchData(API_URL));

  return <div>Products</div>;
};

export default Products;
