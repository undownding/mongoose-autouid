import {Connection, Schema} from 'mongoose'

export function AutoIncUid(schema: Schema): void {
  schema.add({
    uid: {type: Number, unique: true},
  })

  schema.pre('save', async function(): Promise<void> {
    if (this.isNew) {
      return getNextSeq(this.db, this.collection.name)
          .then((seq) => {
            this.uid = seq
          })
    }
  })
}

async function getNextSeq(db: Connection, name: string): Promise<number> {
  return db.collection('counters').findAndModify(
    {_id: name},
    {_id: -1},
    {$inc: {seq: 1}},
    {new: true, upsert: true}
  ).then((doc: any) => doc.seq)
}

