import { render, screen } from "@testing-library/react";
import * as React from "react";
import { describe, expect, it } from "vitest";
import { axe } from "../../lib/test-axe";
import { FileUpload, FileUploadItem, FileUploadList } from "./file-upload";

describe("FileUpload", () => {
  it("renders the drop zone label", () => {
    render(<FileUpload />);
    expect(screen.getByText("Drag & drop files here")).toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    const { container } = render(<FileUpload />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no axe violations when disabled", async () => {
    const { container } = render(<FileUpload disabled />);
    expect(screen.getByRole("button", { name: "Browse Files" })).toBeDisabled();
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("FileUploadItem", () => {
  it("shows progress", () => {
    render(
      <FileUploadList>
        <FileUploadItem name="brief.pdf" size="1.2 MB" progress={40} />
      </FileUploadList>,
    );
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "40",
    );
  });

  it("has no axe violations in error state", async () => {
    const { container } = render(
      <FileUploadItem name="big.xlsx" size="Too large" status="error" />,
    );
    expect(screen.queryByRole("progressbar")).toBeNull();
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <FileUploadItem name="cover.png" size="420 KB" progress={100} />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
