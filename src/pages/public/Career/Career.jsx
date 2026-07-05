import React, { useState } from "react";
import ApplicationFormNew from "../../../components/ApplicationFormNew";
import { usePageContent } from "../../../context/PageContentContext";

const Career = () => {
  const { content } = usePageContent();
  const { pageTitle, roles, ctaHeading, ctaBody, joinButtonText } = content.career;
  const [showModal, setShowModal] = useState(false);

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div>
      <div className="text-white px-6 sm:px-20 py-24 font-sans">
        <h2 className="text-4xl font-bold mb-10 pb-4">{pageTitle}</h2>

        {roles.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 border-t border-white">
            {roles.map((role, index) => (
              <div
                key={index}
                className={`border-b border-white px-4 py-6 ${
                  index % 2 === 0 ? "md:border-r" : ""
                }`}
              >
                <h3 className="text-lg font-semibold">{role.title}</h3>
                {role.description && (
                  <p className="text-white/80 text-sm mt-1 font-mono leading-6">
                    {role.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-16">
          <h4 className="text-lg font-bold mb-2">{ctaHeading}</h4>
          <p className="text-white/80 mb-4 mx-auto text-sm max-w-2xl font-mono leading-6 whitespace-pre-line">
            {ctaBody}
          </p>
          <button
            style={{
              boxShadow: "0px 6px 30px rgba(255, 255, 255, 0.1)",
            }}
            className="bg-[#AA1E6B] text-white font-semibold px-6 py-3 rounded-md transition"
            onClick={() => setShowModal(true)}
          >
            {joinButtonText}
          </button>
          {showModal && (
            <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
              <ApplicationFormNew
                onSuccess={() => setShowModal(false)}
                onClose={() => setShowModal(false)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Career;
