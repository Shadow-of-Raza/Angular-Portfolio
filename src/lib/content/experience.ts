import data from '../../../context/Information.json';

export interface WorkExperience {
  role: string;
  organization: string;
  employmentType: string;
  duration: string;
  length: string;
  location: string;
  description: string;
}

export interface Education {
  degree: string;
  fieldOfStudy: string;
  institution: string;
  location: string;
  studyType: string;
  duration: string;
}

export interface Skill {
  name: string;
  levelPercentage: number;
}

export const experiences: WorkExperience[] = data.resume.experience.map((item) => ({
  role: item.role,
  organization: item.organization,
  employmentType: item.employment_type,
  duration: item.duration,
  length: item.length,
  location: item.location,
  description: item.description,
}));

export const education: Education[] = data.resume.education.map((item) => ({
  degree: item.degree,
  fieldOfStudy: item.field_of_study,
  institution: item.institution,
  location: item.location,
  studyType: item.study_type,
  duration: item.duration,
}));

export const skills: Skill[] = data.resume.skills.map((item) => ({
  name: item.name,
  levelPercentage: item.level_percentage,
}));
