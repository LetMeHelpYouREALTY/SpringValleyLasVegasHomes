import { agentStats } from "@/lib/site-config";

const stats = [
  { value: agentStats.volumeClosed, label: "In Career Sales" },
  { value: `${agentStats.transactionsClosed}+`, label: "Transactions Closed" },
  { value: `Since ${agentStats.servingSince}`, label: "Las Vegas Market" },
  {
    value: `${agentStats.averageRating}★`,
    label: `${agentStats.reviewCount}+ Google Reviews`,
  },
];

export default function StatsBand() {
  return (
    <section
      className="bg-white py-16 md:py-24"
      aria-labelledby="stats-heading"
    >
      <div className="container mx-auto px-4">
        <h2
          id="stats-heading"
          className="mx-auto mb-14 max-w-3xl text-center text-xl md:text-2xl lg:text-3xl font-normal leading-snug text-ink"
        >
          Closed volume, transactions, and reviews from Dr. Jan Duffy&apos;s
          Spring Valley and Las Vegas Valley practice
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 max-w-5xl mx-auto">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl md:text-3xl font-normal tracking-headline text-ink mb-3 normal-case">
                {stat.value}
              </p>
              <p className="text-[11px] uppercase tracking-luxury text-mist font-light">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
