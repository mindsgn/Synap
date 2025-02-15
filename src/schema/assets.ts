import Realm, { BSON } from "realm";

class Content extends Realm.Object<any> {
  //@ts-expect-error
  _id: BSON.ObjectId;
  //@ts-expect-error
  title: string;
  //@ts-expect-error
  content: string;
  //@ts-expect-error
  youtube: string;
  createdAt!: Date;
  updatedAt!: Date;

  static schema = {
    name: "Content",
    primaryKey: "_id",
    properties: {
      _id: "objectId",
      content: "string",
      youtube: "string",
      createdAt: "date",
      updatedAt: "date",
    },
  };
}

const SCHEMA_VERSION = 1;

export { Content, SCHEMA_VERSION };
