import Categories from '@/components/Categories';
import LoadMore from '@/components/LoadMore';
import ProjectCard from '@/components/ProjectCard';
import { fetchAllProjects } from '@/lib/actions';

interface SearchParams {
  category?: string;
  endcursor?: string;
}

interface Props {
  searchParams: SearchParams;
}

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = 0;

export default async function Home({
  searchParams: { category = 'Frontend', endcursor },
}: Props) {
  const data = await fetchAllProjects(category, endcursor);

  const projects = data?.projectSearch?.edges.map((edge) => edge.node) ?? [];

  const pagination = data?.projectSearch?.pageInfo;

  if (projects.length === 0) {
    return (
      <section className="flexStart flex-col paddings">
        <Categories />
        <p className="no-result-text text-center">
          No projects found.Go create some first
        </p>
      </section>
    );
  }

  return (
    <section className="flex-start flex-col paddings mb-16">
      <Categories />
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
      <LoadMore
        startCursor={pagination?.startCursor}
        endCursor={pagination?.endCursor}
        hasPreviousPage={pagination?.hasPreviousPage}
        hasNextPage={pagination?.hasNextPage}
      />
    </section>
  );
}
