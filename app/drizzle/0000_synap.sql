CREATE TABLE `courses` (
	`uuid` text PRIMARY KEY NOT NULL,
	`status` text NOT NULL,
	`youtube` text NOT NULL,
	`title` text,
	`author` text,
	`category` text,
	`total_points` integer,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `modules` (
	`uuid` text PRIMARY KEY NOT NULL,
	`course_uuid` text NOT NULL,
	`summary` text,
	`transcription` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`course_uuid`) REFERENCES `courses`(`uuid`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `options` (
	`uuid` text PRIMARY KEY NOT NULL,
	`questions_uuid` text NOT NULL,
	`option` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`questions_uuid`) REFERENCES `questions`(`uuid`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `questions` (
	`uuid` text PRIMARY KEY NOT NULL,
	`modules_uuid` text NOT NULL,
	`question` text,
	`correct_answer` text,
	`explanation` text,
	`points` integer,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`modules_uuid`) REFERENCES `modules`(`uuid`) ON UPDATE no action ON DELETE no action
);
