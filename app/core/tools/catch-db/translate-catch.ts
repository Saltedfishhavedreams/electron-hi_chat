import Dexie from 'dexie'

const db: any = new Dexie('TKY_translate_catch')

db.version(0.1).stores({
  translate_catch_bd: '++id, message, translate_message, chatLanguage, translateIntoLanguage',
})

export default db
