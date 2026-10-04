"use client";

import { Button } from "@paubha/registry/ui/button";
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
} from "@paubha/registry/ui/dialog";
import { ComponentPlayground } from "../_shared/component-playground";

export function DialogHero() {
  return (
    <ComponentPlayground
      code={`<Dialog>
  <DialogTrigger asChild>
    <Button variant="secondary">Discard changes</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogBody>
      <DialogTitle>Discard changes?</DialogTitle>
      <DialogDescription>
        Unsaved changes to Website redesign will be lost.
      </DialogDescription>
    </DialogBody>
    <DialogActions>
      <DialogCancel>Keep editing</DialogCancel>
      <DialogAction>Discard changes</DialogAction>
    </DialogActions>
  </DialogContent>
</Dialog>`}
    >
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="secondary">Discard changes</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogBody>
            <DialogTitle>Discard changes?</DialogTitle>
            <DialogDescription>
              Unsaved changes to Website redesign will be lost.
            </DialogDescription>
          </DialogBody>
          <DialogActions>
            <DialogCancel>Keep editing</DialogCancel>
            <DialogAction>Discard changes</DialogAction>
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
    <Button destructive>Delete project</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogBody>
      <DialogTitle>Delete project?</DialogTitle>
      <DialogDescription>
        Deleting Website redesign cannot be undone.
      </DialogDescription>
    </DialogBody>
    <DialogActions>
      <DialogCancel>Cancel</DialogCancel>
      <DialogAction variant="error">Delete project</DialogAction>
    </DialogActions>
  </DialogContent>
</Dialog>`}
    >
      <Dialog>
        <DialogTrigger asChild>
          <Button destructive>Delete project</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogBody>
            <DialogTitle>Delete project?</DialogTitle>
            <DialogDescription>
              Deleting Website redesign cannot be undone.
            </DialogDescription>
          </DialogBody>
          <DialogActions>
            <DialogCancel>Cancel</DialogCancel>
            <DialogAction variant="error">Delete project</DialogAction>
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
    <Button variant="secondary">Leave project</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogBody>
      <DialogTitle>Leave project?</DialogTitle>
      <DialogDescription>
        You will lose access to Website redesign.
      </DialogDescription>
    </DialogBody>
    <DialogActions>
      <DialogAction>Leave project</DialogAction>
    </DialogActions>
  </DialogContent>
</Dialog>`}
    >
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="secondary">Leave project</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogBody>
            <DialogTitle>Leave project?</DialogTitle>
            <DialogDescription>
              You will lose access to Website redesign.
            </DialogDescription>
          </DialogBody>
          <DialogActions>
            <DialogAction>Leave project</DialogAction>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </ComponentPlayground>
  );
}
