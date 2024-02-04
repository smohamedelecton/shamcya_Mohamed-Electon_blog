import config from "@/api/config"
import { logInfo } from "@/api/utils/createLogger"
import BaseModel from "@/db/models/BaseModel"
import CommentsModel from "@/db/models/CommentsModel"
import PostsModel from "@/db/models/PostsModel"
import UserModel from "@/db/models/UserModel"
import knex from "knex"

export const createContext = ({ req, res, next, requestId }) => {
  const send = (result, meta = {}) => {
    res.send({
      result: Array.isArray(result) ? result : [result],
      meta,
    })
  }
  const db = knex(config.db)

  if (config.isDevMode) {
    db.on("query", ({ sql, bindings }) =>
      logInfo({ type: "SQL", requestId, sql, bindings }),
    )
  }

  BaseModel.knex(db)

  return {
    requestId,
    req,
    res,
    next,
    send,
    db,
    models: {
      CommentsModel,
      PostsModel,
      UserModel,
    },
  }
}
