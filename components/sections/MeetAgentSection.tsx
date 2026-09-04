import Link from "next/link";
import AgentHeadshot from "@/components/shared/AgentHeadshot";
import { agentInfo, agentStats, valuePropositions } from "@/lib/site-config";

export default function MeetAgentSection() {
  return (
    <section className="bg-cream" aria-labelledby="meet-agent-heading">
      <div className="grid md:grid-cols-2 min-h-[520px]">
        <div className="relative min-h-[360px] md:min-h-full bg-cream flex items-center justify-center p-8 md:p-12">
          <AgentHeadshot
            frameClassName="w-56 sm:w-64 md:w-80 aspect-[3/4] max-w-full"
            sizes="320px"
          />
        </div>
        <div className="flex items-center px-6 py-16 md:px-16 lg:px-20 md:py-24">
          <div className="max-w-xl">
            <p className="text-[11px] uppercase tracking-luxury text-mist mb-3 font-light">
              {agentInfo.license}
            </p>
            <h2
              id="meet-agent-heading"
              className="text-3xl md:text-4xl text-ink mb-6"
            >
              Meet Dr. Jan Duffy
            </h2>
            <p className="text-neutral-700 font-light leading-relaxed mb-4 normal-case tracking-normal">
              Dr. Jan Duffy represents buyers and sellers inside Spring Valley —
              Spanish Trail, Desert Breeze, Chinatown, and the streets between
              Sahara Avenue and Warm Springs Road. Local market knowledge from{" "}
              {agentStats.servingSince} and {agentStats.volumeClosed} in closed
              transactions, with Berkshire Hathaway HomeServices Nevada
              Properties.
            </p>
            <p className="text-neutral-700 font-light leading-relaxed mb-8 normal-case tracking-normal">
              {valuePropositions.expertise}
            </p>
            <Link href="/about" className="btn-luxury">
              About Dr. Jan
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
