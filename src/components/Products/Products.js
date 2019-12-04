import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';
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
  max-height: 480px;
  overflow: scroll;
`;

const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  padding: 50px 10px;
  & h3,
  p {
    margin: 10px 0 10px 0;
  }
`;

const ProductBox = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  border-bottom: 1px solid #cecece;
`;

const AddProductBox = styled.div`
  background: #ff8000;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AddNumberBox = styled.div`
  background: #ff8000;
  position: absolute;
  top: 10px;
  right: 10px;
  color: #fff;
  width: 180px;
  height: 48px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  div {
    height: 48px;
    width: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
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
  background: #ff8000;
  color: #fff;
  ${({ disabled }) =>
    disabled &&
    `
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
      id
      name
      image
      price
      isInShoppingCart
      shoppingCartNumber
    }
  }
`;

const SHOPPING_CART_MUTATION = gql`
  mutation addShoppingCart($productId: Int!, $increment: Boolean) {
    addShoppingCart(params: { id: $productId, increment: $increment }) {
      success
    }
  }
`;

const DELETE_SHOPPING_CART = gql`
  mutation deleteShoppingCart($productId: Int!) {
    deleteShoppingCart(params: { id: $productId }) {
      success
    }
  }
`;

const CREATE_ORDER_MUTATION = gql`
  mutation createOrder($itemId: String!) {
    createOrder(params: { id: $itemId }) {
      success
    }
  }
`;

const Products = ({ history }) => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [productPrice, setProducPrice] = useState(0);
  const shippingDay = '04/04/04';
  const { loading, error, data } = useQuery(PRODUCTS_QUERY);
  const [addShoppingCart] = useMutation(SHOPPING_CART_MUTATION);
  const [deleteShoppingCart] = useMutation(DELETE_SHOPPING_CART);
  const [createOrder] = useMutation(CREATE_ORDER_MUTATION);

  const updatePrice = newResults => {
    const productsAdded = newResults.map(d => d.shoppingCartNumber * d.price);
    setProducPrice(
      productsAdded ? productsAdded.reduce((a, b) => a + b, 0) : 0,
    );
  };
  const handleSearch = e => {
    setSearch(e.target.value);
    setResults(data.products.filter(c => c.name.includes(search)));
  };
  const handleClick = (id, increment = true) => {
    const newResults = [
      ...results.filter(c => c.id !== id),
      {
        ...results.find(c => c.id === id),
        isInShoppingCart: true,
        shoppingCartNumber: increment
          ? results.find(c => c.id === id).shoppingCartNumber + 1
          : results.find(c => c.id === id).shoppingCartNumber - 1,
      },
    ];
    setResults(newResults);
    updatePrice(newResults);
    addShoppingCart({
      variables: {
        productId: id,
        increment,
      },
    }).then(res => console.log(res));
  };
  const deleteItem = id => {
    const newResults = [
      ...results.filter(c => c.id !== id),
      {
        ...results.find(c => c.id === id),
        shoppingCartNumber: 0,
        isInShoppingCart: false,
      },
    ];
    setResults(newResults);
    updatePrice(newResults);
    deleteShoppingCart({
      variables: {
        productId: id,
      },
    }).then(res => console.log(res));
  };

  useEffect(() => {
    if (search === '') {
      setResults(
        data && data.products
          ? data.products.filter(c => c.isInShoppingCart)
          : [],
      );
      updatePrice(results);
    }
  }, [data && data.products, results.length, search]);

  const disabled = productPrice + (productPrice / 100) * 10 < 50;

  return (
    <BackgroundContainer>
      <MainContainer>
        <Container>
          <SearchBox
            value={search}
            onChange={handleSearch}
            placeholder="Search products"
          />
          <h1>asdasdas</h1>
          <Cart>
            {results.length === 0 ? (
              <EmptyContainer>
                <CartEmptyIcon color="#333" />
                <h3>Your cart is empty</h3>
                <p>Seems like you haven't chosen what to buy</p>
              </EmptyContainer>
            ) : (
              results.map(c => (
                <>
                  <ProductBox>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        marginLeft: 16,
                      }}
                    >
                      <p>{c.name}</p>
                      <p style={{ color: 'red' }}>{`$${c.price}`}</p>
                    </div>
                    <div>
                      <AddProductBox
                        onClick={() =>
                          c.shoppingCartNumber ? null : handleClick(c.id)
                        }
                      >
                        {c.shoppingCartNumber >= 1 && c.isInShoppingCart ? (
                          <span style={{ color: '#fff' }}>
                            {c.shoppingCartNumber}
                          </span>
                        ) : (
                          <PlusIcon />
                        )}
                      </AddProductBox>
                      {c.shoppingCartNumber >= 1 && c.isInShoppingCart && (
                        <div onClick={() => deleteItem(c.id)}>
                          <span>Delete</span>
                        </div>
                      )}
                    </div>
                  </ProductBox>
                  {c.shoppingCartNumber >= 1 && c.isInShoppingCart && (
                    <ProductBox>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          marginLeft: 16,
                          opacity: 0.3,
                        }}
                      >
                        <p>{c.name}</p>
                        <p style={{ color: 'red' }}>{`$${c.price}`}</p>
                      </div>
                      <AddNumberBox>
                        <div onClick={() => handleClick(c.id, false)}>-</div>
                        <span>{c.shoppingCartNumber}</span>
                        <div onClick={() => handleClick(c.id, true)}> + </div>
                      </AddNumberBox>
                    </ProductBox>
                  )}
                </>
              ))
            )}
          </Cart>
        </Container>
        <Container>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <TruckIcon />
            <p
              style={{ marginLeft: 5 }}
            >{`Buy now and get it by ${shippingDay}`}</p>
          </div>
          <ShippingBox>
            <FlexItem>
              <p>Products</p>
              <p>{`$${parseFloat(productPrice).toFixed(2)}`}</p>
            </FlexItem>
            <FlexItem style={{ background: '#FFE200' }}>
              <p>Shipping Cost</p>
              <p>{`$${parseFloat((productPrice / 100) * 10).toFixed(2)}`}</p>
            </FlexItem>
            <FlexItem>
              <p>Taxes</p>
              <p>{`$${parseFloat((productPrice / 100) * 18).toFixed(2)}`}</p>
            </FlexItem>
            <FlexItem style={{ marginTop: 10 }}>
              <p>Total</p>
              <p style={{ color: 'red' }}>{`$${parseFloat(
                productPrice + (productPrice / 100) * 10,
              ).toFixed(2)}`}</p>
            </FlexItem>
          </ShippingBox>
          <Button
            disabled={disabled}
            onClick={() => {
              if (!disabled) {
                const currentDate = Date.now().toString();
                createOrder({
                  variables: {
                    itemId: currentDate,
                  },
                }).then(() => {
                  history.push({
                    pathname: `/thanks/${currentDate}`,
                  });
                });
              }
            }}
          >
            Complete Order
          </Button>
        </Container>
      </MainContainer>
    </BackgroundContainer>
  );
};

export default withRouter(Products);
