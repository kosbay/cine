import React from 'react';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import App, { Container } from 'next/app';

import { initGA } from 'lib/ReactGA';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    const backendUrl = process.env.BACKEND_URL || 'https://wunder-server-stage.herokuapp.com';
    const chapterId = process.env.CHAPTER_ID || '5b6984131fb4aa7b1fe34ed4';
    const nodeEnv = process.env.NODE_ENV;
    return {
      pageProps,
      backendUrl,
      chapterId,
      nodeEnv,
    };
  }

  componentDidMount() {
    initGA();
  }

  setEnvOnFront = () => {
    if (!process.browser || window.env) return;
    window.env = {
      BACKEND_URL: this.props.backendUrl,
      CHAPTER_ID: this.props.chapterId,
      NODE_ENV: this.props.nodeEnv,
    };
  };

  render() {
    const { Component, pageProps } = this.props;
    this.setEnvOnFront();
    return (
      <DragDropContextProvider backend={HTML5Backend}>
        <Container>
          <Component {...pageProps} />
        </Container>
      </DragDropContextProvider>
    );
  }
}

export default MyApp;
