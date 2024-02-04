export const up = async (db) => {
    await db.schema.alterTable("user", (table) => {
    table.boolean("type")
  })
}


export const down = async (db) => {
    await db.schema.alterTable("user", (table) => {
    table.dropColumn("type")
  })
}
