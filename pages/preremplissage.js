import { useEffect, useState } from 'react';
import fetch from 'isomorphic-unfetch';

import data from './demo.json'
import logements from './logements.json'

export default function Preremplissage() {
  const [simulation, setSimulation] = useState()
  const teleserviceName = "aides_jeunes_preremplissage"

  const handleClick = (teleservice) => {
    let url = "https://mes-aides.1jeune1solution.beta.gouv.fr/api/simulation"
    url = "http://localhost:8080/api/simulation"
    const body = {...data, ...(teleservice ? { teleservice } : {})}
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

      let tlsurl = `${url}/${d._id}/${d.teleservice}?token=${d.token}`
      return fetch(tlsurl).then(r => r.json())
      .then(d => {

        const uu = new URL(d.destination.url)
        const token = uu.searchParams.get('token')

        const props = ["loyer", "statut_occupation_logement", "coloc", "logement_chambre", "depcom"]

        let propsData = [
          props.map(p => `_[]=${p}`).join('&'),
          props.map(p => {
            return logements.map(l => `${p}[]=${l[p]}`).join('&')
          }).join('&')
        ].join('&')
        let resurl = `${url}/via/${token}?${propsData}`
        console.log(resurl, resurl.length)
        fetch(resurl).then(r => r.json())
          .then(d => {
            console.log(d)
          })
      })
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
        Avec la redirection, la page de résultats n’est pas affichée. Les personnes sont 
        directement renvoyées vers le site associé au téléservice indiqué (ici <code>{`${teleserviceName}`}</code>).
      </p>
      <div><button onClick={() => handleClick()}>GO</button></div>
      <div><button onClick={() => handleClick("aides_jeunes_preremplissage")}>GO avec redirection expérimentale</button></div>
      <div><button onClick={() => handleClick("aides_jeunes_service_logement")}>GO avec redirection service logement</button></div>
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
