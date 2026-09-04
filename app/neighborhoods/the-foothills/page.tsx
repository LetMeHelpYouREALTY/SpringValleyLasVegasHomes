import SpringValleySubdivisionPage, {
  subdivisionMetadata,
} from "@/components/neighborhoods/SpringValleySubdivisionPage";

export const metadata = subdivisionMetadata("the-foothills");

export default function Page() {
  return <SpringValleySubdivisionPage slug="the-foothills" />;
}
