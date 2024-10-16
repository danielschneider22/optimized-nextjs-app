'use client';

import React from 'react';
import { parseAsInteger, useQueryState } from 'nuqs';

import { UsersTable } from '@/components/features';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { userData } from './userData';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

const DEFAULT_PAGE = 1;
const DEFAULT_TOTAL_ITEMS = 7;

export default function Users() {
  const [currentSearch, setCurrentSearch] = useQueryState('search', {
    defaultValue: '',
  });
  const [page, setPage] = useQueryState(
    'page',
    parseAsInteger.withDefault(DEFAULT_PAGE)
  );
  const [totalItems, setTotalItems] = useQueryState(
    'totalItems',
    parseAsInteger.withDefault(DEFAULT_TOTAL_ITEMS)
  );

  const data = userData.slice((page - 1) * totalItems, page * totalItems);

  const isPending = false;

  const { theme, setTheme } = useTheme();

  return (
    <div className="m-10 flex flex-col gap-5">
      <div className="flex justify-between gap-3 w-full">
        <div>
          <Input
            value={currentSearch}
            placeholder="Search"
            onChange={(e) => setCurrentSearch(e.target.value)}
          />
        </div>
        <Button
          onClick={() =>
            theme === 'dark' ? setTheme('light') : setTheme('dark')
          }
          variant={'secondary'}
        >
          Change Theme
        </Button>

        <Select
          onValueChange={(value: string) => setTotalItems(parseInt(value))}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Total Items" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="50">50</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <UsersTable
        users={data ?? []}
        isLoading={isPending}
        totalPages={Math.ceil(userData.length / totalItems)}
        currentPage={page}
        onPageChange={(page) => setPage(page)}
      />
    </div>
  );
}
