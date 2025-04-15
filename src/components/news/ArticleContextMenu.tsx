
import React from 'react';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { ExternalLink, FileText } from 'lucide-react';

interface ArticleContextMenuProps {
  id: string;
  children: React.ReactNode;
  onOpenArticle: (id: string, newTab?: boolean) => void;
}

const ArticleContextMenu = ({ id, children, onOpenArticle }: ArticleContextMenuProps) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div className="cursor-pointer w-full h-full">
          {children}
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-48">
        <ContextMenuItem 
          onClick={() => onOpenArticle(id, false)}
          className="flex items-center gap-2"
        >
          <FileText size={16} />
          இப்பக்கத்தில் திற
        </ContextMenuItem>
        <ContextMenuItem 
          onClick={() => onOpenArticle(id, true)}
          className="flex items-center gap-2"
        >
          <ExternalLink size={16} />
          புதிய தாவலில் திற
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default ArticleContextMenu;
