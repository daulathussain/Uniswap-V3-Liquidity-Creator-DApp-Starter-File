import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className="dark">
      <Head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#111827" />
        <meta
          name="keywords"
          content="uniswap, liquidity, polygon, defi, token, pool, crypto"
        />
        <meta name="author" content="Uniswap Liquidity Creator" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Uniswap Liquidity Creator - Polygon Network"
        />
        <meta
          property="og:description"
          content="Create liquidity pools for your tokens on Uniswap V3 with ease. Support for custom tokens and popular pairs on Polygon network."
        />
        <meta property="og:image" content="/og-image.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Uniswap Liquidity Creator - Polygon Network"
        />
        <meta
          name="twitter:description"
          content="Create liquidity pools for your tokens on Uniswap V3 with ease."
        />
        <meta name="twitter:image" content="/og-image.png" />

        {/* Preconnect to external domains for better performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
      </Head>
      <body className="bg-gray-900 text-white antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
