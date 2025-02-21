import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';
import { relations } from 'drizzle-orm';

export const courses = sqliteTable('courses', {
	uuid: text('uuid').primaryKey(),
	status: text('status').notNull(),
	youtube: text('youtube').notNull().unique(),
	title: text('title'),
	author: text('author'),
	category: text('category'),
	totalPoints: integer('total_points'),
	createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
	updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

export const coursesRelations = relations(courses, ({ many }) => ({
	modules: many(modules),
}));

export const modules = sqliteTable('modules', {
	uuid: text('uuid').primaryKey(),
	courseUuid: text('course_uuid')
		.notNull()
		.references(() => courses.uuid),
	summary: text('summary'),
	transcription: text('transcription'),
	createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
	updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

export const modulesRelations = relations(modules, ({ one, many }) => ({
	course: one(courses, {
		fields: [modules.courseUuid],
		references: [courses.uuid],
	}),
	questions: many(questions),
}));

export const questions = sqliteTable('questions', {
	uuid: text('uuid').primaryKey(),
	modulesUuid: text('modules_uuid')
		.notNull()
		.references(() => modules.uuid),
	question: text('question'),
	correctAnswer: text('correct_answer'),
	explanation: text('explanation'),
	points: integer('points'),
	createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
	updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

export const questionsRelations = relations(questions, ({ one, many }) => ({
	module: one(modules, {
		fields: [questions.modulesUuid],
		references: [modules.uuid],
	}),
	options: many(options),
}));

export const options = sqliteTable('options', {
	uuid: text('uuid').primaryKey(),
	questionsUuid: text('questions_uuid')
		.notNull()
		.references(() => questions.uuid),
	option: text('option'),
	createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
	updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

export const optionsRelations = relations(options, ({ one }) => ({
	question: one(questions, {
		fields: [options.questionsUuid],
		references: [questions.uuid],
	}),
}));