export interface IAbout {
  title: string;
  description: string;
  imgUrl: string; // Path to local asset
}

export interface IProject {
  title: string;
  description: string;
  projectLink: string;
  codeLink: string;
  imgUrl: string; // Path to local asset
  tags: string[];
  featured?: boolean;
}

export interface ISkill {
  name: string;
  bgColor: string;
  icon: string; // Path to local asset or inline SVG
  category: "frontend" | "backend" | "devops" | "database" | "other";
}

export interface IWorkExperience {
  role: string;
  company: string;
  duration: string;
  desc: string[];
}

export interface IExperienceTimeline {
  year: string;
  works: IWorkExperience[];
}

export interface IResumeData {
  name: string;
  title: string;
  profileSummary: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  hashnode: string;
  portfolio: string;
  areasOfExpertise: string[];
  education: {
    degree: string;
    institution: string;
    duration: string;
    gpaOrGrade: string;
    location: string;
  }[];
  awards: string[];
}

// ----------------------------------------------------
// PORTFOLIO AND RESUME STATIC DATABASE
// ----------------------------------------------------

export const resumeInfo: IResumeData = {
  name: "Mohamed Abdulla",
  title: "Full Stack Software Engineer",
  profileSummary: 
    "Full Stack Software Engineer with nearly 4 years of experience designing, building, and operating production-grade systems for thousands of active users. Owns architecture end to end: API design, event-driven services, authentication and identity infrastructure, observability, and database performance across FastAPI, NestJS, Kafka, RabbitMQ, PostgreSQL, and Docker/Swarm. Also ships cross-platform mobile applications in Flutter, published to the App Store and Google Play, and builds SEO-optimized web platforms in Next.js.",
  email: "abdabdulla78@gmail.com",
  phone: "+91-6382344165",
  github: "https://github.com/Mohamed-Abdulla",
  linkedin: "https://www.linkedin.com/in/mohamed-abdulla-a4084922a/",
  hashnode: "https://mohamed786.hashnode.dev/",
  portfolio: "https://mohamedabdulla.dev", // Proposed portfolio link
  areasOfExpertise: [
    "Backend & API Architecture",
    "Event-Driven Systems (Kafka, RabbitMQ)",
    "Authentication & Identity (OAuth2, OIDC, Keycloak, RBAC, Vault)",
    "System Design & Microservices",
    "Python (FastAPI)",
    "Node.js & NestJS",
    "REST & GraphQL APIs",
    "Observability (ELK Stack, Filebeat, Uptime Kuma)",
    "Database Optimization (PostgreSQL, MySQL, Oracle)",
    "Cloud & DevOps (Docker, Swarm, AWS, Nginx, CI/CD)",
    "SEO & Web Performance",
    "Flutter Mobile (iOS & Android)"
  ],
  education: [
    {
      degree: "B.Tech in Information Technology",
      institution: "Francis Xavier Engineering College",
      duration: "2022 – 2025",
      gpaOrGrade: "GPA: 8",
      location: "Tirunelveli, India"
    },
    {
      degree: "Diploma in Electrical and Electronics Engineering",
      institution: "Sankar Polytechnic College",
      duration: "2017 – 2020",
      gpaOrGrade: "94%",
      location: "Tirunelveli, India"
    }
  ],
  awards: [
    "Awarded the Buddy Professional Award in 2nd year of B.Tech for consistent professionalism, collaboration, and peer leadership",
    "Selected for the highest-paid internship in the cohort based on technical skills, interview performance, and real-world project capability"
  ]
};

export const aboutsData: IAbout[] = [
  {
    title: "Full Stack Developer",
    description: "I build robust applications from frontend to backend — delivering fast, scalable, and user-focused experiences using Flutter, Next.js, Node.js, and more.",
    imgUrl: "/assets/bgIMG.png"
  },
  {
    title: "Mobile App Developer",
    description: "I craft high-performance, cross-platform mobile apps using Flutter — designed for speed, scalability, and beautiful native-like experiences.",
    imgUrl: "/assets/mobile.png"
  },
  {
    title: "Deployment Architect",
    description: "I handle deployments like a pro — containerizing apps with Docker, configuring Nginx, and managing CI/CD workflows for smooth, scalable production releases.",
    imgUrl: "/assets/docker.svg"
  },
  {
    title: "Freelancer & Consultant",
    description: "I collaborate with clients to deliver tailored digital solutions — balancing form and function with clear communication and fair pricing.",
    imgUrl: "/assets/circle.svg"
  }
];

