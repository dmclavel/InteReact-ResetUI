import React, { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import Loader from 'react-loader-spinner'

const Backdrop = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 100;
  background: rgba(0,0,0,0.5);
`;

const StatusBlock = styled.div`
  position: fixed;
  z-index: 500;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 50%;
  top: 25%; bottom: 25%; left: 25%; right: 25%;
`;

const Text = styled.span`
  margin-top: 2rem;
  font-weight: bold;
  color: #fff;
  font-size: 2rem;
  letter-spacing: 0.1rem;
`;

const HeadingsBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 3rem;
`;

const HeadingsBlockIcon = styled.i`
  font-size: 5rem;
  margin-right: 0.5rem;
`;

const HeadingsBlockText = styled.span`
  font-size: 3.5rem;
  letter-spacing: 0.5rem;
  font-weight: bold;
`;

const TextSuccess = styled.span`
  font-weight: bold;
  color: #4F8A10;
  font-size: 2rem;
  letter-spacing: 0.1rem;
`;

const TextError = styled.span`
  font-weight: bold;
  color: #D8000C;
  font-size: 2rem;
  letter-spacing: 0.1rem;
`;

const Okay = styled.span`
  color: #F1F1F1;
  font-size: 2.5rem;
  font-weight: bold;
  padding: 1rem;
  margin-top: 2rem;
  transition: 1s;
  border-radius: 10px;
  :hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

const statuses = ({ startReset, failedReset, successReset, authenticating }) => {

    const authenticatingContent = authenticating && !startReset && !failedReset && !successReset ? (
        <StatusBlock  style={{ background: 'transparent' }}>
            <Loader
                type="Ball-Triangle"
                color="#FFF"
                height="110"
                width="110"
            />
            <Text>
                <FormattedMessage id="app.authenticating" />
            </Text>
        </StatusBlock>
    ) : null;

    const startingContent = startReset && !failedReset && !successReset ? (
        <StatusBlock  style={{ background: 'transparent' }}>
            <Loader
                type="Ball-Triangle"
                color="#FFF"
                height="110"
                width="110"
            />
            <Text>
                <FormattedMessage id="app.starting" />
            </Text>
        </StatusBlock>
    ) : null;

    const failedContent = !startReset && !successReset && failedReset ? (
        <StatusBlock style={{ background: '#FFD2D2' }}>
            <HeadingsBlock>
                <HeadingsBlockIcon className="material-icons" style={{ color: '#D8000C' }}>
                    error
                </HeadingsBlockIcon>
                <HeadingsBlockText style={{ color: '#D8000C' }}>
                    <FormattedMessage id="app.failed" />
                </HeadingsBlockText>
            </HeadingsBlock>
            <TextError>
                <FormattedMessage id="app.reset-failed" />
            </TextError>
            <Okay style={{ background: '#D8000C' }} onClick={() => window.location.reload(false)}>
                Okay
            </Okay>
        </StatusBlock>
    ) : null;

    const successContent = !startReset && successReset && !failedReset ? (
        <StatusBlock style={{ background: '#DFF2BF' }}>
            <HeadingsBlock>
                <HeadingsBlockIcon className="material-icons" style={{ color: '#4F8A10' }}>
                    check_circle
                </HeadingsBlockIcon>
                <HeadingsBlockText style={{ color: '#4F8A10' }}>
                    <FormattedMessage id="app.success" />
                </HeadingsBlockText>
            </HeadingsBlock>
            <TextSuccess>
                <FormattedMessage id="app.reset-success" />
            </TextSuccess>
            <Okay style={{ background: '#4F8A10' }} onClick={() => window.location.reload(false)}>
                Okay
            </Okay>
        </StatusBlock>
    ) : null;

    return (
        <Fragment>
            { authenticatingContent }
            { startingContent }
            { failedContent }
            { successContent }
            <Backdrop style={{ display: startReset || failedReset || successReset || authenticating ? 'block' : 'none' }} />
        </Fragment>
    )
};

export default statuses;