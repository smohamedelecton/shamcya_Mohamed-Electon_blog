import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useRouter } from "next/router"

const UserPage = () => {
  const {
    query: { idUser },
  } = useRouter()
  const {
    isLoading,
    data: { data: user},
  } = useQuery({
    queryKey: ["posts"],
    queryFn: () => axios(`/api/users/${idUser}`),
    enabled: Boolean(idUser),
    initialData: { data: {} },
  })

  if (isLoading) {
    return "Loading..."
  }

  return (
    <article>
      <h1 className="text-2xl">
       (#{user.idUser})
      </h1>
      <p>{user.name}</p>
    </article>
  )
}

export default UserPage