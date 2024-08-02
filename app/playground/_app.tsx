// pages/_app.tsx
import "@uploadcare/react-widget/styles.css"; // Add this line
import { AppProps } from 'next/app'; // Import the AppProps type from next/app
// _app.tsx or _app.js
import "@uploadcare/react-widget/styles.css";


function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}

export default MyApp;
