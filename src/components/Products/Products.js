import React, { useState, useEffect } from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';
import CartEmptyIcon from '../../ui/CartEmptyIcon';
import TruckIcon from '../../ui/TruckIcon';
import PlusIcon from '../../ui/PlusIcon';

const BackgroundContainer = styled.div`
  background-color: #e7e7e7;
  display: flex;
  height: 100vh;
  justify-content: space-between;
  align-items: center;
`;

const MainContainer = styled.div`
  margin: 0 auto;
  width: 70%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const SearchBox = styled.input`
  background: white;
  border-radius: 2px;
  border: 1px solid #c0c0c0;
  padding: 10px 20px;
  font-size: 16px;
  width: 360px;
  box-sizing: border-box;
`;

const Cart = styled.div`
  background: #fff;
  display: flex;
  width: 360px;
  margin-top: 20px;
  border-radius: 4px;
  flex-direction: column;
  min-height: 480px;
`;

const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  padding: 50px 10px;
  & h3, p {
    margin: 10px 0 10px 0;
  }
`

const ProductBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  border-bottom: 1px solid #cecece;
`;

const AddProductBox = styled.div`
  background: #FF8000;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ShippingBox = styled.div`
  background: #fff;
  padding: 16px;
  width: 360px;
`;

const FlexItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  p {
    margin: 10px 0;
  }
`;

const Button = styled.button`
  width: 100%;
  margin-top: 20px;
  font-size: 20px;
  padding: 14px;
  background: #FF8000;
  color: #fff;
  ${({ disabled }) => disabled && `
    opacity: 0.5;
    color: #a9a8a8;
    border: 1px solid #a9a8a8;
    background: transparent;
  `}
`;

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
  const shippingDay = "04/04/04";
  const productPrice = 20.00;
  const { loading, error, data } = useQuery(PRODUCTS_QUERY);
  const handleSearch = e => setSearch(e.target.value);

  useEffect(() => {
    if (search === '') {
      setResults([]);
    }
    if (data && data.products && search !== '') {
      setResults(data.products.filter(c => c.name.includes(search)));
    }
  }, [search])

  return (
    <BackgroundContainer>
      <MainContainer>
        <Container>
          <SearchBox value={search} onChange={handleSearch} placeholder="Search products" />
          <Cart>
            {results.length === 0 ? (
              <EmptyContainer>
                <CartEmptyIcon color="#333" />
                <h3>Your cart is empty</h3>
                <p>Seems like you haven't chosen what to buy</p>
              </EmptyContainer>
            ) : (
              results.map(c => (
                <ProductBox>
                  <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 16 }}>
                    <p>{c.name}</p>
                    <p style={{ color: 'red' }}>{`$${c.price}`}</p>
                  </div>
                  <AddProductBox>
                    <PlusIcon />
                  </AddProductBox>
                </ProductBox>
              ))
            )}
          </Cart>
        </Container>
        <Container>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <TruckIcon />
            <p style={{ marginLeft: 5 }}>{`Buy now and get it by ${shippingDay}`}</p>
          </div>
          <ShippingBox>
            <FlexItem>
              <p>Products</p>
              <p>{`$${productPrice}`}</p>
            </FlexItem>
            <FlexItem style={{ background: '#FFE200' }}>
              <p>Shipping Cost</p>
              <p>{`$${productPrice}`}</p>
            </FlexItem>
            <FlexItem>
              <p>Taxes</p>
              <p>{`$${productPrice}`}</p>
            </FlexItem>
            <FlexItem style={{ marginTop: 10 }}>
              <p>Total</p>
              <p style={{ color: 'red' }}>{`$${productPrice}`}</p>
            </FlexItem>
          </ShippingBox>
          <Button disabled>
            Complete Order
          </Button>
        </Container>
      </MainContainer>
    </BackgroundContainer>
  )
}

export default Products;