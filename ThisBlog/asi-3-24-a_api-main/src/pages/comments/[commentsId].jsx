import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useRouter } from "next/router"

const CommentPage = () => {
  const {
    query: { idComments },
  } = useRouter()
  const {
    isLoading,
    data: { data: comments },
  } = useQuery({
    queryKey: ["comments"],
    queryFn: () => axios(`/api/comments/${idComments}`),
    enabled: Boolean(idComments),
    initialData: { data: {} },
  })

  if (isLoading) {
    return "Loading..."
  }

  return (
    <article>
      <h1 className="text-2xl">
        (#{comments.idComments})
      </h1>
      <p>{comments.descritpionComments}</p>
    </article>
  )
}

export default CommentPage
