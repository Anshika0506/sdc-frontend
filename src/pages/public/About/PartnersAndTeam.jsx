import React from "react";

const PartnersAndTeam = () => {
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <section className="text-white py-16 px-4 max-w-6xl mx-auto">
        <h2
          className="text-4xl font-bold text-center mb-12"
          style={{ fontFamily: "Inter", fontWeight: 600, fontSize: 48 }}
        >
          Our Partners
        </h2>
        <p className="text-white/60 text-center">No partners to display.</p>
      </section>

      <section className="text-white py-16 px-4 max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">
          Minds Behind The Website
        </h2>
        <p className="text-white/60 text-center">No team credits to display.</p>
      </section>
    </>
  );
};

export default PartnersAndTeam;
