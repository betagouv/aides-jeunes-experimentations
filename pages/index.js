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
      <p>
        Ce site contient des pages et des logiques permettant des
        expérimentations d’intégration du simulateur de 1jeune1solution
        avec d’autres sites et services en ligne.
      </p>
      <p>
        Le code source est disponibles sur GitHub : <a
        href="https://github.com/betagouv/aides-jeunes-experimentations">
        https://github.com/betagouv/aides-jeunes-experimentations</a>
      </p>
    </>
  )
}
