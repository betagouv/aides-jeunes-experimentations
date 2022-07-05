import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import fetch from 'isomorphic-unfetch'


export default function Resultats() {
  const router = useRouter()
  const { query, isReady } = router
  const [ data, setData ] = useState()

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
      <h1>TODO</h1>
      <pre>{JSON.stringify(false && data.droitsEligibles[0], null, 2)}</pre>
      <div>{ data && data.droitsEligibles.map(benefit => {
        return (<div key={benefit.id}>{benefit.label}</div>)
      })}
      </div>
    </>
  )
}
