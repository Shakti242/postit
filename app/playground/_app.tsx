// _app.tsx or _app.js
import React from 'react';
import { AppProps } from 'next/app';
import "@uploadcare/react-widget/styles.css";
import '../styles/globals.css'; // Adjust the path according to your project structure

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
