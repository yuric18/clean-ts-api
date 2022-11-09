export const loginSchema = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      example: 'mail@mail.com',
      required: true,
    },
    password: {
      type: 'string',
      example: 'password',
      required: true,
    },
  },
};