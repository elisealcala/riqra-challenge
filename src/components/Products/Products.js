import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const BackgroundContainer = styled.div`
  background-color: #e7e7e7;
  display: flex;
  height: 100vh;
  justify-content: space-between;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  width: 60%;
  margin: 0 auto;
`;

const SearchBox = styled.input`
  background: white;
  border-radius: 2px;
  border: 1px solid #c0c0c0;
  padding: 10px 20px;
  font-size: 16px;
  width: 300px;
`

const Products = () => {
  const [search, setSearch] = useState('');

  const handleSearch = e => setSearch(e.target.value);

  useEffect(() => {
    fetch('http://localhost:4000/api/products', {
        method: 'post',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify({
          name: 'Yogurt', image: 'sadasd', price: '23', brand: 'laive'
        }),
      })
        .then(function(result) {
          alert(result);
        })
        .catch(function(error) {
          console.log('Request failed', error);
        });
  })

  return (
    <BackgroundContainer>
      <Container>
        <SearchBox value={search} onChange={handleSearch} placeholder="Search products" />
      </Container>
    </BackgroundContainer>
  )
}

export default Products;