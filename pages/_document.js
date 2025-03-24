import { Html, Head, Main, NextScript } from 'next/document';
import Link from 'next/link';

export default function Document() {
  return (
    <Html>
      <Head/>
      <title>Site d’expérimentations de Aides Jeunes</title>
      <body>
        <header>
          <h1><Link href="/">Site d’expérimentations de Aides Jeunes</Link></h1>
          <h3><Link href="/service-logement">Service Logement</Link></h3>
          <h3><Link href="/preremplissage">Préremplissage</Link></h3>
          <h3><Link href="/iframe">Intégration iFrame</Link> - <Link href="/iframePreprod">Intégration iFrame pré-production</Link></h3>
        </header>
        <main>
          <Main />
          <NextScript />
        </main>
        <footer>
          <p>
            Le code source est disponibles sur GitHub : <Link
            href="https://github.com/betagouv/aides-jeunes-experimentations">
            https://github.com/betagouv/aides-jeunes-experimentations</Link>
          </p>
          <p>Version : {process.env.commitSHA?.slice(0, 10)}</p>
        </footer>
      </body>
    </Html>
  )
}
