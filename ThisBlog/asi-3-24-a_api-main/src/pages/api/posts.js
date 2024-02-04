import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import { descriptionValidator, pageValidator } from "@/utils/validators"

const handle = mw({
  POST: [
    validate({
      body: {
        descriptionPosts: descriptionValidator.required(),
      },
    }),
    async ({ send, input: { body }, models: { PostsModel } }) => {
      const newPost = await PostsModel.query().insertAndFetch(body)

      send(newPost)
    },
  ],
  GET: [
    validate({
      query: {
        page: pageValidator.required(),
      },
    }),
    async ({
      send,
      input: {
        query: { page },
      },
      models: { PostsModel },
    }) => {
      const query = PostsModel.query()
      const posts = await query.clone().page(page)
      const [{ count }] = await query.clone().count()

      send(posts, { count })
    },
  ],
})

export default handle
