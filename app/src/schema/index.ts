import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';
import { relations } from 'drizzle-orm';

export const coursesSchema = sqliteTable('courses', {
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

export const coursesRelations = relations(coursesSchema, ({ many }) => ({
	modules: many(modulesSchema),
}));

export const modulesSchema = sqliteTable('modules', {
	uuid: text('uuid').primaryKey(),
	courseUuid: text('course_uuid')
		.notNull()
		.references(() => coursesSchema.uuid),
	summary: text('summary'),
	transcription: text('transcription'),
	createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
	updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

export const modulesRelations = relations(modulesSchema, ({ one, many }) => ({
	course: one(coursesSchema, {
		fields: [modulesSchema.courseUuid],
		references: [coursesSchema.uuid],
	}),
	questions: many(questionsSchema),
}));

export const questionsSchema = sqliteTable('questions', {
	uuid: text('uuid').primaryKey(),
	modulesUuid: text('modules_uuid')
		.notNull()
		.references(() => modulesSchema.uuid),
	question: text('question'),
	correctAnswer: text('correct_answer'),
	explanation: text('explanation'),
	points: integer('points'),
	createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
	updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

export const questionsRelations = relations(questionsSchema, ({ one, many }) => ({
	module: one(modulesSchema, {
		fields: [questionsSchema.modulesUuid],
		references: [modulesSchema.uuid],
	}),
	options: many(optionsSchema),
}));

export const optionsSchema = sqliteTable('options', {
	uuid: text('uuid').primaryKey(),
	questionsUuid: text('questions_uuid')
		.notNull()
		.references(() => questionsSchema.uuid),
	option: text('option'),
	createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
	updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

export const optionsRelations = relations(optionsSchema, ({ one }) => ({
	question: one(questionsSchema, {
		fields: [optionsSchema.questionsUuid],
		references: [questionsSchema.uuid],
	}),
}));

export const pointsSchema = sqliteTable('points', {
	uuid: text('uuid').primaryKey(),
	questionsUuid: text('questions_uuid')
		.notNull()
		.references(() => questionsSchema.uuid),
	correct: integer('correct', { mode: 'boolean' }).notNull(),
	createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
	updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

export const pointsRelations = relations(pointsSchema, ({ one }) => ({
	question: one(questionsSchema, {
		fields: [pointsSchema.questionsUuid],
		references: [questionsSchema.uuid],
	}),
}));