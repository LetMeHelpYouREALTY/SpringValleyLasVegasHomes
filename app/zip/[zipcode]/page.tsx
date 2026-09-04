import type { Metadata } from "next";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import { springValleyZips } from "@/lib/spring-valley-ia";

export function generateStaticParams() {
  return springValleyZips.map((zipcode) => ({ zipcode }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ zipcode: string }>;
}): Promise<Metadata> {
  const { zipcode } = await params;
  return {
    title: `Spring Valley ZIP ${zipcode} Homes`,
    description: `Spring Valley Las Vegas homes in ZIP code ${zipcode}.`,
  };
}

export default async function ZipCodePage({
  params,
}: {
  params: Promise<{ zipcode: string }>;
}) {
  await params;
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        {/* CONTENT: pending */}
      </main>
      <Footer />
    </>
  );
}
