import iframeResize from "@iframe-resizer/parent"

export default function Home() {
    iframeResize({ log: false, license: "GPLv3", waitForLoad: true }, "#iframe")

  return (
    <>
      <iframe
        id="iframe"
        src="https://preprod.mes-aides.incubateur.net?iframe"
      />
    </>
  )
}
