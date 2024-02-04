export const up = async (db) => {
      await db.schema.createTable("comments", (table) => {
    table.increments("idComments")
    table.text("descritpionComments").notNullable()
  })
  await db.schema.alterTable("comments", (table) => {
    table.integer("commentPostId").notNullable()
    table.foreign("commentPostId").references("idPosts").inTable("posts")
  })
    await db.schema.alterTable("comments", (table) => {
    table.integer("commentUserId").notNullable()
    table.foreign("commentUserId").references("idUser").inTable("user")
  })
}

export const down = async (db) => {
     await db.schema.alterTable("comments", (table) => {
    table.dropColumn("commentPostId")
   })
    await db.schema.alterTable("comments", (table) => {
    table.dropColumn("commentUserId")
  })
  await db.schema.dropTable("comments")
}
