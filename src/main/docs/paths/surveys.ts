export const surveysPath = {
  get: {
    security: [
      {
        apiKeyAuth: [],
      },
    ],
    tags: ['Enquete'],
    summary: 'API para listar todas as enquetes',
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                $ref: '#/schemas/survey',
              },
            },
          },
        },
      },
      403: {
        $ref: '#/components/forbidden',
      },
      404: {
        $ref: '#/components/notFound',
      },
      500: {
        $ref: '#/components/serverError',
      },
    },
  },
  post: {
    security: [
      {
        apiKeyAuth: [],
      },
    ],
    tags: ['Enquete'],
    summary: 'API para criar nova enquete',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/addSurvey',
          },
        },
      },
    },
    responses: {
      204: {
        description: 'Sucesso',
      },
      403: {
        $ref: '#/components/forbidden',
      },
      404: {
        $ref: '#/components/notFound',
      },
      500: {
        $ref: '#/components/serverError',
      },
    },
  },
};
