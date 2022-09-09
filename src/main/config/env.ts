export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/clean-node-api',
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || '49587tw0df9j==1',
  salt: process.env.SALT || '12',
};
