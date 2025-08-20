import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface MDXRendererProps {
  children: ReactNode;
  className?: string;
}

export function MDXRenderer({ children, className }: MDXRendererProps) {
  return (
    <div
      className={cn(
        'prose prose-lg max-w-none',
        'prose-headings:text-gray-900 prose-headings:font-semibold',
        'prose-h1:text-4xl prose-h1:font-bold prose-h1:mb-8',
        'prose-h2:text-3xl prose-h2:font-bold prose-h2:mb-6 prose-h2:mt-12',
        'prose-h3:text-2xl prose-h3:font-semibold prose-h3:mb-4 prose-h3:mt-8',
        'prose-h4:text-xl prose-h4:font-semibold prose-h4:mb-3 prose-h4:mt-6',
        'prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6',
        'prose-a:text-cactusGreen prose-a:no-underline prose-a:font-medium hover:prose-a:underline',
        'prose-strong:text-gray-900 prose-strong:font-semibold',
        'prose-em:text-gray-800 prose-em:italic',
        'prose-blockquote:border-l-4 prose-blockquote:border-cactusGreen prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-700',
        'prose-code:text-cactusGreen prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm',
        'prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-6 prose-pre:rounded-lg prose-pre:overflow-x-auto',
        'prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-2',
        'prose-ol:list-decimal prose-ol:pl-6 prose-ol:space-y-2',
        'prose-li:text-gray-700',
        'prose-hr:border-gray-200 prose-hr:my-8',
        'prose-table:border-collapse prose-table:w-full',
        'prose-th:border prose-th:border-gray-300 prose-th:bg-gray-50 prose-th:p-3 prose-th:text-left prose-th:font-semibold',
        'prose-td:border prose-td:border-gray-300 prose-td:p-3',
        className
      )}
    >
      {children}
    </div>
  );
}
