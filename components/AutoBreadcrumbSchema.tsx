import { headers } from "next/headers";
import SchemaScript from "@/components/SchemaScript";
import { breadcrumbsFromPathname } from "@/lib/breadcrumb-from-path";
import { generateBreadcrumbSchema } from "@/lib/schema";

/**
 * Server-rendered BreadcrumbList JSON-LD for all inner pages (pathname from middleware).
 */
export default async function AutoBreadcrumbSchema() {
  const headerList = await headers();
  const pathname = headerList.get("x-pathname") ?? "/";
  const items = breadcrumbsFromPathname(pathname);
  if (!items || items.length < 2) {
    return null;
  }

  return (
    <SchemaScript
      schema={generateBreadcrumbSchema(items)}
      id="auto-breadcrumb-schema"
    />
  );
}
