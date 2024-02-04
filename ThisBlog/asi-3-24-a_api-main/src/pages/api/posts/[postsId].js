import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import { idValidator, descriptionValidator} from "@/utils/validators"

const handle = mw({
  GET: [
    validate({
      query: {
        idPosts: idValidator.required(),
      },
    }),
    async ({
      send,
      input: {
        query: { idPosts},
      },
      models: { PostsModel },
    }) => {
      const posts = await PostsModel.query()
        .findById(idPosts)
        .throwIfNotFound()

      send(posts)
    },
  ],
  PATCH: [
    validate({
      query: {
        idPosts: idValidator.required(),
      },
      body: {
        descriptionPosts: descriptionValidator,
      },
    }),
    async ({
      send,
      input: {
        query: { idPosts },
        body,
      },
      models: { PostsModel },
    }) => {
      const updatedPosts = await PostsModel.query()
        .updateAndFetchById(idPosts, body)
        .throwIfNotFound()

      send(updatedPosts)
    },
  ],
  DELETE: [
    validate({
      query: {
        postsId: idValidator.required(),
      },
    }),
    async ({
      send,
      input: {
        query: { idPosts },
      },
      models: { PostsModel },
    }) => {
      const posts = await PostsModel.query()
        .findById(idPosts)
        .throwIfNotFound()

      await posts.$query().delete()

      send(posts)
    },
  ],
})

export default handle
