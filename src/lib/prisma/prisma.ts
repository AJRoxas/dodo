import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'
import { Pool, neonConfig } from '@neondatabase/serverless'

import ws from 'ws';
neonConfig.webSocketConstructor = ws;

// To work in edge environments (Cloudflare Workers, Vercel Edge, etc.), enable querying over fetch
neonConfig.poolQueryViaFetch = true;

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

const connectionString = `${process.env.DATABASE_URL}`;

const pool = new Pool({ connectionString });
const adapter = new PrismaNeon(pool);
const prisma =  globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.APP_ENV === 'dev') globalForPrisma.prisma = prisma;

export default prisma;