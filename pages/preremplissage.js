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
    return `http://localhost:8080/api/simulation/${simulation._id}/redirect?token=${simulation.token}${to}`
  }

  const handleLogementClick = () => {
    let url = `${process.env.NEXT_PUBLIC_MESAIDES_URL}/api/simulation/${simulation._id}/aides_jeunes_service_logement${process.env.NEXT_PUBLIC_TELESERVICE_SUFFIX}/?token=${simulation.token}`
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
      <p>Les boutons permettent la génération de simulations à partir de données externes. 
        Avec la redirection, la page de résultats n’est pas affichée. Les personnes sont 
        directement renvoyées vers le site associé au téléservice indiqué (ici <code>{`${teleserviceName}`}</code>).
      </p>
      <div><button onClick={() => handleClick()}>GO</button></div>
      <div><button onClick={() => handleClick("aides_jeunes_preremplissage")}>GO avec redirection expérimentale</button></div>
      <div><button onClick={() => handleClick("aides_jeunes_service_logement")}>GO avec redirection service logement</button></div>
      <div>
        { simulation && (
          <>
            { teleserviceData ? (
                <>
                  <div><a target="_blank" rel="noreferrer" href={teleserviceData.destination.url}>Lien direct vers la page logement</a></div>
                  <pre>{JSON.stringify(teleserviceData, null, 2)}</pre>
                </>
              ) : (
              <div><button onClick={() => handleLogementClick()}>Génère le lien direct vers la page de logement</button></div>
              )
            }
            <div><a target="_blank" rel="noreferrer" href={generateRedirectURL()}>Lien début</a></div>
            <div><a target="_blank" rel="noreferrer" href={generateRedirectURL('/resultats')}>Lien page de résultats</a></div>



          </>
          ) }
      </div>
      <pre>{JSON.stringify(simulation, null, 2)}</pre>

      <div>
      </div>
    </>
  )
}
