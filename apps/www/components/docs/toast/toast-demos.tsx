"use client";

import { Button } from "@asteria-ui/registry/ui/button";
import { Toast, ToastProvider, useToast } from "@asteria-ui/registry/ui/toast";
import { ComponentPlayground } from "../_shared/component-playground";

const variants = ["info", "success", "warning", "error"] as const;

export function ToastHero() {
  return (
    <ComponentPlayground
      code={`<Toast title="Information" description="This is a info toast message." />`}
    >
      <Toast
        title="Information"
        description="This is a info toast message."
        onDismiss={() => {}}
      />
    </ComponentPlayground>
  );
}

export function ToastVariants() {
  return (
    <ComponentPlayground
      code={variants
        .map(
          (v) =>
            `<Toast variant="${v}" title="${v[0].toUpperCase()}${v.slice(1)}" description="This is a ${v} toast message." />`,
        )
        .join("\n")}
    >
      <div className="flex flex-col gap-3">
        {variants.map((variant) => (
          <Toast
            key={variant}
            variant={variant}
            title={variant[0].toUpperCase() + variant.slice(1)}
            description={`This is a ${variant} toast message.`}
            onDismiss={() => {}}
          />
        ))}
      </div>
    </ComponentPlayground>
  );
}

function ImperativeDemo() {
  const { toast } = useToast();
  return (
    <Button
      onClick={() =>
        toast({ title: "Saved", description: "Your changes were saved." })
      }
    >
      Trigger a toast
    </Button>
  );
}

export function ToastImperative() {
  return (
    <ComponentPlayground
      code={`import { ToastProvider, useToast } from "@/components/ui/toast";

function Save() {
  const { toast } = useToast();
  return (
    <button onClick={() => toast({ title: "Saved", description: "Your changes were saved." })}>
      Trigger a toast
    </button>
  );
}

// Wrap the app once:
<ToastProvider>
  <Save />
</ToastProvider>`}
    >
      <ToastProvider>
        <ImperativeDemo />
      </ToastProvider>
    </ComponentPlayground>
  );
}
