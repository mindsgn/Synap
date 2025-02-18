import Realm, { BSON } from "realm";

interface CoursesInterface {
  _id: BSON.ObjectID
  title: string;
  youtube: string;
}

class Courses extends Realm.Object<CoursesInterface> {
  //@ts-expect-error
  _id: BSON.ObjectId;
   //@ts-expect-error
  title: string;
   //@ts-expect-error
  youtube: string;
  createdAt!: Date;
  updatedAt!: Date;

  static schema = {
    name: "Courses",
    primaryKey: "_id",
    properties: {
      _id: "objectId",
      title: "string",
      youtube: "string",
      createdAt: "date",
      updatedAt: "date",
    },
  };
}

const SCHEMA_VERSION = 3;

export { Courses, SCHEMA_VERSION };
