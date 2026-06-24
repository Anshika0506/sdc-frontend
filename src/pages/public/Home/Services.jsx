import React, { useEffect, useState } from 'react';

import SupportIcon from '../../../assets/images/Support.png';
import SecuredLetterIcon from '../../../assets/icons/imail.svg';
import EditIcon from '../../../assets/icons/edit.svg';
import ServiceIcon from '../../../assets/icons/setting.svg';

const defaultIcons = [SupportIcon, SecuredLetterIcon, EditIcon, SecuredLetterIcon, SecuredLetterIcon, ServiceIcon];

const ServiceGrid = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
    setServices([]);
  }, []);

  if (loading) {
    return (
      <div className="w-full px-4 py-16 flex flex-col items-center">
        <p className="text-white text-center">Loading services...</p>
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <div className="w-full px-4 py-16 flex flex-col items-center">
        <h2 className="text-center text-white text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight mb-6">
          Services Snapshot
        </h2>
        <p className="text-white/60 text-center">No services to display.</p>
      </div>
    );
  }

  return (
    <div className="w-full px-4 py-16 flex flex-col items-center">
      <div className="w-full max-w-[940px] flex flex-col items-center gap-12">
        <h2 className="text-center text-white text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight">
          Services Snapshot
        </h2>

        <div className="grid grid-cols-3 w-full">
          {services.map((service, index) => (
            <div
              key={service.id || index}
              className={`aspect-square flex flex-col justify-center items-center gap-6 sm:gap-8 p-2 sm:p-4 
                ${index < 3 ? 'border-b-2' : ''} 
                ${index % 3 !== 2 ? 'border-r-2' : ''} 
                border-white`}
            >
              <img
                src={service.icon || defaultIcons[index % defaultIcons.length]}
                alt={`${service.title} icon`}
                className="w-6 h-6 sm:w-8 sm:h-8"
              />
              <div className="text-center text-white text-sm sm:text-lg font-semibold leading-snug px-2">
                {service.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceGrid;
