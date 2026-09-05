import SpringValleySubdivisionPage, {
  subdivisionMetadata,
} from "@/components/neighborhoods/SpringValleySubdivisionPage";

export const metadata = subdivisionMetadata("granada-hills");

export default function Page() {
  return <SpringValleySubdivisionPage slug="granada-hills" />;
}
