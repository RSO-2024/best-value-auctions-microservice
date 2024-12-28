import { OpenAPIV3 } from 'openapi-types';

const swaggerDefinition: OpenAPIV3.Document = {
  openapi: '3.0.0',
  info: {
    title: 'Auction Listings API',
    version: '1.0.0',
    description: 'API Documentation for Auction Listings GraphQL API',
  },
  servers: [
    {
      url: 'http://localhost:4000',
      description: 'Development server',
    },
  ],
  paths: {
    '/graphql': {
      post: {
        summary: 'GraphQL API Endpoint',
        description: 'Execute GraphQL Queries and Mutations',
        operationId: 'executeGraphQL',
        requestBody: {
          description: 'GraphQL query or mutation',
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  query: {
                    type: 'string',
                    description: 'GraphQL query string',
                  },
                  variables: {
                    type: 'object',
                    description: 'Optional variables for the query',
                  },
                },
                required: ['query'],
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Successful GraphQL execution',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  example: {
                    data: {
                      auctionListings: [
                        {
                          id: 1,
                          title: 'Auction Item 1',
                          vendor: 123,
                        },
                      ],
                    },
                  },
                },
              },
            },
          },
          '400': {
            description: 'Invalid GraphQL query',
          },
          '500': {
            description: 'Internal Server Error',
          },
        },
      },
    },
  },
};

export default swaggerDefinition;
