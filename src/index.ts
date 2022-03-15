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
  return db.collection('counters').findOneAndUpdate(
      { _id: name },
      { $inc: { seq: 1 } },
      {upsert: true}
  ).then(() => db.collection('counters').findOne({_id: name})).then((doc: any) => doc.seq)
}

