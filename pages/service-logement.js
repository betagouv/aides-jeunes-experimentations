import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import logements from './logements.json'

export default function ServiceLogement() {
  const router = useRouter()
  const { query, isReady } = router

  const [listing, setListing] = useState(logements)
  const [token, setToken] = useState()

  const handleClick = (e, idx) => {
    const item = listing[idx]

    const props = ["loyer", "statut_occupation_logement", "coloc", "logement_chambre", "depcom"]
    let propsData = [
      props.map(p => `_[]=${p}`).join('&'),
      props.map(p => {
        return [logements[idx]].map(l => `${p}[]=${l[p]}`).join('&')
      }).join('&')
    ].join('&')

    const url = `${process.env.NEXT_PUBLIC_MESAIDES_URL}/api/simulation/via/${token}?${propsData}`
    fetch(url).then(r => r.json())
      .then(d => {
        item.aide = d
        setListing([...listing])
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
                <td>{token ? (item.aide ? item.aide : <button onClick={e => handleClick(e, idx)}>Aide?</button>) : (
                    <a href>Faites une simulation</a>
                  )}</td>
              </tr>)
          })}
        </tbody>
      </table>
    </>
  )
}
