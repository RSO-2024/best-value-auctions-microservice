const { supabase } = require('./supabaseClient');

interface AuctionListing {
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
  
  interface AuctionListingPhoto {
    id: number;
    created_at: string;
    auction_listing_id: number;
    img: string;
    number: number;
  }
  

export const resolvers = {
  Query: {
    auctionListings: async (): Promise<AuctionListing[]> => {
      const { data, error } = await supabase.from('auction_listings').select('*');
      if (error) throw new Error(error.message);
      return data || [];
    },
    auctionListing: async (_: unknown, { id }: { id: number }): Promise<AuctionListing> => {
      const { data, error } = await supabase
        .from('auction_listings')
        .select('*')
        .eq('id', id)
        .single();
      if (error) throw new Error(error.message);
      return data;
    },
    auctionListingPhotos: async (_: unknown, { auction_listing_id }: { auction_listing_id: number }): Promise<AuctionListingPhoto[]> => {
      const { data, error } = await supabase
        .from('auction_listing_photos')
        .select('*')
        .eq('auction_listing_id', auction_listing_id);
      if (error) throw new Error(error.message);
      return data || [];
    }
  },
  AuctionListing: {
    photos: async (parent: AuctionListing): Promise<AuctionListingPhoto[]> => {
      const { data, error } = await supabase
        .from('auction_listing_photos')
        .select('*')
        .eq('auction_listing_id', parent.id);
      if (error) throw new Error(error.message);
      return data || [];
    }
  }
};
