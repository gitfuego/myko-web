import { useRouter } from 'next/router'

export default function({ user }) {
  const router = useRouter()
  const { artistID } = router.query

  return <p>Artist: {artistID}</p>
}