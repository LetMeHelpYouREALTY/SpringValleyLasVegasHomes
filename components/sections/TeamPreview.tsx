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
        <div className="grid sm:grid-cols-2 gap-10 max-w-3xl mx-auto">
          <article className="text-center">
            <div className="mx-auto mb-6 w-48 aspect-[3/4] overflow-hidden bg-cream">
              <AgentHeadshot
                frameClassName="w-full h-full aspect-[3/4]"
                sizes="192px"
              />
            </div>
            <h3 className="text-lg text-ink mb-1">
              {teamInfo.teamLeader.name}
            </h3>
            <p className="text-[11px] uppercase tracking-luxury text-mist font-light">
              {teamInfo.teamLeader.role}
            </p>
          </article>
          <article className="text-center">
            <div className="mx-auto mb-6 w-48 aspect-[3/4] bg-cream flex items-center justify-center">
              <span
                className="text-3xl tracking-luxury text-mist font-light"
                aria-hidden
              >
                {teamInfo.buyerAgent.name
                  .split(" ")
                  .map((part) => part[0])
                  .join("")}
              </span>
            </div>
            <h3 className="text-lg text-ink mb-1">
              {teamInfo.buyerAgent.name}
            </h3>
            <p className="text-[11px] uppercase tracking-luxury text-mist font-light">
              {teamInfo.buyerAgent.role}
            </p>
          </article>
        </div>
        <div className="text-center mt-12">
          <Link href="/about" className="btn-luxury">
            Meet the Team
          </Link>
        </div>
      </div>
    </section>
  );
}
