import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";
import { axe } from "../../lib/test-axe";
import {
  Pagination,
  PaginationContent,
  PaginationContentV2,
  PaginationEllipsis,
  PaginationEllipsisV2,
  PaginationItem,
  PaginationItemV2,
  PaginationLink,
  PaginationLinkV2,
  PaginationNext,
  PaginationNextV2,
  PaginationPrevious,
  PaginationPreviousV2,
  PaginationV2,
} from "./pagination";

function BasicPagination(props: { onPageChange?: (page: number) => void }) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={() => props.onPageChange?.(1)} />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink isActive onClick={() => props.onPageChange?.(1)}>
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink onClick={() => props.onPageChange?.(2)}>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext onClick={() => props.onPageChange?.(2)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

describe("Pagination", () => {
  it("renders as a nav with aria-label=Pagination", () => {
    render(<BasicPagination />);
    expect(
      screen.getByRole("navigation", { name: "Pagination" }),
    ).toBeInTheDocument();
  });

  it("marks the active page with aria-current=page", () => {
    render(<BasicPagination />);
    expect(screen.getByRole("button", { name: "1" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(
      screen.getByRole("button", { name: "2" }),
    ).not.toHaveAttribute("aria-current");
  });

  it("calls the handler when a page link is clicked", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    render(<BasicPagination onPageChange={onPageChange} />);
    await user.click(screen.getByRole("button", { name: "2" }));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it("labels the previous/next buttons for screen readers", () => {
    render(<BasicPagination />);
    expect(
      screen.getByRole("button", { name: "Previous page" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Next page" }),
    ).toBeInTheDocument();
  });

  it("disables the previous button when disabled is set", () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious disabled />
          </PaginationItem>
        </PaginationContent>
      </Pagination>,
    );
    expect(screen.getByRole("button", { name: "Previous page" })).toBeDisabled();
  });

  it("exposes ellipsis text for screen readers", () => {
    render(<BasicPagination />);
    expect(screen.getByText("More pages")).toBeInTheDocument();
  });

  it("forwards a ref to the nav element", () => {
    const ref = React.createRef<HTMLElement>();
    render(
      <Pagination ref={ref}>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink isActive>1</PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>,
    );
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });

  it("has no axe violations", async () => {
    const { container } = render(<BasicPagination />);
    expect(await axe(container)).toHaveNoViolations();
  });

  // Audit fix regression: the per-size gap and icon scale (hardcoded before this audit)
  // must actually vary with the `size` prop rather than collapsing to the `md` value.
  it("scales the content gap and nav icon size with the size prop", () => {
    const { container: sm } = render(
      <Pagination>
        <PaginationContent size="sm">
          <PaginationItem>
            <PaginationPrevious size="sm" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>,
    );
    expect(sm.querySelector("ul")).toHaveClass("gap-1");
    expect(sm.querySelector("svg")).toHaveClass("size-3");

    const { container: lg } = render(
      <Pagination>
        <PaginationContent size="lg">
          <PaginationItem>
            <PaginationPrevious size="lg" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>,
    );
    expect(lg.querySelector("ul")).toHaveClass("gap-2");
    expect(lg.querySelector("svg")).toHaveClass("size-4");
  });
});

function BasicPaginationV2(props: { onPageChange?: (page: number) => void }) {
  return (
    <PaginationV2>
      <PaginationContentV2>
        <PaginationItemV2>
          <PaginationPreviousV2 onClick={() => props.onPageChange?.(1)} />
        </PaginationItemV2>
        <PaginationItemV2>
          <PaginationLinkV2 isActive onClick={() => props.onPageChange?.(1)}>
            1
          </PaginationLinkV2>
        </PaginationItemV2>
        <PaginationItemV2>
          <PaginationLinkV2 onClick={() => props.onPageChange?.(2)}>
            2
          </PaginationLinkV2>
        </PaginationItemV2>
        <PaginationItemV2>
          <PaginationEllipsisV2 />
        </PaginationItemV2>
        <PaginationItemV2>
          <PaginationNextV2 onClick={() => props.onPageChange?.(2)} />
        </PaginationItemV2>
      </PaginationContentV2>
    </PaginationV2>
  );
}

describe("PaginationV2 (restrained)", () => {
  it("renders as a nav with aria-label=Pagination", () => {
    render(<BasicPaginationV2 />);
    expect(
      screen.getByRole("navigation", { name: "Pagination" }),
    ).toBeInTheDocument();
  });

  it("marks the active page with aria-current=page", () => {
    render(<BasicPaginationV2 />);
    expect(screen.getByRole("button", { name: "1" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("calls the handler when a page link is clicked", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    render(<BasicPaginationV2 onPageChange={onPageChange} />);
    await user.click(screen.getByRole("button", { name: "2" }));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it("has no axe violations", async () => {
    const { container } = render(<BasicPaginationV2 />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
