CREATE TABLE `points` (
	`uuid` text PRIMARY KEY NOT NULL,
	`questions_uuid` text NOT NULL,
	`correct` integer NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`questions_uuid`) REFERENCES `questions`(`uuid`) ON UPDATE no action ON DELETE no action
);
