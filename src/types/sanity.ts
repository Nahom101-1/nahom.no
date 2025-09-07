export type Poster = {
  _id: string;
  poster: string;
  image: SanityImage;
  imageUrl?: string;
  slug?: string;
};

export type Education = {
  _id: string;
  _type: string;
  picture?: SanityImage;
  institution: string;
  degree: string;
  fieldOfStudy?: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  gpa?: number;
  location?: string;
  institutionLogo?: SanityImage;
  imageUrl?: string;
};

export type WorkExperience = {
  _id: string;
  _type: string;
  picture?: SanityImage;
  company: string;
  position: string;
  location?: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  description?: string;
  technologies?: string[];
  learnings?: string[];
  imageUrl?: string;
};

// image type
export type SanityImage = {
  asset: {
    _ref: string;
    _type: string;
  };
  _type: string;
};
