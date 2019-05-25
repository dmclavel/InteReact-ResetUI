import React, { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

const DarkerWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: -1;
  left: 0;
  top: 0;
  background: #000;
`;

const ImageContent = styled.img`
  width: 100%;
  height: 100%;
  opacity: 0.3;
`;

const Status = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const HeadingBlock = styled.div`
  display: flex;
  flex-direction: inherit;
  justify-content: center;
  align-items: center;
  height: 20%;
`;

const Headings = styled.span`
  font-size: 5rem;
  letter-spacing: 0.3rem;
  color: #fff;
  font-weight: bold;
  margin-top: 2rem;
`;

const Text = styled.span`
font-size: 3rem;
  letter-spacing: 0.2rem;
  color: #fff;
  font-weight: bold;
  margin-top: 5rem;
`

const imgUrl = 'https://images.unsplash.com/photo-1520716963369-9b24de965de4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80';

const forbidden = () => {

    return (
        <Fragment>
            <DarkerWrapper>
                <ImageContent src={imgUrl} alt="forbidden" />
            </DarkerWrapper>
            <Status>
                <HeadingBlock>
                    <Headings>
                        <FormattedMessage id="app.forbidden" />
                    </Headings>
                    <Text>
                        <FormattedMessage id="app.email-expired" />
                    </Text>
                </HeadingBlock>
            </Status>
        </Fragment>
    )
};

export default forbidden;