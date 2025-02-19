import Realm, { BSON } from "realm";


class Segment extends Realm.Object {
  authorName!: string;
  category!: string;
  // questions!: Realm.List<Question>;
  summary!: string;
  title!: string;
  totalPoints!: number;
  transcription!: string;

  static schema: Realm.ObjectSchema = {
    name: "Segment",
    embedded: true,
    properties: {
      authorName: "string",
      category: "string",
      // questions: { type: "list", objectType: "Question" }, 
      summary: "string",
      title: "string",
      totalPoints: "int",
      transcription: "string",
    },
  };
}

class Question extends Realm.Object {
  question!: string;
  options!: string[];
  correctAnswer!: number;
  explanation!: string;
  points!: number;

  static schema: Realm.ObjectSchema = {
    name: "Question",
    embedded: true, 
    properties: {
      question: "string",
      options: { type: "list", objectType: "string" },
      correctAnswer: "int",
      explanation: "string",
      points: "int",
    },
  };
}

class Courses extends Realm.Object {
  _id!: BSON.ObjectID;
  // segments!: Realm.List<Segment>;
  status!: string;
  youtube!: string;

  static schema: Realm.ObjectSchema = {
    name: "Courses",
    primaryKey: "_id",
    properties: {
      _id: "objectId",
      // segments: { type: "list", objectType: "Segment" },
      status: "string",
      youtube: "string",
    },
  };
}


const SCHEMA_VERSION = 10;

export { Courses, Segment, Question, SCHEMA_VERSION };