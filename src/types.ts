export interface AuctionListing {
    id: number;
    created_at: string;
    vendor: number;
    vendorId: string;
    title: string;
    url: string;
    firstReg: string;
    mileage: number;
    fuel: string;
    transmission: string;
    kw: number;
    engineSize: number;
    vin: string;
    color: string;
    vat: number;
    margin: boolean;
    location: string;
    possiblePrice: number;
    deliveryPrice: number;
    reservedPrice: number;
    deliveryWindowStart: string;
    deliveryWindowEnd: string;
  }
  
  export interface AuctionListingPhoto {
    id: number;
    created_at: string;
    auction_listing_id: number;
    img: string;
    number: number;
  }
  