import React from 'react';
import ChatContainer from './components/ChatContainer';
import GlobalStyle from './styles/globalStyles';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <ChatContainer />
    </>
  );
};

export default App;
