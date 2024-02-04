import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useRouter } from "next/router"

const PostsPage = () => {
  const {
    query: { idPosts },
  } = useRouter()
  const {
    isLoading,
    data: { data: posts},
  } = useQuery({
    queryKey: ["posts"],
    queryFn: () => axios(`/api/posts/${idPosts}`),
    enabled: Boolean(idPosts),
    initialData: { data: {} },
  })

  if (isLoading) {
    return "Loading..."
  }

  return (
    <article>
      <h1 className="text-2xl">
       (#{posts.idPosts})
      </h1>
      <p>{posts.descriptionPosts}</p>
    </article>
  )
}

export default PostsPage