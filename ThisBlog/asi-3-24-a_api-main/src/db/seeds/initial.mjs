import { faker } from "@faker-js/faker"

export const seed = async db => {
  await db("comments").del()
  await db("posts").del()
  await db("user").del()

  const dataUser = [...Array(5)].map(() => ({
      name: faker.person.firstName(),
      lastName: faker.person.lastName(),
      mail: faker.internet.email(),
      passwordHash: faker.string.alpha(12),
      passwordSalt: faker.string.alpha(8),
  }))
  await db("user").insert(dataUser)

  const users = await db("user").select("idUser")

  for (const user of users) {
    await db("posts").insert(
      [...Array(10)].map(() => ({
        descriptionPosts: faker.lorem.paragraph(),
        postUserId: user.idUser,
      }))
    )
  }

  const posts = await db("posts").select("idPosts")

  posts.forEach(async posts => {
    await db("comments").insert(
      [...Array(5)].map(() => ({
        descritpionComments:  faker.word.words({ count: { min: 2, max: 10 } }),
        commentPostId: faker.number.int({ min: 0, max: posts.length - 1 }).idPosts,
        commentUserId: faker.number.int({ min: 0, max: posts.length - 1 }).idUser,
      }))
    )
  })
}





