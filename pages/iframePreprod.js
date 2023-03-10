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
        src="https://preprod.mes-aides.incubateur.net?iframe"
        scrolling="no"
      />
    </>
  )
}
