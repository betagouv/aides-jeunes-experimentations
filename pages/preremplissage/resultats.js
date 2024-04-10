import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import fetch from 'isomorphic-unfetch'


export default function Resultats() {
  const router = useRouter()
  const { query, isReady } = router
  const [ data, setData ] = useState("Chargement…")

  useEffect(() => {
      if (isReady) {
        const { token } = query

        const url = `${process.env.NEXT_PUBLIC_MESAIDES_URL}/api/simulation/via/${token}`
        fetch(url).then(response => response.json())
          .then(data => {
            setData(data)
          })
      }
  }, [isReady, query])
  return (
    <>
      <h1>Page de résultats</h1>
      <p>Les aides suivantes sont affichées pour la simulation de démontrastion :</p>
      <ul>{ (!data.droitsEligibles && data) || (data.droitsEligibles && data.droitsEligibles.map(benefit => {
        return (<li key={benefit.id}>{benefit.label} : {benefit.montant} {benefit.unit}</li>)
      }))}
      </ul>
    </>
  )
}
