import BaseModel from "@/db/models/BaseModel"
import CommentsModel from "@/db/models/CommentsModel"
import UserModel from "@/db/models/UserModel"


class PostsModel extends BaseModel {
  static tableName = "posts"
  static get relationMappings() {
    return {
      comments: {
        modelClass: CommentsModel,
        relation: BaseModel.HasManyRelation,
        join: {
          from: "posts.idPosts",
          to: "comments.commentPostId",
        },
      },
      user: {
        modelClass: UserModel,
        relation: BaseModel.HasManyRelation,
        join: {
          from: "posts.postUserId",
          to: "user.idUser"
        }
      }
    }
  }
}

export default PostsModel
