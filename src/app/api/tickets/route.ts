import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import nodemailer from 'nodemailer';
import { createEvent } from 'ics';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { name, email, issue, scheduledDate, companySize } = await request.json();

    if (!name || !email || !issue) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    if (name.length > 100 || issue.length > 2000) {
      return NextResponse.json({ error: 'Input too long' }, { status: 400 });
    }

    const allowedCompanySizes = ['1-10', '11-25', '26-50', '51-100', '100+'];
    if (companySize && !allowedCompanySizes.includes(companySize)) {
      return NextResponse.json({ error: 'Invalid company size' }, { status: 400 });
    }

    const sanitizedName = name.trim().replace(/[<>]/g, '');
    const sanitizedIssue = issue.trim().replace(/[<>]/g, '');

    const date = scheduledDate ? new Date(scheduledDate) : null;
    if (scheduledDate && isNaN(date!.getTime())) {
      return NextResponse.json({ error: 'Invalid date format' }, { status: 400 });
    }

    const ticket = await prisma.ticket.create({
      data: {
        name: sanitizedName,
        email: email.trim(),
        issue: sanitizedIssue,
        companySize: companySize || null,
        scheduledDate: date
      }
    });

    // Email notification is optional - only attempt it if SMTP is configured
    if (process.env.SMTP_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const attachments: nodemailer.SendMailOptions['attachments'] = [];

      // Create ICS if date is provided
      if (date) {
        const { error, value } = createEvent({
          title: `IT Support: ${name}`,
          description: `Issue: ${issue}\nEmail: ${email}`,
          start: [date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes()],
          duration: { hours: 1 },
        });

        if (!error && value) {
          attachments.push({
            filename: 'support-schedule.ics',
            content: value,
            contentType: 'text/calendar'
          });
        }
      }

      try {
        await transporter.sendMail({
          from: `"IT Support System" <${process.env.EMAIL_USER}>`,
          to: process.env.EMAIL_USER, // Send to the admin
          subject: `New Free IT Audit Request from ${name}`,
          text: `Name: ${name}\nEmail: ${email}\nCompany size: ${companySize || 'Not provided'}\nIssue: ${issue}\nScheduled Date: ${date ? date.toLocaleString() : 'Not scheduled'}`,
          attachments
        });
      } catch (emailError) {
        console.error('SMTP Email failed to send, but ticket was saved to DB:', emailError);
        // We still return 201 because the ticket was successfully created in the database
        return NextResponse.json({ message: 'Ticket submitted to database successfully, but email notification failed.', ticket }, { status: 201 });
      }
    } else {
      console.warn('SMTP not configured - skipping ticket email notification.');
    }

    return NextResponse.json({ message: 'Ticket submitted successfully', ticket }, { status: 201 });
  } catch (error) {
    console.error('Ticket creation error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    // Verify admin
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (decoded.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const tickets = await prisma.ticket.findMany({
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ tickets }, { status: 200 });
  } catch (error) {
    console.error('Fetch tickets error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
