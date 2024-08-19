import React from 'react';
import styled from 'styled-components';

const LoaderContainer = styled.div`
  margin: 20px 0;
  text-align: center;
`;

const Loader: React.FC = () => (
  <LoaderContainer>
    <div>Loading...</div>
  </LoaderContainer>
);

export default Loader;
