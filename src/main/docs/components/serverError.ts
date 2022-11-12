export const serverError = {
  description: 'Erro de servidor',
  content: {
    'application/json': {
      schema: {
        $ref: '#/schemas/error',
      },
    },
  },
};
