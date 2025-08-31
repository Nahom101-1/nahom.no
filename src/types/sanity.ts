export type Poster = {
  _id: string;
  poster: string;
  image: SanityImage;
  imageUrl?: string;
  slug?: string;
};

// image type
export type SanityImage = {
  asset: {
    _ref: string;
    _type: string;
  };
  _type: string;
};
