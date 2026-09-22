import { redirect } from "next/navigation";

// The marketing homepage now lives at ui.paubha.tech (separate repo). This
// domain is docs+registry only, so its root just forwards into the docs.
export default function RootPage() {
  redirect("/docs");
}