export const projectsData: IProject[] = [
  // 1. Mobile Apps (From Resume highlights)
  {
    title: "VitaliT Fitness App",
    description: "Led backend and mobile architecture for a production Flutter fitness app featuring AI-powered meal recommendations, gamification modules, subscriptions, and payment gateways. Published to the iOS App Store.",
    projectLink: "https://apps.apple.com/app/vitalit", // Placeholder/Actual App link
    codeLink: "https://github.com/Mohamed-Abdulla",
    imgUrl: "/assets/mobile.png",
    tags: ["Mobile App", "Full Stack", "Featured"],
    featured: true
  },
  {
    title: "ContractorSync Workforce Platform",
    description: "Designed enterprise attendance tracking client app in Flutter and built a FastAPI/Oracle backend for real-time shift tracking and role-based access for supervisors and admins. Deployed to Google Play Store.",
    projectLink: "https://play.google.com/store/apps/details?id=contractorsync",
    codeLink: "https://github.com/Mohamed-Abdulla",
    imgUrl: "/assets/mobile.png",
    tags: ["Mobile App", "Backend/Services", "Featured"],
    featured: true
  },
  // 2. High-scale Backends (From Resume / Sanity)
  {
    title: "Microservices Video-to-MP3 Converter",
    description: "A highly-scalable, containerized event-driven system with Docker and Kubernetes that converts uploads (video files) to MP3 audio files. Uses microservices for authentication, GridFS storage, notifications (via email queues), and RabbitMQ/Kafka message processing queues.",
    projectLink: "https://github.com/Mohamed-Abdulla/system_design",
    codeLink: "https://github.com/Mohamed-Abdulla/system_design",
    imgUrl: "/assets/docker.svg",
    tags: ["Backend/Services", "Featured"],
    featured: true
  },
  {
    title: "AidMesh Aid Coordination Platform",
    description: "Independent project. A real-time emergency aid coordination system using event-driven microservices designed to handle thousands of concurrent requests. Built with Node.js/NestJS, Kafka, RabbitMQ, Keycloak, and Kong Gateway.",
    projectLink: "https://github.com/Mohamed-Abdulla/AidMesh",
    codeLink: "https://github.com/Mohamed-Abdulla/AidMesh",
    imgUrl: "/assets/docker.svg",
    tags: ["Backend/Services", "Featured"],
    featured: true
  },
  {
    title: "MediaStreamX Video Streamer",
    description: "A highly scalable video streaming server built using Node.js and MongoDB GridFS. Designed for efficient large media chunk chunking, buffering, and high-throughput content delivery.",
    projectLink: "https://github.com/Mohamed-Abdulla/mongo_db_gridfs",
    codeLink: "https://github.com/Mohamed-Abdulla/mongo_db_gridfs",
    imgUrl: "/assets/graphql.png",
    tags: ["Backend/Services"],
    featured: false
  },
  // 3. Web & Full Stack Platforms (From Sanity / Resume)
  {
    title: "Colakin Public Website",
    description: "Designed, optimized, and built the company's 40+ page corporate website in Next.js, implementing SEO, GDPR-compliant cookie consent, Google Analytics tracking, and premium visual components to support business growth.",
    projectLink: "https://colakin.com/",
    codeLink: "https://github.com/Mohamed-Abdulla/colakin-next",
    imgUrl: "/assets/nextjs.png",
    tags: ["Full Stack", "Featured"],
    featured: true
  },
  {
    title: "RBAC Auth System",
    description: "A role-based access control authentication system built with Next.js and NextAuth.js. Supports secure JSON Web Token (JWT) sessions, protected routing, custom access roles, and database integrations.",
    projectLink: "https://auth-next-abd.vercel.app/",
    codeLink: "https://github.com/Mohamed-Abdulla/auth-next",
    imgUrl: "/assets/typescript.png",
    tags: ["Full Stack"],
    featured: false
  },
  {
    title: "Eco Vision Waste Management",
    description: "An AI-powered Waste Management System showcasing full-stack integration of machine learning categorization and interactive analytics dashboards.",
    projectLink: "https://eco-vision-umber.vercel.app/",
    codeLink: "https://github.com/Mohamed-Abdulla/eco-vision",
    imgUrl: "/assets/mern.png",
    tags: ["Full Stack"],
    featured: false
  },
  {
    title: "LMS Education Platform",
    description: "Learning Management System (LMS) designed for educational institutions to coordinate course materials, grading, student profiles, and online lectures.",
    projectLink: "https://lms-platform-tau.vercel.app/",
    codeLink: "https://github.com/Mohamed-Abdulla/lms",
    imgUrl: "/assets/react.png",
    tags: ["Full Stack"],
    featured: false
  },
  {
    title: "HooBank Modern Banking UI",
    description: "A sleek, responsive modern UI/UX design of a banking application showcasing custom gradients, responsive card positioning, and glassmorphic designs.",
    projectLink: "https://abd-hoobank.netlify.app",
    codeLink: "https://github.com/Mohamed-Abdulla/UI-UX-Modern-Projects/tree/hoobank/HooBank",
    imgUrl: "/assets/twind.png",
    tags: ["Design/3D"],
    featured: false
  },
  {
    title: "Modern Admin Dashboard",
    description: "An interactive admin control panel mock design showing advanced stats charts, user table manipulation, task lists, and calendar UI elements.",
    projectLink: "https://modern-admin-panel.netlify.app/",
    codeLink: "https://github.com/Mohamed-Abdulla/Full-Stack-Web-Development/tree/modern-admin-panel",
    imgUrl: "/assets/figma.png",
    tags: ["Design/3D"],
    featured: false
  },
  {
    title: "Zomato Clone",
    description: "MERN stack Zomato food ordering clone showcasing geolocation mapping, restaurant reviews, menu indexing, and mock payment screens.",
    projectLink: "https://github.com/Mohamed-Abdulla/Full-Stack-Web-Development/tree/MERN-Zomato",
    codeLink: "https://github.com/Mohamed-Abdulla/Full-Stack-Web-Development/tree/MERN-Zomato",
    imgUrl: "/assets/mern.png",
    tags: ["Full Stack"],
    featured: false
  },
  {
    title: "NFT Marketplace App",
    description: "NFT bidding and trading application featuring mobile client mockups and a web-based landing page showcasing active bids and blockchain art arrays.",
    projectLink: "https://abdnftmarketplace.netlify.app",
    codeLink: "https://github.com/Mohamed-Abdulla/Mobile-Apps/tree/NFT-App",
    imgUrl: "/assets/sass.png",
    tags: ["Mobile App", "Design/3D"],
    featured: false
  },
  {
    title: "Voyago Travel Planner",
    description: "A modern travel planning and journey coordination app built using React, Next.js, and TypeScript, featuring dynamic maps integration and trip scheduler workflows.",
    projectLink: "https://github.com/Mohamed-Abdulla/Voyago",
    codeLink: "https://github.com/Mohamed-Abdulla/Voyago",
    imgUrl: "/assets/nextjs.png",
    tags: ["Full Stack", "Featured"],
    featured: true
  },
  {
    title: "Project Synergy",
    description: "A collaborative workspace and team communication tool built with TypeScript, Next.js, and Tailwind CSS. Supports real-time project management and task allocation dashboards.",
    projectLink: "https://github.com/Mohamed-Abdulla/project-synergy",
    codeLink: "https://github.com/Mohamed-Abdulla/project-synergy",
    imgUrl: "/assets/twind.png",
    tags: ["Full Stack", "Featured"],
    featured: true
  },
  {
    title: "MERN Stack Mega Repo",
    description: "A comprehensive repository containing my MERN Stack portfolio and Data Structures & Algorithms (DSA) work. Includes branches for clones of YouTube, Facebook, Netflix, and booking apps.",
    projectLink: "https://github.com/Mohamed-Abdulla/Full-Stack-Web-Development",
    codeLink: "https://github.com/Mohamed-Abdulla/Full-Stack-Web-Development",
    imgUrl: "/assets/mern.png",
    tags: ["Full Stack"],
    featured: false
  },
  {
    title: "DevOps Infrastructure Engine",
    description: "A centralized repository detailing my DevOps architecture setups, including container setups, Docker Swarm orchestration configurations, Kubernetes deployments, and CI/CD pipelines.",
    projectLink: "https://github.com/Mohamed-Abdulla/DEVOPS",
    codeLink: "https://github.com/Mohamed-Abdulla/DEVOPS",
    imgUrl: "/assets/docker.svg",
    tags: ["Backend/Services"],
    featured: false
  },
  {
    title: "Disney+ Frontend Clone",
    description: "A high-fidelity frontend clone of the Disney+ landing page built with React and Styled Components. Features user profiles, video sliders, dynamic page details, and hover card states.",
    projectLink: "https://github.com/Mohamed-Abdulla/disney-plus-clone",
    codeLink: "https://github.com/Mohamed-Abdulla/disney-plus-clone",
    imgUrl: "/assets/react.png",
    tags: ["Design/3D"],
    featured: false
  }
];

