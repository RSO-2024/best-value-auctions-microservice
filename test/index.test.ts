const { ApolloServer } = require('@apollo/server');
const { after, before, describe, it } = require('node:test');
const { resolvers } = require('./resolvers');
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type AuctionListing {
    id: ID!
    created_at: String
    vendor: Int
    vendorId: String
    title: String
    url: String
    firstReg: String
    mileage: Int
    fuel: String
    transmission: String
    kw: Int
    engineSize: Int
    vin: String
    color: String
    vat: Int
    margin: Boolean
    location: String
    possiblePrice: Float
    deliveryPrice: Float
    reservedPrice: Float
    deliveryWindowStart: String
    deliveryWindowEnd: String
    photos: [AuctionListingPhoto]
  }

  type AuctionListingPhoto {
    id: ID!
    created_at: String
    auction_listing_id: Int
    img: String
    number: Int
  }

  type Query {
    auctionListings: [AuctionListing]
    auctionListing(id: ID!): AuctionListing
    auctionListingPhotos(auction_listing_id: ID!): [AuctionListingPhoto]
  }
`;

const queryData = {
  query: `query AuctionListing {
    auctionListing(id: "69") {
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
        id
    }
}

`,
};

describe('e2e demo', () => {
  let server: typeof ApolloServer;

  // before the tests we spin up a new Apollo Server
  before(async () => {
    server = new ApolloServer({
      typeDefs,
      resolvers,
    });

    await server.start();
    console.log('Server started');
  });

  // after the tests we'll stop the server
  after(async () => {
    await server.stop();
    console.log('Server stopped');
  });

  it('fetches auction listing by id', async () => {
    // send our request directly to the Apollo Server
    const response = await server.executeOperation({
      query: queryData.query,
    });

    console.log(response.body.singleResult.data.auctionListing);
    let res = response.body.singleResult.data.auctionListing;
    const expected = {
        created_at: '2024-12-15T20:54:35.136545+00:00',
        vendor: 1,
        vendorId: '8829242',
        title: 'MERCEDES-BENZ GLC 300E BUSINESS - 4-MATIC - HIBRID - SAMODEJNI - 211 HP - 93.528 KM',
        url: 'https://www.openlane.eu/sl/car/info?auctionId=8829242',
        firstReg: '2021-11-25',
        mileage: 93528,
        fuel: 'Benzin/Elektro-PlugIn (PHEV)',
        transmission: 'Samodejni menjalnik',
        kw: 155,
        engineSize: 1991,
        vin: 'W1N2539531G025815',
        color: 'Crna',
        vat: 19,
        margin: null,
        location: 'NL Raamsdonksveer (Nizozemska)',
        possiblePrice: 28000,
        deliveryPrice: 570,
        reservedPrice: null,
        deliveryWindowStart: '2024-12-26',
        deliveryWindowEnd: '2025-02-07',
        id: '69'
    };

    if (JSON.stringify(res) === JSON.stringify(expected)) {
        console.log('Test passed');
    } else {
        console.log('Test failed');
    }
  });
});