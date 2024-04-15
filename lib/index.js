import {
  BlobReader,
  TextWriter,
  ZipReader,
} from "@zip.js/zip.js"


export function generateRedirectURL(simulation, location) {
  const to = location ? `&to=${location}` : ''
  return `${process.env.NEXT_PUBLIC_MESAIDES_URL}/api/simulation/${simulation._id}/redirect?token=${simulation.token}${to}`
}

let demoData = null

async function getZipFirstFileContent(zipBlob) {
  const zipFileReader = new BlobReader(zipBlob)

  const textWriter = new TextWriter()

  const zipReader = new ZipReader(zipFileReader)
  const firstEntry = (await zipReader.getEntries()).shift()
  zipReader.close()
  await firstEntry.getData(textWriter)

  return JSON.parse(await textWriter.getData())
}

export async function fetchDemoSimulation(teleservice) {
  if (!demoData) {
    const url = `${process.env.NEXT_PUBLIC_MESAIDES_URL}/api/simulation/demo`
    const artifact = await fetch(url)
    demoData = getZipFirstFileContent(await artifact.blob())
  }
  return { ...(await demoData), _id: undefined, ...(teleservice ? { teleservice } : {})}
}