export const skillsData: ISkill[] = [
  // Frontend
  { name: "React", bgColor: "#edf2f8", icon: "/assets/react.png", category: "frontend" },
  { name: "NEXT JS", bgColor: "#edf2f8", icon: "/assets/nextjs_icon.png", category: "frontend" },
  { name: "TypeScript", bgColor: "#edf2f8", icon: "/assets/typescript.png", category: "frontend" },
  { name: "JavaScript", bgColor: "#edf2f8", icon: "/assets/javascript.png", category: "frontend" },
  { name: "Tailwind CSS", bgColor: "#edf2f8", icon: "/assets/twind.png", category: "frontend" },
  { name: "Sass", bgColor: "#edf2f8", icon: "/assets/sass.png", category: "frontend" },
  // Backend & Languages
  { name: "Node JS", bgColor: "#edf2f8", icon: "/assets/node.png", category: "backend" },
  { name: "NestJS", bgColor: "#edf2f8", icon: "/assets/nestjs.svg", category: "backend" },
  { name: "FastAPI", bgColor: "#edf2f8", icon: "/assets/fastapi.svg", category: "backend" },
  { name: "Python", bgColor: "#edf2f8", icon: "/assets/python.svg", category: "backend" },
  { name: "Java", bgColor: "#edf2f8", icon: "/assets/java.svg", category: "backend" },
  { name: "Graphql", bgColor: "#edf2f8", icon: "/assets/graphql.png", category: "backend" },
  // DevOps / Messaging
  { name: "Docker", bgColor: "#edf2f8", icon: "/assets/docker.svg", category: "devops" },
  { name: "Kafka", bgColor: "#edf2f8", icon: "/assets/kafka.svg", category: "devops" },
  { name: "RabbitMQ", bgColor: "#edf2f8", icon: "/assets/rabbitmq.svg", category: "devops" },
  { name: "Nginx", bgColor: "#edf2f8", icon: "/assets/nginx.svg", category: "devops" },
  { name: "Kong Gateway", bgColor: "#edf2f8", icon: "/assets/kong.svg", category: "devops" },
  { name: "Keycloak", bgColor: "#edf2f8", icon: "/assets/keycloak.svg", category: "devops" },
  { name: "Elastic Search", bgColor: "#edf2f8", icon: "/assets/elasticsearch.svg", category: "devops" },
  // Databases
  { name: "PostgreSQL", bgColor: "#edf2f8", icon: "/assets/postgresql.svg", category: "database" },
  { name: "Oracle", bgColor: "#edf2f8", icon: "/assets/oracle.svg", category: "database" },
  { name: "Redis", bgColor: "#edf2f8", icon: "/assets/redis.svg", category: "database" },
  // Mobile / Other
  { name: "Flutter", bgColor: "#edf2f8", icon: "/assets/flutter.svg", category: "other" },
  { name: "React Native", bgColor: "#edf2f8", icon: "/assets/react.png", category: "other" },
  { name: "Git", bgColor: "#edf2f8", icon: "/assets/git.png", category: "other" }
];

