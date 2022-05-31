# mongoose-autouid

Add an auto inc field named uid for schema.

usage:

```typescript
import {AutoIncUid} from 'mongoose-autouid'

schema.plugin(AutoIncUid)
```

for NestJS:

```typescript
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = getSchema(User)
          schema.plugin(AutoIncUid)
          return schema
        },
      },
    ]),
```

in user.model.ts

```typescript
@model('user', {timestamps: true})
export class User extends Model<User> implements IUserSchema {
  ...
  @prop() @unique() public uid: number
}
```
