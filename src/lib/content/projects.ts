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

export const projects: Project[] = data.portfolio.map((item) => {
  // Categorize based on stack content
  const stack = item.stack || [];
  const isFullStack = stack.includes('Java') || stack.includes('Spring Boot') || stack.includes('Node.js') || stack.includes('Express.js');
  const category = isFullStack ? 'Full Stack' : 'Frontend';

  return {
    title: item.name,
    image: item.image.replace('src/assets/', '/'),
    githubLink: item.github,
    description: item.description || 'A software project built with standard engineering practices.',
    techStack: stack,
    liveDemoLink: item.live || undefined,
    featured: true,
    category,
  };
});
