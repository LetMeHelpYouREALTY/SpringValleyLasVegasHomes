import type { Metadata } from "next";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";

export const metadata: Metadata = {
  title: "Spring Valley Homes for Sale",
  description:
    "On-site inventory of Spring Valley Las Vegas homes for sale, with a Spring Valley filter preset.",
};

export default function Page() {
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
