import React from "react";
import partner1 from "../../../assets/graphics/partner1.svg";
import partner2 from "../../../assets/graphics/partner2.svg";
import { usePageContent } from "../../../context/PageContentContext";

const partnerImages = [partner1, partner2];

const PartnersAndTeam = () => {
  const { content } = usePageContent();
  const {
    partnersHeading,
    partners,
    creditsHeading,
    websiteCredits,
  } = content.about;

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
          {partnersHeading}
        </h2>

        {partners.length === 0 ? (
          <p className="text-white/60 text-center">No partners to display.</p>
        ) : (
          partners.map((partner, index) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row items-start gap-6 mb-10 ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              <img
                src={partnerImages[index % partnerImages.length]}
                alt={partner.name}
                className="w-full md:w-[267px] h-[200px] object-cover rounded-xl shadow-lg"
              />
              <div>
                <h3
                  className="text-2xl font-semibold mb-2"
                  style={{ fontFamily: "Inter", fontWeight: 600, fontSize: 24 }}
                >
                  {partner.name}
                </h3>
                <p
                  className="text-sm font-mono text-gray-300"
                  style={{ fontWeight: 400, fontSize: 16 }}
                >
                  {partner.description}
                </p>
              </div>
            </div>
          ))
        )}
      </section>

      <section className="text-white py-16 px-4 max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">
          {creditsHeading}
        </h2>

        {websiteCredits.length === 0 ? (
          <p className="text-white/60 text-center">No team credits to display.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-left">
            {websiteCredits.map((group, index) => (
              <div key={index}>
                <h3 className="text-2xl font-semibold mb-3">{group.category}</h3>
                {(group.members || "")
                  .split("\n")
                  .filter(Boolean)
                  .map((name, nameIndex) => (
                    <p
                      key={nameIndex}
                      className="text-sm font-mono text-gray-300"
                    >
                      {name}
                    </p>
                  ))}
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default PartnersAndTeam;
