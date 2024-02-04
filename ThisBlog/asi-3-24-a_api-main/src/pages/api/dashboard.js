import { useSession } from "@/web/components/SessionContext"
import UserModel from "@/db/models/UserModel"

const getUserInformations = async () => {
   const { session } = useSession()
   await db("user").insert(dataUser)

  const userPosts = UserModel.query()
    .select("user.*", "posts.*")
    .whereColumn("user.idUser", "posts.postUserId")
    .where("user.idUser", session)
  
  const userComments = UserModel.query()
    .select("user.*", "comments.*")
    .whereColumn("user.idUser", "posts.commentUserId")
    .where("user.idUser", session)
}

export default getUserInformations