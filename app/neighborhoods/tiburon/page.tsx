import type { Metadata } from "next";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";

export const metadata: Metadata = {
  title: "Tiburon Spring Valley Homes",
  description:
    "Tiburon in Spring Valley—eight phases by Rhodes Homes near Tropicana and El Capitan.",
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
