import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { generateRedirectURL, fetchDemoSimulation } from '../lib'

import logements from './logements.json'


export default function ServiceLogement(props) {
  const router = useRouter()
  const { query, isReady } = router

  const [listing, setListing] = useState(logements)
  const [token, setToken] = useState()


  const handleClickCompute = (e, idx) => {
    const item = listing[idx]
    item.aide = "Chargement…"
    setListing([...listing])


    const props = ["loyer", "_logementType", "_locationType", "coloc", "logement_chambre", "depcom"]
    let propsData = [
      props.map(p => `_[]=${p}`).join('&'),
      props.map(p => {
        return [logements[idx]].map(l => `${p}[]=${l[p]}`).join('&')
      }).join('&')
    ].join('&')

    const url = `${process.env.NEXT_PUBLIC_MESAIDES_URL}/api/simulation/via/${token}?${propsData}`
    fetch(url).then(r => r.json())
      .then(d => {
        if (d.error) {
          item.error = d.error
          console.log(d.error)
          if (d.error.name == "TokenExpiredError") {
            d.value = "Oups"
          } else {
            alert(d.error)
          }
        }
        item.aide = d.value
        setListing([...listing])
      })
  }

  const handleClickIllustrate = async (teleservice) => {
    let url = `${process.env.NEXT_PUBLIC_MESAIDES_URL}/api/simulation`
    try {
      const body = await fetchDemoSimulation(teleservice)
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json"
        },
      })
      const simulation = await response.json()
      const resultUrl = generateRedirectURL(simulation, '/resultats')
      document.location.href = resultUrl
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
      if (isReady) {
        const { token } = query
        setToken(token)
      }
  }, [isReady, query])

  return (
    <>
      <h1>Listing</h1>
      <table>
        <thead>
          <tr>
            <td>description</td>
            <td>Code INSEE</td>
            <td>loyer</td>
            <td>aide</td>
          </tr>
        </thead>
        <tbody>
          {listing.map((item, idx) => {
            return (
              <tr key={idx} data-testid-index={idx} >
                <td>{item.description}</td>
                <td>{item.depcom}</td>
                <td>{item.loyer}</td>
                <td data-testid="action">{token ? (item.aide !== undefined ? item.aide : <button onClick={e => handleClickCompute(e, idx)}>Aide?</button>) : (
                    <a>Faites une simulation</a>
                  )}</td>
              </tr>)
          })}
        </tbody>
      </table>
      <div>
        <h1>Illustration</h1>
        <p>L’idée est de proposer aux personnes répondre aux questions du simulateur puis d’être redirigées automatiquement (ou pas)
        vers la page d’origine (ici) avec un token qui leur permettent d’évaluer des aides au logement dans différents scénarios.</p>
        <p>Dans un premier temps, on propose, pour démonstration, un préremplissage intégral du simulateur et une redirection automatique par ici.</p>
        <p><button onClick={() => handleClickIllustrate("aides_jeunes_service_logement")}>Simuler une boucle (en ligne)</button></p>
        <p><button onClick={() => handleClickIllustrate("aides_jeunes_service_logement_dev")}>Simuler une boucle (local)</button></p>
      </div>
    </>
  )
}
