export const signUpSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
    email: {
      type: 'string',
      example: 'mail@mail.com',
    },
    password: {
      type: 'string',
      example: 'password',
    },
    passwordConfirmation: {
      type: 'string',
    },
    role: {
      type: 'string',
      enum: ['admin'],
    },
  },
  required: ['name', 'email', 'password', 'passwordConfirmation'],
};