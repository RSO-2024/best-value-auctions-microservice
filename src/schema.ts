import { gql } from 'apollo-server-express';

export const typeDefs = gql`
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
