import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { generateRedirectURL } from '../lib'

import data from './demo.json'
import logements from './logements.json'

export default function ServiceLogement() {
  const router = useRouter()
  const { query, isReady } = router

  const [listing, setListing] = useState(logements)
  const [token, setToken] = useState()

  const handleClickCompute = (e, idx) => {
    const item = listing[idx]

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
          alert(d.error)
        }
        item.aide = d.value
        setListing([...listing])
      })
  }

  const handleClickIllustrate = (teleservice) => {
    let url = `${process.env.NEXT_PUBLIC_MESAIDES_URL}/api/simulation`
    const body = {...data, ...(teleservice ? { teleservice } : {})}
    fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      },
    }).then((response) => response.json())
    .then(simulation => generateRedirectURL(simulation, '/resultats'))
    .then(url => {
       document.location.href = url
    })
    .catch(function(error) {
      console.error(error)
    })

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
              <tr key={idx} >
                <td>{item.description}</td>
                <td>{item.depcom}</td>
                <td>{item.loyer}</td>
                <td>{token ? (item.aide ? item.aide : <button onClick={e => handleClickCompute(e, idx)}>Aide?</button>) : (
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
        <p><button onClick={() => handleClickIllustrate("aides_jeunes_service_logement_dev")}>Simuler une boucle (dev)</button></p>
      </div>
    </>
  )
}
