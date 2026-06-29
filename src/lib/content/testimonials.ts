export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  organization: string;
}

export const testimonials: Testimonial[] = [
  {
    quote: "Mohd Ansar is an exceptionally dedicated Full Stack developer. During our projects, his technical expertise in Java and Angular, paired with his problem-solving skills, consistently drove our team forward.",
    author: "Technical Lead",
    role: "Project Mentor",
    organization: "EduBridge Learning"
  },
  {
    quote: "Ansar is a fast learner who adapted to complex backend APIs and database schemas with ease. His attention to detail in designing clean code and user-friendly interfaces was a huge asset.",
    author: "Senior Developer",
    role: "Peer Collaborator",
    organization: "Pentagon Space"
  }
];
