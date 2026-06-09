import { siteImages } from "./images";

export const projects = [
  {
    id: 1,
    title: "Smart Resume AI",
    description:
      "An AI-powered CV analysis platform designed for HR and recruiters to quickly analyze multiple resumes, extract key insights, and evaluate candidates efficiently. Helps companies streamline hiring by speeding up resume screening and improving decision-making.",
    tech: ["React", "Next.js", "Tailwind", "Node.js", "OpenAI API"],
    image: siteImages.smartResumeAi,
    liveUrl: "https://smart-resume-ai-eta.vercel.app/",
    githubUrl: "https://github.com/theirhasnain-eng/smart-resume-ai",
    featured: true,
  },
  {
    id: 2,
    title: "Portfolio-website",
    description:
      "An interactive developer portfolio built to showcase web development projects, expertise, and professional journey. Features responsive design, engaging animations, and optimized performance for a seamless user experience across all devices.",
    tech: ["React", "JS", "Local Storage", "Tailwind.css"],
    image:siteImages.portfolio ,
    liveUrl: "portfolio-chi-opal-97.vercel.app",
    githubUrl: "https://github.com/usmanali56/Portfolio.git",
    featured: true,
  },
  {
    id: 3,
    title: "Portfolio Website",
    description:
      "A modern and responsive personal portfolio website showcasing my projects, technical skills, experience, and achievements. Designed with a clean UI and smooth user experience to effectively highlight my work as a Frontend Developer.",
    tech: ["JavaScript", "React","HTML", "CSS", "Responsive"],
    image:  siteImages.myportfolio,
    liveUrl: "https://portfolio-website-q9wp.vercel.app/",
    githubUrl: "https://github.com/theirhasnain-eng/portfolio-website",
    featured: true,
  },
];
