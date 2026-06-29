import data from '../../../utils/information.json';

export interface WorkExperience {
  role: string;
  organization: string;
  employmentType: string;
  duration: string;
  length: string;
  location: string;
  responsibilities: string[];
  technologies: string[];
}

export interface Education {
  degree: string;
  fieldOfStudy: string;
  institution: string;
  location: string;
  studyType: string;
  duration: string;
  cgpa?: string;
}

export interface CategorizedSkills {
  languages: string[];
  frameworks: string[];
  databases: string[];
  cloud: string[];
  concepts: string[];
  tools: string[];
  operatingSystems: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  year: number;
}

export const experiences: WorkExperience[] = data.resume.experience.map((item) => ({
  role: item.role,
  organization: item.organization,
  employmentType: item.employment_type,
  duration: item.duration,
  length: item.length,
  location: item.location,
  responsibilities: item.responsibilities,
  technologies: item.technologies || [],
}));

export const education: Education[] = data.resume.education.map((item) => ({
  degree: item.degree,
  fieldOfStudy: item.field_of_study,
  institution: item.institution,
  location: item.location,
  studyType: item.study_type,
  duration: item.duration,
  cgpa: item.cgpa,
}));

export const skills: CategorizedSkills = {
  languages: data.resume.skills.languages,
  frameworks: data.resume.skills.frameworks,
  databases: data.resume.skills.databases,
  cloud: data.resume.skills.cloud,
  concepts: data.resume.skills.concepts,
  tools: data.resume.skills.tools,
  operatingSystems: data.resume.skills.operatingSystems,
};

export const certifications: Certification[] = data.resume.certifications.map((item) => ({
  name: item.name,
  issuer: item.issuer,
  year: item.year,
}));
