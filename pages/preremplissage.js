import { useEffect, useState } from 'react';
import fetch from 'isomorphic-unfetch';

import data from './demo.json'
import logements from './logements.json'

export default function Preremplissage() {
  const [simulation, setSimulation] = useState()
  const [teleserviceData, setTeleserviceData] = useState()
  const teleserviceName = `aides_jeunes_preremplissage${process.env.NEXT_PUBLIC_TELESERVICE_SUFFIX}`

  const handleClick = (teleservice) => {
    let url = `${process.env.NEXT_PUBLIC_MESAIDES_URL}/api/simulation`
    const body = {...data, ...(teleservice ? { teleservice } : {})}
    setTeleserviceData(undefined)
    fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      },
    }).then(function(response) {
      return response.json()
    }).then(d => {
      setSimulation(d)
    }).catch(function(error) {
      console.error(error)
    })
  }

  function generateRedirectURL(location) {
    const to = location ? `&to=${location}` : ''
    return `${process.env.NEXT_PUBLIC_MESAIDES_URL}/api/simulation/${simulation._id}/redirect?token=${simulation.token}${to}`
  }

  const handleRedirectionLinkClick = () => {
    let url = `${process.env.NEXT_PUBLIC_MESAIDES_URL}/api/simulation/${simulation._id}/${simulation.teleservice}/?token=${simulation.token}`
    fetch(url).then(function(response) {
      return response.json()
    }).then(d => {
      setTeleserviceData(d)
    }).catch(function(error) {
      console.error(error)
    })
  }

  return (
    <>
      <fieldset>
        <legend>Génération de simulations</legend>
        <p>Les boutons permettent la génération de simulations à partir de données externes.
          Avec la redirection, la page de résultats n’est pas affichée. Les personnes sont
          directement renvoyées vers le site associé au téléservice indiqué.
        </p>
        <div><button onClick={() => handleClick()}>GO sans redirection</button></div>
        <div><button onClick={() => handleClick("aides_jeunes_preremplissage_dev")}>Enregistrer une simulation avec redirection expérimentale (local)</button></div>
        <div><button onClick={() => handleClick("aides_jeunes_service_logement_dev")}>Enregistrer une simulation avec redirection service logement (local)</button></div>
        <div><button onClick={() => handleClick("aides_jeunes_preremplissage")}>Enregistrer une simulation avec redirection expérimentale (en ligne)</button></div>
        <div><button onClick={() => handleClick("aides_jeunes_service_logement")}>Enregistrer une simulation avec redirection service logement (en ligne)</button></div>
      </fieldset>
      { simulation && (
        <fieldset>
          <legend>Redirection</legend>
          <div><a target="_blank" rel="noreferrer" href={generateRedirectURL()}>Lien vers le début de simulation</a></div>
          <div><a target="_blank" rel="noreferrer" href={generateRedirectURL('/resultats')}>Lien la page de résultats</a></div>
          { simulation.teleservice && (teleserviceData ? (
              <>
                <div><a target="_blank" rel="noreferrer" href={teleserviceData.destination.url}>Lien direct vers la page de redirection</a></div>
                <pre>{JSON.stringify(teleserviceData, null, 2)}</pre>
              </>
              ) : (
              <div><button onClick={() => handleRedirectionLinkClick()}>Générer le lien direct vers la page de redirection</button></div>
              )
            )
          }
        </fieldset>
      ) }
      <pre>{JSON.stringify(simulation, null, 2)}</pre>

      <div>
      </div>
    </>
  )
}
