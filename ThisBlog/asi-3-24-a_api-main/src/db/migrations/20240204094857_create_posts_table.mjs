export const up = async (db) => {
      await db.schema.createTable("posts", (table) => {
    table.increments("idPosts")
    table.text("descriptionPosts").notNullable()
    })
    await db.schema.alterTable("posts", (table) => {
    table.integer("postUserId").notNullable()
    table.foreign("postUserId").references("idUser").inTable("user")
  })
}

export const down = async (db) => {
    await db.schema.alterTable("posts", (table) => {
    table.dropColumn("postUserId")
  })
  await db.schema.dropTable("posts")
}
