import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { db } from '@/lib/db'
import { users } from '@/lib/db'
import { eq } from 'drizzle-orm'
import {v4 as uuidv4 } from 'uuid'

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()

    // Check if user already exists
    const existingUser = await db.select().from(users).where(eq(users.email, email)).get()
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 })
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)
    const id = uuidv4()

    // Create new user
    await db.insert(users).values({
        id,
      name,
      email,
      password: hashedPassword,
    })

    return NextResponse.json({ message: 'User created successfully' }, { status: 201 })
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json({ message: 'An error occurred during sign up' }, { status: 500 })
  }
}