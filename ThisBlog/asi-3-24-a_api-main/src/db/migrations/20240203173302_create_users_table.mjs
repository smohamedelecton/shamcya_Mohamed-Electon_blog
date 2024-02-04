export const up = async (db) => {
  await db.schema.createTable("user", (table) => {
    table.increments("idUser")
    table.text("name").notNullable()
    table.text("lastName").notNullable()
    table.text("mail").notNullable()
  })
}

export const down = async (db) => {
  await db.schema.dropTable("user")
  
}
