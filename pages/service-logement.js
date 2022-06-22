import { useEffect, useState } from 'react';

export default function Home() {
  const [listing, setListing] = useState([{
    description: "Super logement",
    loyer: 450,
    statut_occupation_logement: "locataire_vide",
    coloc: false,
    logement_chambre: false,
    depcom: 75016,
  },{
    description: "Super chambre",
    loyer: 200,
    statut_occupation_logement: "locataire_meuble",
    coloc: false,
    logement_chambre: true,
    depcom: 75016,
  },{
    description: "Super coloc",
    loyer: 300,
    statut_occupation_logement: "locataire_vide",
    coloc: true,
    logement_chambre: false,
    depcom: 75016,
  },{
    description: "Super studio",
    loyer: 350,
    statut_occupation_logement: "locataire_vide",
    coloc: false,
    logement_chambre: false,
    depcom: 75016,
  }])

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
