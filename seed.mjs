import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('Adminpass2?', 10);
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin' },
    update: {
      password: hashedPassword,
      role: 'ADMIN'
    },
    create: {
      email: 'admin',
      password: hashedPassword,
      role: 'ADMIN'
    }
  });

  console.log('Admin user created/updated:', admin.email);
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
