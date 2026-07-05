import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Mail from '../../../assets/icons/mail.png';
import { usePageContent } from "../../../context/PageContentContext";

const Services = () => {
  const { content, loading } = usePageContent();
  const { pageTitle, items, ctaHeading, ctaBody } = content.services;
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="text-white px-6 sm:px-10 lg:px-20 py-6 font-sans">
      <h2
        className="mt-20 pb-6 mb-10 font-bold border-b border-white text-2xl sm:text-3xl"
        style={{
          fontFamily: 'sans-serif',
          fontWeight: 600,
          lineHeight: '32px',
        }}
      >
        {pageTitle}
      </h2>

      {loading ? (
        <p className="text-white/80 text-center py-10">Loading services...</p>
      ) : items.length === 0 ? (
        <p className="text-white/60 text-center py-10">No services to display.</p>
      ) : (
        <div className="space-y-8">
          {items.map((service, index) => (
            <div key={index} className="border-b border-white pb-4">
              <h3
                className="text-lg sm:text-xl font-semibold"
                style={{
                  fontFamily: 'sans-serif',
                  fontWeight: 600,
                  lineHeight: '28px',
                }}
              >
                {service.title}
              </h3>
              {service.description && (
                <p
                  className="text-white/80 mt-1 text-sm sm:text-base"
                  style={{
                    fontFamily: 'Courier',
                    fontWeight: 400,
                    lineHeight: '24px',
                  }}
                >
                  {service.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="mt-10 text-center py-8 px-4 rounded-lg backdrop-blur-sm">
        <h4 className="text-lg sm:text-xl font-bold mb-2">{ctaHeading}</h4>
        <p
          className="text-sm sm:text-base text-white/80"
          style={{
            fontFamily: 'monospace',
            fontWeight: 400,
            lineHeight: '24px',
          }}
        >
          {ctaBody}
        </p>
      </div>

      <div className="flex justify-center mb-10">
        <button
          onClick={() => navigate("/contact")}
          style={{
            boxShadow: "0px 6px 30px rgba(255, 255, 255, 0.1)",
          }}
          className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-[206px] h-[52px] bg-[#AA1E6B] text-white font-semibold text-lg px-6 py-3 rounded-md flex justify-center items-center gap-3 transition duration-200"
        >
          CONTACT US
          <img src={Mail} alt="Mail Icon" className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default Services;
