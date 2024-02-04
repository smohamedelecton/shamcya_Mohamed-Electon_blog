import { pageValidator } from "@/utils/validators"
import CommentsHeadline from "@/web/components/CommentHeadline"
import PostsHeadline from "@/web/components/PostHeadline"
import Pagination from "@/web/components/ui/Pagination"
import config from "@/web/config"
import { readResource } from "@/web/services/apiClient"
import { useQuery } from "@tanstack/react-query"

export const getServerSideProps = ({ query: { page } }) => ({
  props: {
    page: pageValidator.validateSync(page),
  },
})
const IndexPage = (props) => {
  const { page } = props
  const {
    isLoading,
    data: { data: { result: comments, meta: { count } = {} } = {} } = {},
  } = useQuery({
    queryKey: ["comments", page],
    queryFn: () => readResource("comments", { params: { page } }),
  })
  const countPages = Math.ceil(count / config.pagination.limit)

  if (isLoading || !comments) {
    return <div className="text-center p-32 animate-bounce">Loading...</div>
  }

  return (
    <div className="py-4 flex flex-col gap-16">
      <ul className="flex flex-col gap-8">
        {comments.map(({ idPosts, descriptionPosts }) => (
          <li key={id}>
            <PostsHeadline>id={idPosts} description={descriptionPosts}</PostsHeadline>

          </li>
        ))}
      </ul>
      <Pagination pathname="/" page={page} countPages={countPages} />
    </div>
  )
}

export default IndexPage
