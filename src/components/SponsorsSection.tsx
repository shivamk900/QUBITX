import { useEffect, useState } from "react";
import axios from "axios";

const SponsorLogo = ({ src, alt, tier }: any) => {
  let sizeClass = "w-28 h-28";
  if (tier === "gold") sizeClass = "w-36 h-36";
  else if (tier === "silver") sizeClass = "w-32 h-32";

  return (
    <div
      className={`bg-cyber-dark rounded-lg p-4 flex items-center justify-center ${
        tier === "gold" ? "col-span-2" : ""
      }`}
    >
      <img
        src={src}
        alt={alt}
        className={`${sizeClass} object-contain opacity-80 hover:opacity-100 transition-opacity`}
      />
    </div>
  );
};

const tierMeta: Record<
  string,
  { title: string; color: string; gridCols: string }
> = {
  title: {
    title: "Title Sponsors",
    color: "text-neon-yellow",
    gridCols: "grid-cols-1",
  },
  diamond: {
    title: "Diamond Sponsors",
    color: "text-neon-green",
    gridCols: "grid-cols-1 md:grid-cols-2",
  },
  platinum: {
    title: "Platinum Sponsors",
    color: "text-neon-silver",
    gridCols: "grid-cols-1 md:grid-cols-2",
  },
  gold: {
    title: "Gold Sponsors",
    color: "text-neon-cyan",
    gridCols: "grid-cols-1 md:grid-cols-2",
  },
  silver: {
    title: "Silver Sponsors",
    color: "text-neon-blue",
    gridCols: "grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
  },
};

const SponsorsSection = () => {
  const [sponsorTiers, setSponsorTiers] = useState<
    { tier: string; sponsors: { src: string; alt: string }[] }[]
  >([]);

  // Assuming SponsorLogo & tierMeta defined as you posted
  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const res = await axios.get("https://qubitx-backend.onrender.com/api/sponsors");

        // Convert object to array of { tier, sponsors }

        const priority = [
          "title",
          "diamond",
          "platinum",
          "gold",
          "silver",
          "bronze",
        ];

        const transformed = Object.entries(res.data)
          .map(([tier, sponsors]) => ({
            tier,
            sponsors: Array.isArray(sponsors)
              ? sponsors.map((sponsor: any) => ({
                  src: sponsor.src || "",
                  alt: sponsor.alt || "",
                }))
              : [],
          }))
          .sort((a, b) => priority.indexOf(a.tier) - priority.indexOf(b.tier));

        setSponsorTiers(transformed);
      } catch (err) {
        console.error("Failed to fetch sponsor data", err);
      }
    };

    fetchSponsors();
  }, []);

  return (
    <section className="py-20 bg-cyber-dark bg-grid">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">
              Our Sponsors
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-blue to-neon-purple mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            QUBITX-GLBM is made possible by these amazing organizations who
            share our vision for innovation and technological advancement.
          </p>
        </div>

        {Array.isArray(sponsorTiers) &&
          sponsorTiers.map(({ tier, sponsors }) => {
            const meta = tierMeta[tier] || {
              title: `${tier.charAt(0).toUpperCase() + tier.slice(1)} Sponsors`,
              color: "text-white",
              gridCols: "grid-cols-2 md:grid-cols-3",
            };

            return (
              <div key={tier} className="mb-12">
                <div className="flex flex-col items-center mb-6">
                  <img
                    src={`/images/${tier}-icon.png`}
                    alt={`${tier} icon`}
                    className="w-16 h-16 mb-4"
                  />
                  <h3 className={`text-xl font-bold text-center ${meta.color}`}>
                    {meta.title}
                  </h3>
                </div>
                <div
                  className={`grid ${meta.gridCols} gap-4 max-w-4xl mx-auto`}
                >
                  {sponsors.map((sponsor, index) => (
                    <SponsorLogo
                      key={index}
                      src={sponsor.src}
                      alt={sponsor.alt}
                      tier={tier}
                    />
                  ))}
                </div>
              </div>
            );
          })}

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-4">Become a Sponsor</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Interested in supporting the next generation of tech innovators?
            Join our sponsorship program and showcase your brand to top tech
            talent.
          </p>
          <a
            href="#"
            className="px-8 py-3 bg-transparent border border-neon-cyan text-white hover:bg-neon-cyan/10 font-bold rounded-md transition-all inline-block"
          >
            Get Sponsorship Info
          </a>
        </div>
      </div>
    </section>
  );
};

export default SponsorsSection;
