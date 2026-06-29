import data from '../../../utils/information.json';

export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  alternatePhone: string;
  birthday: string;
  location: {
    city: string;
    state: string;
    country: string;
    pincode: string;
    displayAddress: string;
    hometownContext: string;
    mapUrl: string;
  };
  profileImage: string;
  resumePdf: string;
}

export interface SocialLinks {
  linkedin: string;
  github: string;
  instagram: string;
  facebook: string;
  twitter: string;
}

export interface HomeContent {
  introTitle: string;
  typingTitles: string[];
  briefIntro: string;
}

export interface WhatIDoItem {
  title: string;
  description: string;
  icon: string;
}

export interface CompetencyItem {
  title: string;
  description: string;
  icon: string;
}

export interface AboutContent {
  welcomeMessage: string;
  bio: string;
  whatIDo: WhatIDoItem[];
  competencies: CompetencyItem[];
}

export const personalInfo: PersonalInfo = {
  name: data.personal_info.name,
  title: data.personal_info.title,
  email: data.personal_info.email,
  phone: data.personal_info.phone,
  alternatePhone: data.personal_info.alternate_phone,
  birthday: data.personal_info.birthday,
  location: {
    city: data.personal_info.location.city,
    state: data.personal_info.location.state,
    country: data.personal_info.location.country,
    pincode: data.personal_info.location.pincode,
    displayAddress: data.personal_info.location.display_address,
    hometownContext: data.personal_info.location.hometown_context,
    mapUrl: data.contact.google_map_embed_url,
  },
  // Map src/assets/ path to next.js public/ path
  profileImage: data.personal_info.profile_image.replace('src/assets/', '/'),
  resumePdf: data.personal_info.resume_pdf.replace('src/assets/', '/'),
};

export const socialLinks: SocialLinks = {
  linkedin: data.social_links.linkedin,
  github: data.social_links.github,
  instagram: data.social_links.instagram,
  facebook: data.social_links.facebook,
  twitter: data.social_links.twitter,
};

export const homeContent: HomeContent = {
  introTitle: data.home.intro_title,
  typingTitles: data.home.typing_titles,
  briefIntro: data.home.brief_intro,
};

export const aboutContent: AboutContent = {
  welcomeMessage: data.about.welcome_message,
  bio: data.about.bio,
  whatIDo: data.about.what_i_do,
  competencies: data.about.competencies,
};
