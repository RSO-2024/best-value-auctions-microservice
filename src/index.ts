import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerDefinition from './swaggerConfig';

dotenv.config();

function getMemoryUsage() {
    const memory = process.memoryUsage();
    return {
        heapUsed: Math.round(memory.heapUsed / 1024 / 1024), // MB
        heapTotal: Math.round(memory.heapTotal / 1024 / 1024), // MB
        external: Math.round(memory.external / 1024 / 1024), // MB
        rss: Math.round(memory.rss / 1024 / 1024) // MB
    };
  }

async function startServer() {
  const app = express();

  // Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use('/graphql', express.json(), expressMiddleware(server));

  // Swagger Documentation
  const swaggerSpec = swaggerJsDoc({
    swaggerDefinition,
    apis: ['./src/**/*.ts'], // Points to your source code
  });

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.get('/', (req, res) => {


    
    try {
      // Check required environment variables

  
      const memoryUsage = getMemoryUsage();
  
      res.status(200).json({
        status: "success",
        message: "Service is healthy and environment variables are set.",
        details: {
          'memoryUsage': memoryUsage,
        }
      });
    } catch (e) {

      console.error(e);
      res.status(500).json({
        status: "success",
        message: "Internal server error when checking health.",
      });
    }
  
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 GraphQL Server ready at http://localhost:${PORT}/graphql`);
    console.log(`📚 Swagger Docs available at http://localhost:${PORT}/api-docs`);
  });
}

startServer();


/*
SWAGGER UI GET ALL

{
  "query": "query GetAllAuctionListings { auctionListings { id created_at vendor vendorId title url firstReg mileage fuel transmission kw engineSize vin color vat margin location possiblePrice deliveryPrice reservedPrice deliveryWindowStart deliveryWindowEnd photos { id created_at auction_listing_id img number } } }"
}

react get all:


🚀 Fetch All Data from GraphQL in a TypeScript React App
Here's how you can create a React component using TypeScript to fetch all data from your GraphQL API and display it.

📦 1. Install Dependencies
Make sure you have these packages installed:

bash
Copy code
npm install @apollo/client graphql
npm install --save-dev @types/react @types/react-dom
📑 2. Apollo Client Setup
src/apolloClient.ts
typescript
Copy code
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:4000/graphql' }),
  cache: new InMemoryCache(),
});

export default client;
📝 3. Define the GraphQL Query
src/queries/getAllAuctionListings.ts
typescript
Copy code
import { gql } from '@apollo/client';

export const GET_ALL_AUCTION_LISTINGS = gql`
  query GetAllAuctionListings {
    auctionListings {
      id
      created_at
      vendor
      vendorId
      title
      url
      firstReg
      mileage
      fuel
      transmission
      kw
      engineSize
      vin
      color
      vat
      margin
      location
      possiblePrice
      deliveryPrice
      reservedPrice
      deliveryWindowStart
      deliveryWindowEnd
      photos {
        id
        created_at
        auction_listing_id
        img
        number
      }
    }
  }
`;

*/