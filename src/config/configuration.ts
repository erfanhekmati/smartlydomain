export default () => ({
  app: {
    port: parseInt(process.env.PORT, 10) || 3000,
    version: '1.0.0',
  },
  swagger: {
    title: 'SmartlyDomain API Documentation',
    description: 'Using this API you can access to SmartlyDomain API.',
    path: 'api-docs',
  },
  mongo: {
    connection: { url: process.env.MONGO_CONN_URL },
  },
  openai: {
    apiKey: process.env.OPENAI_API_KEY,
  },
});
