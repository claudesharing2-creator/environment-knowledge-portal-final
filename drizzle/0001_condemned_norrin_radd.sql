CREATE TABLE `handover_items` (
	`id` int AUTO_INCREMENT NOT NULL,
	`projectId` int NOT NULL,
	`taskExternalId` varchar(128) NOT NULL,
	`itemStatus` varchar(32) NOT NULL DEFAULT 'NOT_STARTED',
	`note` text,
	`orderIndex` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `handover_items_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `handover_notes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`projectId` int NOT NULL,
	`body` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `handover_notes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `handover_projects` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`status` varchar(32) NOT NULL DEFAULT 'IN_PROGRESS',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `handover_projects_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `portal_records` (
	`id` int AUTO_INCREMENT NOT NULL,
	`recordType` varchar(64) NOT NULL,
	`externalId` varchar(128) NOT NULL,
	`title` varchar(512) NOT NULL,
	`status` varchar(64) NOT NULL DEFAULT 'SOURCE_SUPPORTED',
	`data` text NOT NULL,
	`sourceRefs` text NOT NULL,
	`searchText` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `portal_records_id` PRIMARY KEY(`id`),
	CONSTRAINT `portal_records_externalId_unique` UNIQUE(`externalId`)
);
