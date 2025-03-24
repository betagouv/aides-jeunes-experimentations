import iframeResize from "@iframe-resizer/parent"

export default function Home() {

    iframeResize({ log: false, license: "GPLv3", waitForLoad: true }, "#iframe")

  return (
    <>
      <iframe
        id="iframe"
        src="https://mes-aides.1jeune1solution.beta.gouv.fr?iframe"
      />
    </>
  )
}
