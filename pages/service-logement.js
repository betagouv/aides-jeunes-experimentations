import { useEffect, useState } from 'react';

import logements from './logements.json'

export default function ServiceLogement() {
  const [listing, setListing] = useState(logements)

  const handleClick = (e, idx) => {
    const item = listing[idx]
    console.log(listing, idx, listing[idx])
    item.count = (item.count || 0) + 1
    if (item.count >= 2) {
      item.aide = 42
    }
    setListing([...listing])
  }


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
                <td>{item.aide ? item.aide : <button onClick={e => handleClick(e, idx)}>Aide?</button>}</td>
              </tr>)
          })}
        </tbody>
      </table>
    </>
  )
}
