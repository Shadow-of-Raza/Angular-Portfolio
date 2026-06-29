import data from '../../../utils/information.json';

export interface Project {
  title: string;
  image: string;
  githubLink: string;
  description: string; // We can add descriptions or leave them to be populated
  techStack: string[];  // We can add tech stack arrays
  liveDemoLink?: string; // Optional live demo link
  featured: boolean;     // Whether it's a featured project
}

export const projects: Project[] = data.portfolio.map((item, index) => {
  // Let's add some default metadata for description/techstack based on the project names
  let description = 'A software project built with standard engineering practices.';
  let techStack: string[] = ['Java', 'SQL', 'Bootstrap'];
  let featured = false;
  let liveDemoLink: string | undefined = undefined;

  if (item.title.toLowerCase().includes('portfolio')) {
    description = 'A responsive, high-performance developer portfolio built with React & Next.js.';
    techStack = ['React', 'Next.js', 'TypeScript', 'Three.js', 'GSAP'];
    featured = true;
  } else if (item.title.toLowerCase().includes('hotel')) {
    description = 'A comprehensive hotel management system with a Client UI and server backend.';
    techStack = ['Angular', 'Spring Boot', 'MySQL', 'REST API'];
    featured = index === 1 || index === 2; // Make one of them featured
  } else if (item.title.toLowerCase().includes('bank')) {
    description = 'A secure online banking system managing accounts, transactions, and statements.';
    techStack = ['Java EE', 'Servlets', 'JSP', 'JDBC', 'MySQL'];
    featured = true;
  } else if (item.title.toLowerCase().includes('calculator')) {
    description = 'A interactive calculator web application supporting standard operations.';
    techStack = ['HTML', 'CSS', 'JavaScript'];
  }

  return {
    title: item.title,
    image: item.image.replace('src/assets/', '/'),
    githubLink: item.github_link,
    description,
    techStack,
    liveDemoLink,
    featured,
  };
});
