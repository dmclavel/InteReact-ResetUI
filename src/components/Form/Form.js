import React, { Fragment, useState, useEffect } from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { Button, Form, Icon } from 'semantic-ui-react';

const AppLogo = process.env.REACT_APP_CLOUDFRONT_URL + 'intereact-logo.png';

const IconCheckerStyle = {
    position: 'absolute',
    left: '102%',
    top: '50%',
};

const HeaderBlock = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  margin-bottom: 2rem;
`;

const Image = styled.img`
  width: 4.5rem;
  height: 3.5rem;
`;

const AppName = styled.span`
  display: flex;
  align-items: center;
  color: #027B93;
  font-size: 2rem;
  letter-spacing: 0.2rem;
  font-weight: bold;
  margin-left: 0.5rem;
`;

const ErrorBlock = styled.div`
  position: relative;
  flex-direction: row;
  width: 100%;
  height: 3rem;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
`;

const ErrorBlock2= styled.div`
    display: inherit;
    height: inherit;
    justify-content: center;
    align-items: center;
    background-color: #FFD2D2;
    width: 30%;
`;

const TextError = styled.span`
     color: #D8000C;
     font-size: 1.2rem;
`;

const IconError = styled.i`
  color: #D8000C;
  font-size: 2rem;
`;

const FormApp = ({ resetPassword }) => {
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [isMatched, setIsMatched] = useState(false);
    const [lengthErr, setLengthErr] = useState(false);

    useEffect(() => {
        if (password === rePassword && password.trim().length !== 0 && rePassword.trim().length !== 0) {
            if (!(password.trim().length > 5 && rePassword.trim().length > 5)) {
                setLengthErr(true);
            } else {
                if (setLengthErr) setLengthErr(false);
                setIsMatched(true);
            }
        }
        else
            setIsMatched(false);
    }, [password, rePassword, isMatched]);

    return (
        <Fragment>
            <Form style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                position: 'relative',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}>
                <HeaderBlock>
                    <Image src={AppLogo} alt="logo" />
                    <AppName> InteReact </AppName>
                </HeaderBlock>
                <Form.Field style={{ position:'relative', width: '30%' }}>
                    <label>Password</label>
                    <FormattedMessage id="app.insert-password">
                        { (txt) => (
                            <input onChange={(e) => setPassword(e.target.value)} value={password} placeholder={txt} type="password" />
                        )}
                    </FormattedMessage>
                    <Icon style={{
                        ...IconCheckerStyle,
                        display: password.trim().length !== 0 && rePassword.trim().length !== 0 ? 'block' : 'none',
                        color: isMatched ? 'green' : 'red'
                    }}
                          name={ isMatched ? 'check circle outline' : 'warning circle' }
                          size='large' />
                </Form.Field>
                <Form.Field style={{ position:'relative', width: '30%' }}>
                    <label>
                        <FormattedMessage id="app.confirm-password-label" />
                    </label>
                    <FormattedMessage id="app.reinsert-password">
                        { (txt) => (
                            <input onChange={(e) => setRePassword(e.target.value)} value={rePassword} placeholder={txt} type="password" />
                        )}
                    </FormattedMessage>
                    <Icon style={{
                        ...IconCheckerStyle,
                        display: password.trim().length !== 0 && rePassword.trim().length !== 0 ? 'block' : 'none',
                        color: isMatched ? 'green' : 'red'
                    }}
                          name={ isMatched ? 'check circle outline' : 'warning circle' }
                          size='large' />
                </Form.Field>
                <Button style={{
                    width: '30%'
                }} type='submit' disabled={!isMatched} onClick={() => resetPassword(password)}>
                    <FormattedMessage id="app.change-password-button" />
                </Button>
                <ErrorBlock style={{ display: lengthErr ? 'flex' : 'none' }}>
                    <ErrorBlock2>
                        <IconError className="material-icons"> clear </IconError>
                        <TextError> <FormattedMessage id="app.password-length" /> </TextError>
                    </ErrorBlock2>
                </ErrorBlock>
            </Form>
        </Fragment>
    );
};

export default FormApp;
