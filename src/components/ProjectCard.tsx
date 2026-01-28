import React from 'react';
import type { project } from '../data/projects';

interface ProjectCardProps {
  project: project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="group relative w-full aspect-4/5 md:aspect-3/4 overflow-hidden rounded-sm cursor-pointer">
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
      
      <div className="absolute bottom-0 left-0 w-full p-6 text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
        <p className="text-xs tracking-[0.2em] uppercase mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
          {project.location}
        </p>
        <h3 className="text-2xl font-serif">{project.title}</h3>
      </div>
    </div>
  );
};

export default ProjectCard;
