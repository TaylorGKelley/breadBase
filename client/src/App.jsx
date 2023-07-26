import React, { useEffect } from 'react';
import axios from 'axios';

const App = () => {
  useEffect(() => {
    console.log(axios.get('http://localhost:5000/api/v1/products'));
  });

  return (
    <>
      <div>Hello</div>
    </>
  );
};

export default App;
