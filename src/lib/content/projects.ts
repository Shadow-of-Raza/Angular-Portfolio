import data from '../../../utils/information.json';

export interface Project {
  title: string;
  image: string;
  githubLink: string;
  description: string;
  techStack: string[];
  liveDemoLink?: string;
  featured: boolean;
  category: string;
}

export const projects: Project[] = data.portfolio.map((item, index) => {
  let description = 'A software project built with standard engineering practices.';
  let techStack: string[] = ['Java', 'SQL', 'Bootstrap'];
  let featured = false;
  let category = 'Frontend';

  if (item.title.toLowerCase().includes('portfolio')) {
    description = 'A responsive, high-performance developer portfolio built with React & Next.js.';
    techStack = ['React', 'Next.js', 'TypeScript', 'Three.js', 'GSAP'];
    featured = true;
    category = 'Frontend';
  } else if (item.title.toLowerCase().includes('hotel') && item.title.toLowerCase().includes('clint')) {
    description = 'A responsive hotel booking client dashboard managing room displays and reservations.';
    techStack = ['Angular', 'Angular Material', 'TypeScript', 'HTML/CSS'];
    featured = true;
    category = 'Frontend';
  } else if (item.title.toLowerCase().includes('hotel') && item.title.toLowerCase().includes('server')) {
    description = 'REST API backend for hotel management system supporting rooms, bookings, and guest registration.';
    techStack = ['Spring Boot', 'Spring Data JPA', 'MySQL', 'REST API'];
    featured = true;
    category = 'Full Stack';
  } else if (item.title.toLowerCase().includes('bank')) {
    description = 'A secure online banking system managing accounts, transactions, and statements.';
    techStack = ['Java EE', 'Servlets', 'JSP', 'JDBC', 'MySQL'];
    featured = true;
    category = 'Full Stack';
  } else if (item.title.toLowerCase().includes('calculator')) {
    description = 'A interactive calculator web application supporting standard operations.';
    techStack = ['HTML', 'CSS', 'JavaScript'];
    category = 'Frontend';
  }

  return {
    title: item.title,
    image: item.image.replace('src/assets/', '/'),
    githubLink: item.github_link,
    description,
    techStack,
    liveDemoLink: undefined,
    featured,
    category,
  };
});
