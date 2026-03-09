import { PrismaClient } from "../generated/prisma/client.ts";
import { PrismaNeon } from '@prisma/adapter-neon'


const connectionString = `${process.env.DATABASE_URL}`
const adapter = new PrismaNeon({ connectionString })


const prisma = new PrismaClient({
    log: process.env.NODE_ENV === "dev" ? ["query", "error", "warn"] : ["error"],
    adapter
});

const connectDB = async () => {
  try {
      await prisma.$connect()
      console.log("DB Connect via Pisma");
  } catch (error) {
      console.error(`Database connection error: ${error.message}`);
      process.exit(1);
  }
};

const disconnectDB = async () => {
  await prisma.$disconnect()
};

export { prisma, connectDB, disconnectDB};