import Link from "@/web/components/ui/Link"

const PostsHeadline = ({ idPosts, descriptionPosts }) => (
  <article className="flex flex-col gap-4">
    <h1 className="text-2xl">
      <Link href={`/Posts/${idPosts}`}>Posts</Link>
    </h1>
    <p>{descriptionPosts.split(/\s+/u).slice(0, 7).join(" ")}...</p>
  </article>
)

export default PostsHeadline