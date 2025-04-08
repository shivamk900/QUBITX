import { sponsorsData } from "@/utils/data";
const SponsorLogo = ({ src, alt, tier }) => {
  let sizeClass = "w-28 h-28";
  if (tier === "gold") {
    sizeClass = "w-36 h-36";
  } else if (tier === "silver") {
    sizeClass = "w-32 h-32";
  }
  
  return (
    <div className={`bg-cyber-dark rounded-lg p-4 flex items-center justify-center ${tier === "gold" ? "col-span-2" : ""}`}>
      <img 
        src={src} 
        alt={alt} 
        className={`${sizeClass} object-contain opacity-80 hover:opacity-100 transition-opacity filter brightness-0 invert`}
      />
    </div>
  );
};

const SponsorsSection = () => {

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
            QUBITX-GLBM is made possible by these amazing organizations who share our vision for innovation and technological advancement.
          </p>
        </div>

        <div className="mb-12">
          <h3 className="text-xl font-bold text-center mb-6 text-neon-green">Diamond Sponsors</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {sponsorsData.diamond.map((sponsor, index) => (
              <SponsorLogo key={index} src={sponsor.src} alt={sponsor.alt} tier="platinum" />
            ))}
          </div>
          <h3 className="text-xl font-bold text-center mb-6 text-neon-cyan">Gold Sponsors</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {sponsorsData.gold.map((sponsor, index) => (
              <SponsorLogo key={index} src={sponsor.src} alt={sponsor.alt} tier="gold" />
            ))}
          </div>
        </div>
        
        <div className="mb-12">
          <h3 className="text-xl font-bold text-center mb-6 text-neon-blue">Silver Sponsors</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {sponsorsData.silver.map((sponsor, index) => (
              <SponsorLogo key={index} src={sponsor.src} alt={sponsor.alt} tier="silver" />
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-bold text-center mb-6 text-neon-purple">Bronze Sponsors</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {sponsorsData.bronze.map((sponsor, index) => (
              <SponsorLogo key={index} src={sponsor.src} alt={sponsor.alt} tier="bronze" />
            ))}
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-4">Become a Sponsor</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Interested in supporting the next generation of tech innovators? Join our sponsorship program and showcase your brand to top tech talent.
          </p>
          <a href="#" className="px-8 py-3 bg-transparent border border-neon-cyan text-white hover:bg-neon-cyan/10 font-bold rounded-md transition-all inline-block">
            Get Sponsorship Info
          </a>
        </div>
      </div>
    </section>
  );
};

export default SponsorsSection;
