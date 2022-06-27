import { useEffect, useState } from 'react';
import fetch from 'isomorphic-unfetch';

import data from './demo.json'

export default function Preremplissage() {
  const [simulation, setSimulation] = useState()
  const teleserviceName = "aides_jeunes_preremplissage"

  const handleClick = (teleservice) => {
    let url = "https://mes-aides.1jeune1solution.beta.gouv.fr/api/simulation"
    url = "http://localhost:8080/api/simulation"
    const body = {...data, ...(teleservice ? { teleservice: teleserviceName } : {})}
    console.log('body', body)
    fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      },
    }).then(function(response) {
      response.status     //=> number 100–599
      response.statusText //=> String
      response.headers    //=> Headers
      response.url        //=> String

      return response.json()
    }).then(d => {
      setSimulation(d)
    }).catch(function(error) {
      console.error(error)
      error.message //=> String
    })
  }

  function generateRedirectURL(location) {
    const to = location ? `&to=${location}` : ''
    return `http://localhost:8080/api/simulation/${simulation._id}/redirect?token=${simulation.token}${to}`
  }

  return (
    <>
      <p>Les boutons permettent la génération de simulations à partir de données externes. 
        Avec la redirection, la page de résultats n'est pas affichée. Les personnes sont 
        directement renvoyées vers le site associé au téléservice indiqué (ici <code>{`${teleserviceName}`}</code>).
      </p>
      <button onClick={() => handleClick()}>GO</button>
      <button onClick={() => handleClick(true)}>GO avec redirection</button>
      <div>
        { simulation && (
          <>
            <p>

            </p>
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
