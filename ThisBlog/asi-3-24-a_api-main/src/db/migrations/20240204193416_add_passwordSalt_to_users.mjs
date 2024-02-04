export const up = async (db) => {
     await db.schema.alterTable("user", (table) => {
    table.text("passwordSalt")
  })
}

export const down = async (db) => {
  await db.schema.alterTable("user", (table) => {
    table.dropColumn("passwordSalt")
  })
}
