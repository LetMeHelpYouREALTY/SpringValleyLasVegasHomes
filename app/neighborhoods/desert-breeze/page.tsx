import SpringValleySubdivisionPage, {
  subdivisionMetadata,
} from "@/components/neighborhoods/SpringValleySubdivisionPage";

export const metadata = subdivisionMetadata("desert-breeze");

export default function Page() {
  return <SpringValleySubdivisionPage slug="desert-breeze" />;
}
