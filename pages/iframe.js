import { useEffect } from 'react';
import { iframeResize } from "iframe-resizer"

export default function Home() {
  useEffect(() => {
    iframeResize({ log: false }, "#iframe")
  }, [])

  return (
    <>
      <iframe
        id="iframe"
        src="https://mes-aides.1jeune1solution.beta.gouv.fr?iframe"
        scrolling="no"
      />
    </>
  )
}
