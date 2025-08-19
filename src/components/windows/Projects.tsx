import { ExternalLink, Github, Shield } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Command and Control (C2) Framework for Red Teaming',
    description:
      'Engineered a client-server C2 framework to simulate red team operations for security research. Implemented capabilities for remote shell execution, system information gathering, and basic file transfer.',
    tech: ['Python', 'SpringBoot', 'Client-Server Architecture', 'Web Sockets'],
    icon: Shield,
    color: 'text-primary',
    demo: 'https://github.com/akash-dev-18/Command-and-Control-C2-',
    github: 'https://github.com/akash-dev-18/Command-and-Control-C2-'
  }
];

export const Projects = () => {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b border-primary/30 pb-4 mb-6">
        <h1 className="text-2xl font-bold text-primary font-hacker">
          [PROJECTS]
        </h1>
        <p className="text-muted-foreground font-mono mt-1">
          Highlighted project from resume
        </p>
      </div>

      {/* Projects Grid */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-1 gap-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="border border-primary/30 rounded bg-card/50 backdrop-blur-sm p-4 hover:border-primary/60 transition-all duration-300 hover:glow-primary group"
            >
              {/* Project Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <project.icon className={`w-6 h-6 ${project.color} group-hover:scale-110 transition-transform`} />
                  <h3 className="font-bold text-foreground font-hacker">
                    {project.title}
                  </h3>
                </div>
                <div className="flex gap-2">
                  <a
                    href={project.demo}
                    className="p-1 rounded hover:bg-primary/20 transition-colors"
                    title="Live Demo"
                  >
                    <ExternalLink className="w-4 h-4 text-primary" />
                  </a>
                  <a
                    href={project.github}
                    className="p-1 rounded hover:bg-primary/20 transition-colors"
                    title="Source Code"
                  >
                    <Github className="w-4 h-4 text-primary" />
                  </a>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground font-mono mb-4 leading-relaxed">
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs font-mono bg-primary/10 text-primary border border-primary/30 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Status Indicator */}
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-primary/20">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span className="text-xs text-primary font-mono">ACTIVE</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};