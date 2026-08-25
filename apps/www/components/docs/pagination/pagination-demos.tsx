"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@asteria-ui/registry/ui/pagination";
import * as React from "react";
import { ComponentPlayground } from "../_shared/component-playground";

const sizes = ["sm", "md", "lg"] as const;

function Pages({
  size,
  current,
}: {
  size: "sm" | "md" | "lg";
  current: number;
}) {
  return (
    <Pagination>
      <PaginationContent size={size}>
        <PaginationItem>
          <PaginationPrevious size={size} disabled={current === 1} />
        </PaginationItem>
        {[1, 2, 3].map((page) => (
          <PaginationItem key={page}>
            <PaginationLink size={size} isActive={page === current}>
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationEllipsis size={size} />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink size={size}>8</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext size={size} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export function PaginationHero() {
  return (
    <ComponentPlayground
      code={`<Pagination>
  <PaginationContent>
    <PaginationItem><PaginationPrevious /></PaginationItem>
    <PaginationItem><PaginationLink isActive>1</PaginationLink></PaginationItem>
    <PaginationItem><PaginationLink>2</PaginationLink></PaginationItem>
    <PaginationItem><PaginationLink>3</PaginationLink></PaginationItem>
    <PaginationItem><PaginationEllipsis /></PaginationItem>
    <PaginationItem><PaginationLink>8</PaginationLink></PaginationItem>
    <PaginationItem><PaginationNext /></PaginationItem>
  </PaginationContent>
</Pagination>`}
    >
      <Pages size="md" current={1} />
    </ComponentPlayground>
  );
}

export function PaginationSizes() {
  return (
    <ComponentPlayground
      code={sizes.map((s) => `<PaginationContent size="${s}">...</PaginationContent>`).join("\n")}
    >
      <div className="flex flex-col gap-4">
        {sizes.map((size) => (
          <Pages key={size} size={size} current={2} />
        ))}
      </div>
    </ComponentPlayground>
  );
}

export function PaginationInteractive() {
  const [page, setPage] = React.useState(1);
  const total = 5;
  return (
    <ComponentPlayground
      code={`const [page, setPage] = useState(1);

<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious disabled={page === 1} onClick={() => setPage(page - 1)} />
    </PaginationItem>
    {pages.map((n) => (
      <PaginationItem key={n}>
        <PaginationLink isActive={n === page} onClick={() => setPage(n)}>{n}</PaginationLink>
      </PaginationItem>
    ))}
    <PaginationItem>
      <PaginationNext disabled={page === total} onClick={() => setPage(page + 1)} />
    </PaginationItem>
  </PaginationContent>
</Pagination>`}
    >
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            />
          </PaginationItem>
          {Array.from({ length: total }, (_, i) => i + 1).map((n) => (
            <PaginationItem key={n}>
              <PaginationLink isActive={n === page} onClick={() => setPage(n)}>
                {n}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              disabled={page === total}
              onClick={() => setPage((p) => p + 1)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </ComponentPlayground>
  );
}
