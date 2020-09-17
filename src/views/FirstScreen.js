import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import NeutralImage from '../emotions/neutral.jpg';
import SadImage from '../emotions/sad_sleep.jpg';
import { FaWifi } from 'react-icons/fa';
import { Button } from '@chakra-ui/core';
import { useHistory } from 'react-router';

export const AppWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  background-image: ${(props) => `url(${props.image})`};
  background-size: 100vw;
  color: white;
`;

export const Message = styled.div`
  margin-top: 250px;
  span {
    font-size: 1.15rem;
  }
`;

export const Action = styled.div`
  margin-top: 340px;
  position: absolute;
  right: 60px;
`;

const FirstScreen = () => {
  const [connected, setConnected] = useState(true);

  const history = useHistory();

  useEffect(() => {
    if (!window.navigator.onLine) {
      setConnected(false);
    }
    window.addEventListener('online', () => setConnected(true));
    window.addEventListener('offline', () => setConnected(false));
  }, []);

  return (
    <AppWrapper image={connected ? NeutralImage : SadImage}>
      <Message>{connected ? <span></span> : <span>Ups, no tengo conexión a internet.</span>}</Message>
      <Action>
        {connected ? (
          <span></span>
        ) : (
          <Button leftIcon={FaWifi} variantColor="green" onClick={() => history.push('/wifi')}>
            Configurar WiFi
          </Button>
        )}
      </Action>
    </AppWrapper>
  );
};

export default FirstScreen;
