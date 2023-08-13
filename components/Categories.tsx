'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { categoryFilters } from '@/constants';

function Categories() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const category = searchParams.get('category') ?? 'Frontend';

  const handleFilter = (filter: string) => {
    router.push(`${pathname}?category=${filter}`);
  };
  return (
    <div className="flexBetween w-full gap-5 flex-wrap">
      <ul className="flex gap-2 overflow-auto pb-4">
        {categoryFilters.map((filter) => (
          <li key={filter}>
            <button
              className={`${
                filter === category ? 'bg-light-white-300 font-medium' : 'font-normal'
              } px-4 py-3 rounded-lg capitalize whitespace-nowrap`}
              type="button"
              onClick={() => handleFilter(filter)}
            >
              {filter}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
