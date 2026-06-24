import React, { useState } from "react";
import ApplicationFormNew from "../../../components/ApplicationFormNew";

const Career = () => {
  const [showModal, setShowModal] = useState(false);

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div>
      <div className="text-white px-6 sm:px-20 py-24 font-sans">
        <h2 className="text-4xl font-bold mb-10 pb-4">Career At SDC</h2>

        <div className="text-center mt-16">
          <h4 className="text-lg font-bold mb-2">
            Build More Than Code — Build a Better Future
          </h4>
          <p className="text-white/80 mb-4 mx-auto text-sm max-w-2xl font-mono leading-6">
            Join our team of innovators, problem-solvers, and changemakers. Your
            skills can drive real-world impact.
            <br />
            Ready to make a difference?
          </p>
          <button
            style={{
              boxShadow: "0px 6px 30px rgba(255, 255, 255, 0.1)",
            }}
            className="bg-[#AA1E6B] text-white font-semibold px-6 py-3 rounded-md transition"
            onClick={() => setShowModal(true)}
          >
            JOIN US NOW
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
