import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import {
  descriptionValidator,
  idValidator
  } from "@/utils/validators"

const handle = mw({
  GET: [
    validate({
      query: {
        idComments: idValidator.required(),
      },
    }),
    async ({
      send,
      input: {
        query: { idComments },
      },
      models: { CommentsModel },
    }) => {
      const comments = await CommentsModel.query()
        .findById(idComments)
        .withGraphFetched("posts")
        .throwIfNotFound()

      send(comments)
    },
  ],
  PATCH: [
    validate({
      query: {
        idComments: idValidator.required(),
      },
      body: {
        descritpionComments: descriptionValidator,
      },
    }),
    async ({
      send,
      input: {
        query: { idComments },
        body,
      },
      models: { CommentsModel},
    }) => {
      const updatedComments = await CommentsModel.query()
        .updateAndFetchById(idComments, body)
        .withGraphFetched("posts")
        .throwIfNotFound()

      send(updatedComments)
    },
  ],
  DELETE: [
    validate({
      query: {
        commentsId: idValidator.required(),
      },
    }),
    async ({
      send,
      input: {
        query: { idComments},
      },
      models: { CommentsModel },
    }) => {
      const comments = await CommentsModel.query()
        .findById(idComments)
        .throwIfNotFound()

      await comments.$query().delete()

      send(comments)
    },
  ],
})

export default handle
