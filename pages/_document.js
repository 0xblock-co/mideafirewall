import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Define the viewport meta tag */}
          <meta name="viewport" content="width=device-width, initial-scale=1" />

          {/* Add your favicon and other meta tags */}
          <link rel="icon" href="/favicon.ico" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/meta/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/meta/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/meta/favicon-16x16.png"
          />
          <link rel="manifest" href="/meta/site.webmanifest" />

          {/* Include tawk.to chat script */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                var Tawk_API = Tawk_API || {};
                var Tawk_LoadStart = new Date();
                (function () {
                  var s1 = document.createElement("script"),
                    s0 = document.getElementsByTagName("script")[0];
                  s1.async = true;
                  s1.src = 'https://embed.tawk.to/6526d910eb150b3fb9a07a1f/1hcfrvqpd';
                  s1.charset = 'UTF-8';
                  s1.setAttribute('crossorigin', '*');
                  s0.parentNode.insertBefore(s1, s0);
                })();
              `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
