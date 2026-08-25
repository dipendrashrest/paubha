"use client";

import {
  Dialog,
  DialogAction,
  DialogActions,
  DialogBody,
  DialogCancel,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@asteria-ui/registry/ui/dialog";
import { Button } from "@asteria-ui/registry/ui/button";
import { ComponentPlayground } from "../_shared/component-playground";

export function DialogHero() {
  return (
    <ComponentPlayground
      code={`<Dialog>
  <DialogTrigger asChild>
    <Button>Confirm Action</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogBody>
      <DialogTitle>Confirm Action</DialogTitle>
      <DialogDescription>
        Are you sure you want to proceed? This action cannot be undone.
      </DialogDescription>
    </DialogBody>
    <DialogActions>
      <DialogCancel>Cancel</DialogCancel>
      <DialogAction>Confirm</DialogAction>
    </DialogActions>
  </DialogContent>
</Dialog>`}
    >
      <Dialog>
        <DialogTrigger asChild>
          <Button>Confirm Action</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogBody>
            <DialogTitle>Confirm Action</DialogTitle>
            <DialogDescription>
              Are you sure you want to proceed? This action cannot be undone.
            </DialogDescription>
          </DialogBody>
          <DialogActions>
            <DialogCancel>Cancel</DialogCancel>
            <DialogAction>Confirm</DialogAction>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </ComponentPlayground>
  );
}

export function DialogDestructive() {
  return (
    <ComponentPlayground
      code={`<Dialog>
  <DialogTrigger asChild>
    <Button variant="destructive">Delete Item</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogBody>
      <DialogTitle>Delete Item</DialogTitle>
      <DialogDescription>
        This will permanently delete this item and all associated data. This
        action cannot be reversed.
      </DialogDescription>
    </DialogBody>
    <DialogActions>
      <DialogCancel>Cancel</DialogCancel>
      <DialogAction variant="error">Delete</DialogAction>
    </DialogActions>
  </DialogContent>
</Dialog>`}
    >
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="destructive">Delete Item</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogBody>
            <DialogTitle>Delete Item</DialogTitle>
            <DialogDescription>
              This will permanently delete this item and all associated data.
              This action cannot be reversed.
            </DialogDescription>
          </DialogBody>
          <DialogActions>
            <DialogCancel>Cancel</DialogCancel>
            <DialogAction variant="error">Delete</DialogAction>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </ComponentPlayground>
  );
}

export function DialogInfo() {
  return (
    <ComponentPlayground
      code={`<Dialog>
  <DialogTrigger asChild>
    <Button variant="secondary">Show Info</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogBody>
      <DialogTitle>Information</DialogTitle>
      <DialogDescription>
        Your changes have been saved successfully.
      </DialogDescription>
    </DialogBody>
    <DialogActions>
      <DialogAction>Got it</DialogAction>
    </DialogActions>
  </DialogContent>
</Dialog>`}
    >
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="secondary">Show Info</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogBody>
            <DialogTitle>Information</DialogTitle>
            <DialogDescription>
              Your changes have been saved successfully.
            </DialogDescription>
          </DialogBody>
          <DialogActions>
            <DialogAction>Got it</DialogAction>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </ComponentPlayground>
  );
}
