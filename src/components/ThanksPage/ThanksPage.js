import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo';
import { withRouter, useParams } from 'react-router-dom';
import styled from 'styled-components';


const BackgroundContainer = styled.div`
  background-color: #e7e7e7;
  display: flex;
  text-align: center;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction:column;
`;

const ORDER_QUERY = gql`
  query orders($itemId: String) {
    order(params: {
      id: $itemId
    }) {
      items
      id
    }
  }
`;


const ThanksPage = ({ history }) => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(ORDER_QUERY, {
    variables: {
      itemId: id,
    }
  });

  return (
    <BackgroundContainer>
      <h2>Thank You</h2>
      <p>{`Your order P00${data?.order?.id} has been registered`}</p>
      <button onClick={() => history.push('/products')}>Continue shopping</button>
    </BackgroundContainer>
  )
}

export default withRouter(ThanksPage);