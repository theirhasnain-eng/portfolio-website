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
      "Kanban-style project management dashboard with drag-and-drop boards, dark mode, and real-time task updates.",
    tech: ["React", "JS", "Local Storage", "Tailwind.css"],
    image:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&q=80",
    liveUrl: "https://usman.zogofy.com/",
    githubUrl: "https://github.com",
    featured: true,
  },
  {
    id: 3,
    title: "WeatherScope Pro",
    description:
      "Beautiful weather application with 7-day forecasts, geolocation, animated icons, and glassmorphism UI design.",
    tech: ["JavaScript", "OpenWeather API", "CSS", "Responsive"],
    image:
      "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&q=80",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: true,
  },
];
