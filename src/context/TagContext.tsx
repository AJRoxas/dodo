'use client';
import { tags } from '@prisma/client';
import { createContext, useContext } from 'react';

const TagContext = createContext<tags[] | undefined>(undefined);
export const useTags = () => {
  const context = useContext(TagContext);
  if (!context) {
    throw new Error('useTags must be used within a TagProvider');
  }
  return context;
};

interface TagProviderProps {
  tags: tags[];
  children: React.ReactNode;
}

const TagProvider = ({ tags, children }: TagProviderProps) => {
  return <TagContext.Provider value={tags}>{children}</TagContext.Provider>;
};

export default TagProvider;
