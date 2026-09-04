import Link from "next/link";
import Image from "next/image";
import { isCfDeliveryUrl } from "@/lib/cf-image-delivery";
import { workWithMeImageAlt, workWithMeImageSrc } from "@/lib/site-media";
import { agentInfo } from "@/lib/site-config";

export default function WorkWithMeCta() {
  const src = workWithMeImageSrc;

  return (
    <section className="relative min-h-[480px] md:min-h-[620px] flex items-center justify-center text-center overflow-hidden">
      <Image
        src={src}
        alt={workWithMeImageAlt}
        fill
        sizes="100vw"
        className="object-cover"
        unoptimized={isCfDeliveryUrl(src)}
      />
      <div className="absolute inset-0 bg-black/35" aria-hidden />
      <div className="relative z-10 px-6 py-20 max-w-2xl">
        <h2 className="text-white text-3xl md:text-4xl lg:text-5xl mb-6">
          Work With Me
        </h2>
        <p className="text-white/90 font-light leading-relaxed mb-10 normal-case tracking-normal">
          Buying or selling inside Spring Valley — Spanish Trail, Desert Breeze,
          Chinatown, and the west-valley streets between Sahara and Warm
          Springs? Call Dr. Jan Duffy and we walk the deal from first search to
          closing.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact" className="btn-luxury-light">
            Contact Us
          </Link>
          <a href={agentInfo.phoneTel} className="btn-luxury-light">
            Call {agentInfo.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
