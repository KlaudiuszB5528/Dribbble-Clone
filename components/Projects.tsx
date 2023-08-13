import LoadMore from './LoadMore';
import ProjectCard from './ProjectCard';
import React from 'react';
import { fetchAllProjects } from '@/lib/actions';

interface Props {
  category: string;
  endcursor?: string;
}

async function Projects({ category, endcursor }: Props) {
  const data = await fetchAllProjects(category, endcursor);

  const projects = data?.projectSearch?.edges.map((edge) => edge.node) ?? [];

  const pagination = data?.projectSearch?.pageInfo;

  return (
    <React.Fragment>
      {projects.length > 0 ? (
        <section className="projects-grid">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              image={project.image}
              title={project.title}
              name={project.createdBy.name}
              avatarUrl={project.createdBy.avatarUrl}
              userId={project.createdBy.id}
            />
          ))}
        </section>
      ) : (
        <section className="flexStart flex-col paddings">
          <p className="no-result-text text-center">
            No projects found.Go create some first
          </p>
        </section>
      )}
      <LoadMore
        startCursor={pagination?.startCursor}
        endCursor={pagination?.endCursor}
        hasPreviousPage={pagination?.hasPreviousPage}
        hasNextPage={pagination?.hasNextPage}
      />
    </React.Fragment>
  );
}

export default Projects;
