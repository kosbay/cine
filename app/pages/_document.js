// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

// ./pages/_document.js
import Document, { Head, Main, NextScript } from 'next/document';
// const CustomLoading = dynamic(() => <Loading />);.

const chatKey = '3cb06f01-9668-401c-8d8c-b0d773b73905';
const chatScript = process.env.NODE_ENV === 'production'
  ? `window.$crisp=[];window.CRISP_WEBSITE_ID="${chatKey}";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();`
  : '';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    const isLearn = `${this.props.__NEXT_DATA__.page}`.includes('learn');
    return (
      <html lang="ru">
        <Head>
          <link rel="shortcut icon" href="static/favicon.ico" />
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <meta name="theme-color" content="#000000" />
          <link rel="shortcut icon" href="static/favicon.ico" />
          {isLearn && <link href="https://cdnjs.cloudflare.com/ajax/libs/quill/1.3.6/quill.core.min.css" rel="stylesheet" />}
          <script
            className="ql-editor"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: chatScript,
            }}
          />
          <script src="https://widget.cloudpayments.kz/bundles/checkout" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
