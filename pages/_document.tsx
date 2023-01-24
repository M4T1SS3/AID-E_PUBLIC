import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet"/>
        <meta name="description" content="Aide-e is a confidential digital assistant for victims of domestic abuse. Get help and support whenever you need it."/>
        <meta name="keywords" content="domestic abuse, abuse, support, help, digital assistant, Aide-e"/>
        <meta name="robots" content="index, follow"/>
        <meta name="author" content="Aide-e Team"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta property="og:title" content="Aide-e - Support for victims of domestic abuse" />
        <meta property="og:description" content="Aide-e is a confidential digital assistant for victims of domestic abuse. Get help and support whenever you need it." />


      </Head>
        
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
