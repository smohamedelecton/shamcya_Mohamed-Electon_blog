export const up = async (db) => {
    await db.schema.alterTable("user", (table) => {
    table.text("passwordHash")
  })
}


export const down = async (db) => {
    await db.schema.alterTable("user", (table) => {
    table.dropColumn("passwordHash")
  })
}
