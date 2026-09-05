import SpringValleySubdivisionPage, {
  subdivisionMetadata,
} from "@/components/neighborhoods/SpringValleySubdivisionPage";

export const metadata = subdivisionMetadata("buffalo-ranch");

export default function Page() {
  return <SpringValleySubdivisionPage slug="buffalo-ranch" />;
}
