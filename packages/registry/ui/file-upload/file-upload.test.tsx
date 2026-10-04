import { render, screen } from "@testing-library/react";
import * as React from "react";
import { describe, expect, it } from "vitest";
import { axe } from "../../lib/test-axe";
import { FileUpload, FileUploadItem, FileUploadList } from "./file-upload";

describe("FileUpload", () => {
  it("renders the drop zone label", () => {
    render(<FileUpload />);
    expect(
      screen.getByText("Click to upload or drag and drop"),
    ).toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    const { container } = render(<FileUpload />);
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

  it("has no axe violations", async () => {
    const { container } = render(
      <FileUploadItem name="cover.png" size="420 KB" progress={100} />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
