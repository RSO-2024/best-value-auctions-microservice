import { supabase } from './supabaseClient';
import { AuctionListing, AuctionListingPhoto } from './types';

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
