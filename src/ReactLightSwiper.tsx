import * as React from 'react';
import Container from 'lib/Container';
import Page from 'lib/Page';
import './global.scss';

export default class ReactLightSwiper extends React.PureComponent<any, any> {
  render() {
    return (
      <>
        <Container indicator={true} totalPage={3}>
          <Page>
            <div style={{ backgroundColor: 'red', height: '100%' }}>
              Page1
            </div>
          </Page>

          <Page>
            <div style={{ backgroundColor: 'blue', height: '100%' }}>
              Page2
            </div>
          </Page>

          <Page>
            <div style={{ backgroundColor: 'green', height: '100%' }}>
              Page3
            </div>
          </Page>
          
        </Container>
      </>
    )
  }
}