import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import { FormControl, FormHelperText, Input, Button, FormLabel } from '@chakra-ui/core';
import axios from 'axios';

const ROBOT_PYTHON_API = 'http://0.0.0.0:80/v1/config';

export const WifiWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(to bottom right, #3c4154, #5d6786);
`;

export const WifiForm = styled.div`
  width: 100%;
  height: 50vh;
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 1fr 1fr 1fr;
  grid-row-gap: 8px;
  padding: 12px;
`;

export const FormButton = styled(Button)`
  width: 100%;
  background-color: #e2ebfe !important;
  color: #1a1b23;
`;

export const FormLabelWrapper = styled(FormLabel)`
  color: white;
`;

export const Title = styled.div`
  width: 100vw;
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    color: white;
    font-size: 1.15rem;
    font-weight: 400;
  }
`;

const Wifi = () => {
  const history = useHistory();
  const [keyboard, setKeyboard] = useState(undefined);
  const [layoutName, setLayout] = useState('default');
  const [sid, setSID] = useState('');
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(false);
  const [disableConnect, setDisableConnect] = useState(true);

  const [filling, setFilling] = useState(undefined);

  useEffect(() => {
    if (window.navigator.onLine) {
      history.push('/');
    }
    window.addEventListener('online', () => history.push('/'));
  }, [window.navigator.onLine]);

  const onInputChanged = (data) => {
    console.log(keyboard);
    if (filling === 'sid') {
      setSID(data);
    } else if (filling === 'pass') {
      setPass(data);
    }
    if (sid.length > 0 && pass.length > 0) {
      setDisableConnect(false);
    } else {
      setDisableConnect(true);
    }
  };

  const onKeyPress = (button) => {
    console.log('Button pressed', button);
    if (button === '{shift}' || button === '{lock}') handleShift();
    if (button === '{bksp}') {
      if (filling === 'sid') {
        setSID((prev) => {
          return prev.substring(0, prev.length - 1);
        });
      } else if (filling === 'pass') {
        setPass((prev) => {
          return prev.substring(0, prev.length - 1);
        });
      }
    }
  };

  const handleShift = () => {
    setLayout(layoutName === 'default' ? 'shift' : 'default');
  };

  const connect = async () => {
    console.log(sid, pass);
    setLoading(true);
    let rs;
    try {
      rs = await axios.get(`${ROBOT_PYTHON_API}/wifi_update`);
    } catch (e) {
      console.error(e);
    }
    console.log(rs);
    setLoading(false);
  };

  const onFocusSID = () => {
    keyboard.setInput(sid);
    keyboard.setCaretPosition(sid.length);
    setFilling('sid');
  };

  const onFocusPASS = () => {
    keyboard.setInput(pass);
    keyboard.setCaretPosition(pass.length);
    setFilling('pass');
  };

  return (
    <WifiWrapper>
      <Title>
        <span>WiFi</span>
      </Title>
      <WifiForm>
        <FormControl isRequired>
          <FormLabelWrapper htmlFor="sid">Nombre de la Red WiFi</FormLabelWrapper>
          <Input value={sid} type="text" id="sid" aria-describedby="sid-helper-text" onFocus={() => onFocusSID()} />
          <FormHelperText id="sid-helper-text">Nunca compartiremos tus datos personales.</FormHelperText>
        </FormControl>
        <FormControl isRequired>
          <FormLabelWrapper htmlFor="wifi-pass">Contraseña</FormLabelWrapper>
          <Input value={pass} type="text" id="wifi-pass" onFocus={() => onFocusPASS()} />
        </FormControl>
        <FormButton isLoading={loading} onClick={() => connect()} disabled={disableConnect}>
          Conectar
        </FormButton>
      </WifiForm>
      <Keyboard keyboardRef={(r) => setKeyboard(r)} layoutName={layoutName} onChange={onInputChanged} onKeyPress={onKeyPress} />
    </WifiWrapper>
  );
};

export default Wifi;
