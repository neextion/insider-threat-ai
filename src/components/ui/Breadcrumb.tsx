
'use client';

import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Breadcrumb = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(segment => segment);

  return (
    <nav className="flex items-center space-x-2 text-sm text-text-secondary">
      <Link href="/" className="hover:text-text transition-colors">
        Dashboard
      </Link>
      {pathSegments.map((segment, index) => {
        const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
        const isLast = index === pathSegments.length - 1;
        const name = segment.charAt(0).toUpperCase() + segment.slice(1);

        return (
          <div key={href} className="flex items-center space-x-2">
            <ChevronRight className="h-4 w-4" />
            <Link href={href} className={`${isLast ? 'text-text font-semibold' : 'hover:text-text transition-colors'}`}>
              {name}
            </Link>
          </div>
        );
      })}
    </nav>
  );
};
