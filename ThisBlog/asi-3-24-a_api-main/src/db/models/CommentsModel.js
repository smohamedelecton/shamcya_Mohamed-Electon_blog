import BaseModel from "@/db/models/BaseModel"
import PostsModel from "@/db/models/PostsModel"
import UserModel from "@/db/models/UserModel"


class CommentsModel extends BaseModel {
  static tableName = "comments"
  static get relationMappings() {
    return {
      posts: {
        modelClass: PostsModel,
        relation: BaseModel.BelongsToOneRelation,
        join: {
          from: "comments.commentPostId",
          to: "posts.idPosts",
        },
      },

         user: {
        modelClass: UserModel,
        relation: BaseModel.BelongsToOneRelation,
        join: {
          from: "comments.commentUserId",
          to: "user.idUser",
        },
      },

    }
  }
}

export default CommentsModel
