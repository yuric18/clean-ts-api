export const unauthorized = {
  description: 'Token inválido',
  content: {
    'application/json': {
      schema: {
        $ref: '#/schemas/error',
      },
    },
  },
};