export const experienceTimeline: IExperienceTimeline[] = [
  {
    year: "2022 – Present",
    works: [
      {
        role: "Full Stack Developer",
        company: "Colakin",
        duration: "11/2022 – Present (Remote)",
        desc: [
          "Led backend and mobile architecture for VitaliT, a production Flutter fitness app featuring AI-powered meal recommendations, gamification, subscriptions, and App Store payments.",
          "Designed ContractorSync, an enterprise attendance platform with Flutter mobile clients and a FastAPI/Oracle backend for real-time shift tracking and role-based access.",
          "Built and optimized colakin.com, a 40+ page corporate website in Next.js, implementing custom on-page SEO, cookie consent, and analytics scripts.",
          "Architected enterprise identity and authentication systems using Kong API Gateway, Keycloak, OAuth2, OIDC, JWT, and HashiCorp Vault.",
          "Built centralized logging and health checks with the ELK Stack (Elasticsearch, Logstash, Kibana), Filebeat, and Uptime Kuma behind Nginx/Docker."
        ]
      }
    ]
  },
  {
    year: "2021 – 2022",
    works: [
      {
        role: "Software Developer (Part-Time)",
        company: "Kasadsara Tech",
        duration: "Part-Time (India)",
        desc: [
          "Developed backend APIs and Next.js frontend pages for internal and client-facing corporate setups.",
          "Built an employee timesheet tracking system featuring a Kanban workflow for hour tracking and project allocation.",
          "Refactored the official Kasadsara Tech company website, improving bundle sizes, loading speeds, and overall SEO performance."
        ]
      }
    ]
  }
];

export const testimonialsData = [
  {
    name: "Sarah",
    company: "Netflix (Mock Client)",
    feedback: "Mohamed is an outstanding engineer! He has an exceptional eye for system design and builds extremely fast, reliable full-stack and mobile products.",
    imgUrl: "/assets/circle.svg"
  },
  {
    name: "Mark",
    company: "Facebook (Mock Client)",
    feedback: "Excellent developer. His grasp of complex distributed pipelines (Kafka/RabbitMQ) and custom authentication frameworks is top notch.",
    imgUrl: "/assets/circle.svg"
  }
];

export const brandsData = [
  { name: "Spotify", imgUrl: "/assets/circle.svg" },
  { name: "Skype", imgUrl: "/assets/circle.svg" },
  { name: "Bolt", imgUrl: "/assets/circle.svg" },
  { name: "New Balance", imgUrl: "/assets/circle.svg" }
];
