import SpringValleySubdivisionPage, {
  subdivisionMetadata,
} from "@/components/neighborhoods/SpringValleySubdivisionPage";

export const metadata = subdivisionMetadata("rancho-viejo");

export default function Page() {
  return <SpringValleySubdivisionPage slug="rancho-viejo" />;
}
