export const stagingConfig = {
  secret: process.env.PAYLOAD_SECRET || '',
  url: 'http://localhost:4000',
  databaseURI: process.env.DATABASE_URI || 'mongodb://127.0.0.1/payload',
  title: 'Title',
  corsCsrfUrls: [
    'http://localhost:4000',
    'http://localhost:3000',
    'http://localhost:4001',
    'http://localhost:3001',
  ],
  frontendUrl: 'http://localhost:3000',
}
