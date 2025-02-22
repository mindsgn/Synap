import { coursesSchema, modulesSchema, questionsSchema, optionsSchema } from "@/src/schema/index";
import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import AsyncStorage from "expo-sqlite/kv-store";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

export const addCourse = async({
    db,
    uuid,
    youtube,
    status
}:{
    db: ExpoSQLiteDatabase,
    uuid: string,
    youtube: string,
    status: string
}) => {  
    try{
        const value = AsyncStorage.getItemSync("dbInitialized");
        if(value) return;

        await db.insert(coursesSchema).values([{
            uuid,
            youtube,
            status
        }]).onConflictDoNothing({
            target: coursesSchema.youtube
        });
    }catch(error){
        console.log(error)
    }
};

export const getAllCourses = async({
    db
}:{
    db: ExpoSQLiteDatabase
}) => {
    try{
        const value = AsyncStorage.getItemSync("dbInitialized");
        if(value) return;
        const response = await db.select().from(coursesSchema);
        return response;
    }catch(error){
        console.log(error)
    }
};

export const getCourse = async({
    db,
    uuid
}:{
    db: ExpoSQLiteDatabase
    uuid: string
}) => {
    try{
        const value = AsyncStorage.getItemSync("dbInitialized");
        if(value) return;
        const response = await db.select().from(coursesSchema).where(eq(coursesSchema.uuid, uuid));;
        return response;
    }catch(error){
        console.log(error)
    }
};

export const updateCourse = async({
    db,
    status,
    title,
    authorName,
    category,
    totalPoints,
    uuid,
    segments
}:{
    db: ExpoSQLiteDatabase,
    status: string
    title: string
    authorName: string,
    category: string
    totalPoints: number,
    uuid: string
    segments: any[]
}) => {
    try{
        const value = AsyncStorage.getItemSync("dbInitialized");
        if(value) return;
        
        await db
            .update(coursesSchema)
            .set({
                status,
                title,
                author: authorName,
                category,
                totalPoints,
            })
            .where(eq(
                coursesSchema.uuid, uuid
            ))

            for (const segment of segments) {
                const segmentUUID = uuidv4();
                const { summary, transcription, questions } = segment;
                    await db.insert(modulesSchema).values([{
                        uuid: segmentUUID,
                        courseUuid: uuid,
                        summary,
                        transcription
                    }]);

                    for (const question of questions) {
                        const { correctAnswer, options, explanation, points, question: _question} = question;
                        const questionUUID = uuidv4();

                        await db.insert(questionsSchema).values([{
                            uuid: questionUUID,
                            modulesUuid: segmentUUID,
                            question: _question,
                            correctAnswer: options[parseInt(`${correctAnswer}`)], 
                            explanation,
                            points
                        }]); 

                        for (const option of options) {
                            const optionUUID = uuidv4();
    
                            await db.insert(optionsSchema).values([{
                                uuid: optionUUID,
                                questionsUuid: questionUUID,
                                option,
                            }]); 
                        };
                    };
            }
    }catch(error){
        console.log(error)
    }
};

export const deleteCourse = async(
    {
        db,
        uuid,
    }:{
        db: ExpoSQLiteDatabase,
        uuid: string,
    }
) => {
    try{
        await db.delete(coursesSchema).where(eq(coursesSchema.uuid, uuid));
    }catch(error){
        console.log(error)
    }
};

export const getQuestions = async({
    db,
    uuid,
}:{
    db: ExpoSQLiteDatabase,
    uuid: string,
}) => {
    const response = await db.select({
        course_title: coursesSchema.title,
        course_author: coursesSchema.author,
        module_uuid: modulesSchema.uuid,
        question_uuid: questionsSchema.uuid,
        question: questionsSchema.question,
        correct_answer: questionsSchema.correctAnswer,
        explanation: questionsSchema.explanation,
        points: questionsSchema.points,
        option_uuid: optionsSchema.uuid,
        option_text: optionsSchema.option,
      })
      .from(coursesSchema)
      .leftJoin(modulesSchema, eq(coursesSchema.uuid, modulesSchema.courseUuid))
      .leftJoin(questionsSchema, eq(modulesSchema.uuid, questionsSchema.modulesUuid))
      .leftJoin(optionsSchema, eq(questionsSchema.uuid, optionsSchema.questionsUuid))
      .where(eq(coursesSchema.uuid, uuid));

    return response
}

export const getAllOptions = async({
    db,
    uuid,
}:{
    db: ExpoSQLiteDatabase,
    uuid: string,
}) => {
    const value = AsyncStorage.getItemSync("dbInitialized");
    if(value) return;
    const response = await db.select().from(optionsSchema).where(eq(optionsSchema.questionsUuid, uuid));;
    return response;
}