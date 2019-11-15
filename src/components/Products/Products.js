import React, { useState, useEffect } from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
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
  flex-direction: column;
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
`;

const Cart = styled.div`
  background: #fff;
  display: flex;
  width: 300px;
  margin-top: 20px;
  flex-direction: column;
`;

const ProductBox = styled.div`
  display: flex;
  align-items: center
`

const PRODUCTS_QUERY = gql`
  query {
    products {
      brand
      name
      image
      price
    }
  }
`

const Products = () => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const { loading, error, data } = useQuery(PRODUCTS_QUERY);
  const handleSearch = e => setSearch(e.target.value);

  useEffect(() => {
    if (search === '') {
      setResults([]);
    }
    if (data && data.products) {
      setResults(data.products.filter(c => c.name.includes(search)));
    }
  }, [search])

  return (
    <BackgroundContainer>
      <Container>
        <SearchBox value={search} onChange={handleSearch} placeholder="Search products" />
        <Cart>
          {results.length === 0 ? (
            <span>
              carro vacío.
            </span>
          ) : (
              results.map(c => (
                <span>{c.name}</span>
              ))
          )}
        </Cart>
      </Container>
    </BackgroundContainer>
  )
}

export default Products;