import BaseModel from "@/db/models/BaseModel"
import CommentsModel from "@/db/models/CommentsModel"
import PostsModel from "@/db/models/PostsModel"

class UserModel extends BaseModel {
  static tableName = "user"
  static get relationMappings() {
      return {
      comments: {
        modelClass: CommentsModel,
        relation: BaseModel.HasManyRelation,
        join: {
          from: "user.idUser",
          to: "comments.commentUserId",
        },
      },
      posts: {
        modelClass: PostsModel,
        relation: BaseModel.HasManyRelation,
        join: {
          from: "user.idUser",
          to: "posts.postUserId"
        }
      }
    }
  }
}

export default UserModel
