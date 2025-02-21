import { courses, modules } from "@/src/schema/index";
import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import AsyncStorage from "expo-sqlite/kv-store"
import { eq } from "drizzle-orm"
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

        await db.insert(courses).values([{
            uuid,
            youtube,
            status
        }]).onConflictDoNothing({
            target: courses.youtube
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
        const response = await db.select().from(courses);
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
        
        const response = await db
            .update(courses)
            .set({
                status,
                title,
                author: authorName,
                category,
                totalPoints,
            })
            .where(eq(
                courses.uuid, uuid
            ))

            for (const segment of segments) {
                const segmentUUID = uuidv4();
                const { summary, transcription, questions } = segment;
                    await db.insert(modules).values([{
                        uuid: segmentUUID,
                        courseUuid: uuid,
                        summary,
                        transcription
                    }]);

                    for (const question of questions) {
                        /*
                        const { correctAnswer, options, explanation, points, question: _question} = question;
                        const questionUUID = uuidv4();

                        await db.insert(questions).values([{
                            uuid: questionUUID,
                            modulesUuid: segmentUUID,
                            question: _question,
                            correctAnswer, 
                            explanation,
                            points
                        }]);
                        */

                        /*
                        for (const option of options) {
                            const optionsUUID = uuidv4();

                            await db.insert(options).values([{
                                uuid: optionsUUID,
                                questionsUuid: questionUUID,
                                option
                            }]);
                        };
                        */
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
        await db.delete(courses).where(eq(courses.uuid, uuid));
    }catch(error){
        console.log(error)
    }
};