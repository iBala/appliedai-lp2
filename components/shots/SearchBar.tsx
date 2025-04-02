'use client';

import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { Search } from "lucide-react";

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (term) {
      params.set('search', term);
    } else {
      params.delete('search');
    }
    router.push(`/shots?${params.toString()}`);
  }, 300);

  return (
    <div className="w-full max-w-sm mx-auto mb-8">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
        <Input
          type="text"
          placeholder="Search newsletters..."
          className="w-full pl-9 bg-white"
          defaultValue={searchParams.get('search')?.toString()}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
    </div>
  );
} 