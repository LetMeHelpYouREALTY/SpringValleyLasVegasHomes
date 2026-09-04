import type { Metadata } from "next";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";

export const metadata: Metadata = {
  title: "Spring Valley vs Summerlin",
  description: "Compare Spring Valley and Summerlin for Las Vegas homebuyers.",
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
