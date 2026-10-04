"use client";

import {
  FileUpload,
  FileUploadItem,
  FileUploadList,
} from "@paubha/registry/ui/file-upload";
import { ComponentPlayground } from "../_shared/component-playground";

export function FileUploadHero() {
  return (
    <ComponentPlayground
      code={`<FileUpload onFilesChange={(files) => console.log(files)} />`}
    >
      <div className="w-full max-w-md">
        <FileUpload onFilesChange={() => {}} />
      </div>
    </ComponentPlayground>
  );
}

export function FileUploadListDemo() {
  return (
    <ComponentPlayground
      code={`<FileUploadList>
  <FileUploadItem
    name="brief.pdf"
    size="1.2 MB"
    progress={40}
    onRemove={() => {}}
  />
  <FileUploadItem
    name="moodboard.png"
    size="840 KB"
    onRemove={() => {}}
  />
</FileUploadList>`}
    >
      <div className="w-full max-w-md">
        <FileUploadList>
          <FileUploadItem
            name="brief.pdf"
            size="1.2 MB"
            progress={40}
            onRemove={() => {}}
          />
          <FileUploadItem
            name="moodboard.png"
            size="840 KB"
            onRemove={() => {}}
          />
        </FileUploadList>
      </div>
    </ComponentPlayground>
  );
}
