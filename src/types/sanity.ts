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
  categoryNo?: string;
  skills: string[];
};

export type HeroHighlight = {
  label: string;
  labelNo?: string;
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
  tagline?: string;
  taglineNo?: string;
  portfolioIndex?: string;
  portfolioIndexNo?: string;
  metaDescription?: string;
  metaDescriptionNo?: string;
  heroHighlights?: HeroHighlight[];
  aboutHeading?: string;
  aboutSubheading?: string;
  aboutHeadingNo?: string;
  aboutSubheadingNo?: string;
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
  contactKicker?: string;
  contactHeading?: string;
  contactKickerNo?: string;
  contactHeadingNo?: string;
  emailMeLabel?: string;
  emailMeLabelNo?: string;
  resumeEnLabel?: string;
  resumeEnLabelNo?: string;
  resumeNoLabel?: string;
  resumeNoLabelNo?: string;
  footerNote?: string;
  offClockEnabled?: boolean;
  offClockHeading?: string;
  offClockHeadingNo?: string;
  offClockKicker?: string;
  offClockKickerNo?: string;
  nowPlayingLabel?: string;
  nowPlayingLabelNo?: string;
  nothingPlayingLabel?: string;
  nothingPlayingLabelNo?: string;
  nothingPlayingSub?: string;
  nothingPlayingSubNo?: string;
  recentlyWatchedLabel?: string;
  recentlyWatchedLabelNo?: string;
  navWork?: string;
  navWorkNo?: string;
  navExperience?: string;
  navExperienceNo?: string;
  navAbout?: string;
  navAboutNo?: string;
  navContact?: string;
  navContactNo?: string;
  resumeNavLabel?: string;
  resumeNavLabelNo?: string;
  sayHelloNavLabel?: string;
  sayHelloNavLabelNo?: string;
  workHeading?: string;
  workSubheading?: string;
  workHeadingNo?: string;
  workSubheadingNo?: string;
  experienceHeading?: string;
  experienceSubheading?: string;
  experienceHeadingNo?: string;
  experienceSubheadingNo?: string;
  educationHeading?: string;
  educationSubheading?: string;
  educationHeadingNo?: string;
  educationSubheadingNo?: string;
  languagesHeading?: string;
  languagesHeadingNo?: string;
  presentLabel?: string;
  presentLabelNo?: string;
  gradeLabel?: string;
  gradeLabelNo?: string;
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

export type SanityImage = {
  asset: {
    _ref: string;
    _type: string;
  };
  _type: string;
};
