import Categories from '@/components/Categories';
import Projects from '@/components/Projects';

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
  searchParams: { category = 'Frontend', endcursor = undefined },
}: Props) {
  return (
    <section className="flex-start flex-col paddings mb-16">
      <Categories />
      <Projects category={category} endcursor={endcursor} />
    </section>
  );
}
