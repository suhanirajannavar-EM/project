export default function AboutPage() {
  return (
    <div className="section-padding">
      <div className="container-narrow max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          About <span className="gold-text">The AdSphere Awards</span>
        </h1>
        <div className="prose prose-invert prose-gold max-w-none space-y-6 text-charcoal-300 leading-relaxed">
          <p className="text-lg">
            The AdSphere Awards is a prestigious platform dedicated to recognising
            and celebrating outstanding achievements in advertising, branding,
            marketing, creative communication and innovative campaigns.
          </p>
          <h2 className="text-2xl font-semibold text-white mt-10">Our Purpose</h2>
          <p>
            In an industry driven by ideas, craft and cultural impact, there is a
            need for a focused celebration of excellence. The AdSphere Awards exists
            to honour the campaigns, creatives and organisations that push boundaries
            and set new standards.
          </p>
          <h2 className="text-2xl font-semibold text-white mt-10">Who Can Participate</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Advertising and creative agencies</li>
            <li>Brand managers and marketing teams</li>
            <li>Independent creatives and freelancers</li>
            <li>Emerging brands and startups</li>
            <li>Students of advertising, design and marketing</li>
            <li>Content creators and digital marketers</li>
          </ul>
          <h2 className="text-2xl font-semibold text-white mt-10">Vision</h2>
          <p>
            To become the definitive awards platform where the best ideas in
            advertising and branding are recognised, shared and remembered —
            where ideas truly become icons.
          </p>
          <p className="text-gold-400 font-medium mt-8">
            Event dates: 20–21 February 2027 · Location: Bengaluru, Karnataka, India
          </p>
        </div>
      </div>
    </div>
  );
}
