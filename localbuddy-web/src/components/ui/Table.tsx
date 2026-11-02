// components/ui/Table.tsx & Pagination.tsx
import React from 'react';
import { clsx } from 'clsx';

export const Table: React.FC<React.TableHTMLAttributes<HTMLTableElement>> = ({ className, children, ...props }) => {
  return (
    <div className="w-full overflow-x-auto rounded-[12px] border border-[#D6E2D9] bg-white">
      <table className={clsx('w-full text-left border-collapse text-[14px]', className)} {...props}>
        {children}
      </table>
    </div>
  );
};

export const TableHeader: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({ className, children, ...props }) => (
  <thead className={clsx('bg-[#F6FAF6] text-[#4B5B50] font-semibold border-b border-[#D6E2D9]', className)} {...props}>
    {children}
  </thead>
);

export const TableBody: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({ className, children, ...props }) => (
  <tbody className={clsx('divide-y divide-[#D6E2D9]', className)} {...props}>
    {children}
  </tbody>
);

export const TableRow: React.FC<React.HTMLAttributes<HTMLTableRowElement>> = ({ className, children, ...props }) => (
  <tr className={clsx('hover:bg-[#F6FAF6]/60 transition-colors', className)} {...props}>
    {children}
  </tr>
);

export const TableHead: React.FC<React.ThHTMLAttributes<HTMLTableCellElement>> = ({ className, children, ...props }) => (
  <th className={clsx('px-4 py-3 text-[14px]', className)} {...props}>
    {children}
  </th>
);

export const TableCell: React.FC<React.TdHTMLAttributes<HTMLTableCellElement>> = ({ className, children, ...props }) => (
  <td className={clsx('px-4 py-3 text-[14px] text-[#14231A]', className)} {...props}>
    {children}
  </td>
);

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className={clsx('flex items-center justify-between py-3', className)}>
      <span className="text-[14px] text-[#4B5B50]">
        Trang {currentPage} / {totalPages}
      </span>
      <div className="flex gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1.5 rounded-[8px] border border-[#D6E2D9] text-[14px] disabled:opacity-50"
        >
          Trước
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1.5 rounded-[8px] border border-[#D6E2D9] text-[14px] disabled:opacity-50"
        >
          Sau
        </button>
      </div>
    </div>
  );
};

