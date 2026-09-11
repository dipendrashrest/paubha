import { render, screen } from "@testing-library/react";
import * as React from "react";
import { describe, expect, it } from "vitest";
import { axe } from "../../lib/test-axe";
import { Field } from "./field";
import { Input } from "../input/input";
import { Textarea } from "../textarea/textarea";

describe("Field", () => {
  it("links the label to the control via for/id", () => {
    render(
      <Field label="Email">
        <Input />
      </Field>,
    );
    const input = screen.getByLabelText("Email");
    expect(input).toBeInstanceOf(HTMLInputElement);
  });

  it("wires the description into aria-describedby", () => {
    render(
      <Field label="Email" description="We'll never share your email.">
        <Input />
      </Field>,
    );
    const input = screen.getByLabelText("Email");
    const describedBy = input.getAttribute("aria-describedby") ?? "";
    const description = screen.getByText("We'll never share your email.");
    expect(describedBy.split(" ")).toContain(description.id);
  });

  it("does not set aria-describedby when neither description nor error are given", () => {
    render(
      <Field label="Email">
        <Input />
      </Field>,
    );
    expect(screen.getByLabelText("Email")).not.toHaveAttribute(
      "aria-describedby",
    );
  });

  it("marks the control invalid and wires the error message into aria-describedby", () => {
    render(
      <Field label="Email" error="Email is required">
        <Input />
      </Field>,
    );
    const input = screen.getByLabelText("Email");
    expect(input).toHaveAttribute("aria-invalid", "true");
    const errorMessage = screen.getByText("Email is required");
    const describedBy = input.getAttribute("aria-describedby") ?? "";
    expect(describedBy.split(" ")).toContain(errorMessage.id);
  });

  it("includes both description and error ids in aria-describedby when both are present", () => {
    render(
      <Field label="Email" description="Helper text" error="Error text">
        <Input />
      </Field>,
    );
    const input = screen.getByLabelText("Email");
    const describedBy = (input.getAttribute("aria-describedby") ?? "").split(
      " ",
    );
    expect(describedBy).toContain(screen.getByText("Helper text").id);
    expect(describedBy).toContain(screen.getByText("Error text").id);
  });

  it("appends a literal ' *' to the label and sets required on the control when required is true", () => {
    render(
      <Field label="Email" required>
        <Input />
      </Field>,
    );
    const input = screen.getByLabelText("Email *");
    expect(input).toBeRequired();
  });

  it("does not append an asterisk or set required when required is not given", () => {
    render(
      <Field label="Email">
        <Input />
      </Field>,
    );
    expect(screen.getByLabelText("Email")).not.toBeRequired();
  });

  it("shows the success message in place of the description, wired into aria-describedby", () => {
    render(
      <Field label="Email" description="Helper text" success="Looks good!">
        <Input />
      </Field>,
    );
    const input = screen.getByLabelText("Email");
    expect(screen.queryByText("Helper text")).not.toBeInTheDocument();
    const successMessage = screen.getByText("Looks good!");
    expect(successMessage).toHaveClass("text-fg-success");
    const describedBy = input.getAttribute("aria-describedby") ?? "";
    expect(describedBy.split(" ")).toContain(successMessage.id);
  });

  it("ignores success while error is set (error takes priority)", () => {
    render(
      <Field label="Email" success="Looks good!" error="Email is required">
        <Input />
      </Field>,
    );
    expect(screen.queryByText("Looks good!")).not.toBeInTheDocument();
    expect(screen.getByText("Email is required")).toBeInTheDocument();
  });

  it("does not render an error message when no error is given", () => {
    render(
      <Field label="Email">
        <Input />
      </Field>,
    );
    expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
  });

  it("forwards a ref to the wrapping div", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <Field ref={ref} label="Email">
        <Input />
      </Field>,
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("composes with Textarea just as well as Input (Field isn't Input-specific)", () => {
    render(
      <Field label="Bio" error="Bio is too short">
        <Textarea />
      </Field>,
    );
    const textarea = screen.getByLabelText("Bio");
    expect(textarea).toBeInstanceOf(HTMLTextAreaElement);
    expect(textarea).toHaveAttribute("aria-invalid", "true");
  });

  it("has no axe violations across default, description, and error states", async () => {
    const { container, rerender } = render(
      <Field label="Email">
        <Input />
      </Field>,
    );
    expect(await axe(container)).toHaveNoViolations();

    rerender(
      <Field label="Email" description="We'll never share your email.">
        <Input />
      </Field>,
    );
    expect(await axe(container)).toHaveNoViolations();

    rerender(
      <Field label="Email" error="Email is required">
        <Input />
      </Field>,
    );
    expect(await axe(container)).toHaveNoViolations();

    rerender(
      <Field label="Email" required>
        <Input />
      </Field>,
    );
    expect(await axe(container)).toHaveNoViolations();

    rerender(
      <Field label="Email" success="Looks good!">
        <Input />
      </Field>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
