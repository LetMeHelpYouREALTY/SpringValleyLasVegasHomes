import SpringValleySubdivisionPage, {
  subdivisionMetadata,
} from "@/components/neighborhoods/SpringValleySubdivisionPage";

export const metadata = subdivisionMetadata("spanish-trail");

export default function Page() {
  return <SpringValleySubdivisionPage slug="spanish-trail" />;
}
