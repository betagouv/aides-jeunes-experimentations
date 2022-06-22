import { Html, Head, Main, NextScript } from 'next/document';
import Link from 'next/link';

export default function Document() {
  return (
    <Html>
      <Head/>
      <title>Site d’expérimentations de Aides Jeunes</title>
      <body>
        <header>
          <h1>Site d’expérimentations de Aides Jeunes</h1>
          <h3><Link href="/service-logement">
            <a>Service Logement</a>
          </Link>
          </h3>
        </header>
        <main>
          <Main />
          <NextScript />
        </main>
      </body>
    </Html>
  )
}