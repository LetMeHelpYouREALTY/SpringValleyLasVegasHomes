import Link from "next/link";
import { teamInfo } from "@/lib/site-config";
import AgentHeadshot from "@/components/shared/AgentHeadshot";

export default function TeamPreview() {
  return (
    <section className="bg-white py-16 md:py-24" aria-labelledby="team-heading">
      <div className="container mx-auto px-4">
        <h2
          id="team-heading"
          className="text-center text-3xl md:text-4xl text-ink mb-14"
        >
          The Team
        </h2>
        <article className="text-center max-w-sm mx-auto">
          <div className="mx-auto mb-6 w-48 aspect-square">
            <AgentHeadshot
              frameClassName="w-full h-full aspect-square"
              sizes="192px"
            />
          </div>
          <h3 className="text-lg text-ink mb-1">{teamInfo.teamLeader.name}</h3>
          <p className="text-[11px] uppercase tracking-luxury text-mist font-light">
            {teamInfo.teamLeader.role}
          </p>
        </article>
        <div className="text-center mt-12">
          <Link href="/about" className="btn-luxury">
            Meet Dr. Jan
          </Link>
        </div>
      </div>
    </section>
  );
}
