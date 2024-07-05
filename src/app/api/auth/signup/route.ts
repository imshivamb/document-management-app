import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { db } from '@/lib/db'
import { users } from '@/lib/db'
import { eq } from 'drizzle-orm'
import { v4 as uuidv4 } from 'uuid'

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()

    // Basic input validation
    if (!name || !email || !password) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 })
    }

    if (password.length < 8) {
      return NextResponse.json({ message: 'Password must be at least 8 characters long' }, { status: 400 })
    }

    // Check if user already exists
    const existingUsers = await db.select().from(users).where(eq(users.email, email)).execute()
    if (existingUsers.length > 0) {
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
    if (error instanceof Error) {
      // Check if the error is due to a unique constraint violation
      if (error.message.includes('duplicate key value violates unique constraint')) {
        return NextResponse.json({ message: 'Email already in use' }, { status: 400 })
      }
    }
    return NextResponse.json({ message: 'An error occurred during sign up' }, { status: 500 })
  }
}