const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getAllApplication() {
  try {
    const allApplication = await prisma.application.findMany();
    return allApplication;
  } catch (error) {
    console.error('Error fetching application:', error);
    throw error;
  }
}

getAllApplication()
  .then((application) => {
    console.log('All application:', application);
  })
  .catch((error) => {
    console.error('Error:', error);
  });