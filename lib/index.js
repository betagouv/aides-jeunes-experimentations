export function generateRedirectURL(simulation, location) {
  const to = location ? `&to=${location}` : ''
  return `${process.env.NEXT_PUBLIC_MESAIDES_URL}/api/simulation/${simulation._id}/redirect?token=${simulation.token}${to}`
}
