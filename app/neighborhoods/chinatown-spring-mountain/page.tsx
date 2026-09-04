import SpringValleySubdivisionPage, {
  subdivisionMetadata,
} from "@/components/neighborhoods/SpringValleySubdivisionPage";

export const metadata = subdivisionMetadata("chinatown-spring-mountain");

export default function Page() {
  return <SpringValleySubdivisionPage slug="chinatown-spring-mountain" />;
}
