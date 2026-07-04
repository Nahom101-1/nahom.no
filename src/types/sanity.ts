export type Project = {
  _id: string;
  title: string;
  year: number;
  description: string;
  descriptionNo?: string;
  stack: string[];
  imageUrl?: string;
  link?: string;
  order?: number;
};

export type SkillGroup = {
  category: string;
  skills: string[];
};

export type HeroHighlight = {
  label: string;
  value: string;
};

export type Language = {
  name: string;
  level?: string;
};

export type SiteSettings = {
  name?: string;
  roleLabel?: string;
  roleLabelNo?: string;
  birthDate?: string;
  location?: string;
  locationNo?: string;
  tagline?: string;
  taglineNo?: string;
  heroHighlights?: HeroHighlight[];
  aboutText?: string[];
  aboutTextNo?: string[];
  portraitUrl?: string;
  languages?: Language[];
  toolkitHeading?: string;
  toolkitSubtitle?: string;
  toolkitHeadingNo?: string;
  toolkitSubtitleNo?: string;
  skillGroups?: SkillGroup[];
  marqueeWords?: string[];
  email?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  websiteUrl?: string;
  phone?: string;
  contactKicker?: string;
  contactHeading?: string;
  contactKickerNo?: string;
  contactHeadingNo?: string;
  footerNote?: string;
  offClockEnabled?: boolean;
  offClockKicker?: string;
  offClockKickerNo?: string;
};

export type Education = {
  _id: string;
  _type: string;
  picture?: SanityImage;
  institution: string;
  degree: string;
  degreeNo?: string;
  fieldOfStudy?: string;
  fieldOfStudyNo?: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  gpa?: string;
  location?: string;
  institutionLogo?: SanityImage;
  imageUrl?: string;
  relevantClasses?: RelevantClasses[];
};

export type WorkExperience = {
  _id: string;
  _type: string;
  picture?: SanityImage;
  company: string;
  position: string;
  positionNo?: string;
  location?: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  badge?: string;
  description?: string;
  descriptionNo?: string;
  technologies?: string[];
  learnings?: string[];
  learningsNo?: string[];
  imageUrl?: string;
};

export type RelevantClasses = {
  _id: string;
  courseCode: string;
  courseName: string;
  courseNameNo?: string;
  grade: string;
  year: number;
  education?: {
    _id: string;
  } | null;
};

// image type
export type SanityImage = {
  asset: {
    _ref: string;
    _type: string;
  };
  _type: string;
};
