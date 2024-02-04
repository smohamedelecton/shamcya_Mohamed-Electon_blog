import Link from "@/web/components/ui/Link"

const CommentsHeadline = ({ idComments, descritpionComments }) => (
  <article className="flex flex-col gap-4">
    <h1 className="text-2xl">
      <Link href={`/Comments/${idComments}`}>Comments</Link>
    </h1>
    <p>{descritpionComments.split(/\s+/u).slice(0, 7).join(" ")}...</p>
  </article>
)

export default CommentsHeadline
