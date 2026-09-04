import SpringValleySubdivisionPage, {
  subdivisionMetadata,
} from "@/components/neighborhoods/SpringValleySubdivisionPage";

export const metadata = subdivisionMetadata("canyon-gate");

export default function Page() {
  return <SpringValleySubdivisionPage slug="canyon-gate" />;
}
