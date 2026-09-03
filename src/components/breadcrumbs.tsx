import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

export function Breadcrumbs({ current }: { current: string }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1 text-xs font-semibold text-ink-soft">
        <li>
          <Link to="/" className="transition-colors hover:text-ink">
            Home
          </Link>
        </li>
        <li aria-hidden="true" className="flex items-center">
          <ChevronRight className="h-3.5 w-3.5" />
        </li>
        <li aria-current="page" className="text-ink">
          {current}
        </li>
      </ol>
    </nav>
  );
}
