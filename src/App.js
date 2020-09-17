import { Route, Switch } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';
import FirstScreen from './views/FirstScreen';
import Wifi from './views/Wifi';

export const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;

const App = () => {
  return (
    <Wrapper>
      <Switch>
        <Route path="/" render={() => <FirstScreen />} exact />
        <Route path="/wifi" render={() => <Wifi />} exact />
      </Switch>
    </Wrapper>
  );
};

export default App;
