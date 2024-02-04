import auth from "@/api/middlewares/auth"
import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import {
  descriptionValidator,
  idValidator,
  pageValidator,
} from "@/utils/validators"

const handle = mw({
  POST: [
    auth,
    validate({
      body: {
        descritpionComments: descriptionValidator.required(),
        commentsId: idValidator.required(),
      },
    }),
    async ({ send, input: { body }, models: { CommentsModel } }) => {
      const newComment = await CommentsModel.query().insertAndFetch(body)

      send(newComment)
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
      models: { CommentsModel },
    }) => {
      const query = CommentsModel.query()
      const comments = await query
        .clone()
        .withGraphFetched("posts")
        .page(page)
      const [{ count }] = await query.clone().count()

      send(comments, { count })
    },
  ],
})

export default handle
