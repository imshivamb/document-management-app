import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { pgTable, text, integer, timestamp } from 'drizzle-orm/pg-core';

// Database connection
const pool = new Pool({
  connectionString: process.env.DRIZZLE_DATABASE_URL,
});

export const db = drizzle(pool);

// User table
export const users = pgTable('user', {
  id: text('id').notNull().primaryKey(),
  name: text('name'),
  email: text('email').notNull().unique(),
  emailVerified: timestamp('emailVerified'),
  image: text('image'),
  password: text('password').notNull(),
});

// Account table
export const accounts = pgTable('account', {
  userId: text('userId').notNull().references(() => users.id, { onDelete: 'cascade' }),
  type: text('type').notNull(),
  provider: text('provider').notNull(),
  providerAccountId: text('providerAccountId').notNull(),
  refresh_token: text('refresh_token'),
  access_token: text('access_token'),
  expires_at: integer('expires_at'),
  token_type: text('token_type'),
  scope: text('scope'),
  id_token: text('id_token'),
  session_state: text('session_state'),
});

// Session table
export const sessions = pgTable('session', {
  sessionToken: text('sessionToken').notNull().primaryKey(),
  userId: text('userId').notNull().references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires').notNull(),
});

// Verification token table
export const verificationTokens = pgTable('verificationToken', {
  identifier: text('identifier').notNull(),
  token: text('token').notNull(),
  expires: timestamp('expires').notNull(),
});

// Document table
export const documents = pgTable('document', {
  id: text('id').notNull().primaryKey(),
  name: text('name').notNull(),
  size: integer('size').notNull(),
  type: text('type').notNull(),
  url: text('url').notNull(),
  uploadDate: text('uploadDate').notNull(),
  userId: text('userId').notNull().references(() => users.id, { onDelete: 'cascade' }),
});