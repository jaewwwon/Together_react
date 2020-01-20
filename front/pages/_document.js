import Document, { Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";
import Helmet from "react-helmet";

class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    );
    const styleTags = sheet.getStyleElement();
    return { ...page, helmet: Helmet.renderStatic(), styleTags };
  }

  render() {
    const { htmlAttributes, bodyAttributes, ...helmet } = this.props.helmet;
    const htmlAttrs = htmlAttributes.toComponent();
    const bodyAttrs = bodyAttributes.toComponent();
    return (
      <html {...htmlAttrs}>
        <Head>
          {this.props.styleTags}
          {Object.values(helmet).map(el => el.toComponent())}
        </Head>
        <body {...bodyAttrs}>
          <Main />
          {process.env.NODE_ENV === "production" && (
            <script src="https://polyfill.io/v3/polyfill.min.js?features=es6%2Ces7%2Ces5%2CArray.prototype.filter%2CArray.prototype.find%2CArray.prototype.findIndex%2CArray.prototype.keys%2CArray.prototype.indexOf%2CArray.prototype.includes%2CArray.prototype.map%2CArray.prototype.values%2CElement.prototype.remove%2CMap%2CNode.prototype.contains%2CNodeList.prototype.%40%40iterator%2CNodeList.prototype.forEach%2CObject.keys%2CPromise%2CRegExp.prototype.flags%2Cconsole.dir%2Cconsole.error%2Cdocument%2Cfetch%2C%7Eviewport"></script>
          )}
          <NextScript />
        </body>
      </html>
    );
  }
}

export default MyDocument;
