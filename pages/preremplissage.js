import { useEffect, useState } from 'react';
import fetch from 'isomorphic-unfetch';

import data from './demo.json'

export default function Preremplissage() {
  const [simulation, setSimulation] = useState()

  const handleClick = (e) => {
    let url = "https://mes-aides.1jeune1solution.beta.gouv.fr/api/simulation"
    url = "http://localhost:8080/api/simulation"
    fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
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

  return (
    <>
      <button onClick={handleClick}>GO</button>
      <div>
        { simulation && (
          <a target="_blank" rel="noreferrer" href={`http://localhost:8080/api/simulation/${simulation._id}/redirect?token=${simulation.token}`}>Lien</a>
          ) }
      </div>
      <pre>{JSON.stringify(simulation, null, 2)}</pre>

      <div>
      </div>
    </>
  )
}
