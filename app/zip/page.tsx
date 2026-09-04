import type { Metadata } from "next";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";

export const metadata: Metadata = {
  title: "Spring Valley ZIP Codes",
  description:
    "Spring Valley Las Vegas ZIP code index: 89147, 89117, 89113, 89148, 89103, 89146, 89102, 89118, and 89178.",
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
