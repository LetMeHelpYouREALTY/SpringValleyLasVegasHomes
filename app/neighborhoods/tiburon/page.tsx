import SpringValleySubdivisionPage, {
  subdivisionMetadata,
} from "@/components/neighborhoods/SpringValleySubdivisionPage";

export const metadata = subdivisionMetadata("tiburon");

export default function Page() {
  return <SpringValleySubdivisionPage slug="tiburon" />;
}
