'use client';

import React from 'react';

const PersonalizedServices = () => {
  return (
    <section className="flex min-h-screen w-full flex-col-reverse md:flex-row relative overflow-hidden p-0 md:p-20 md:pr-40 text-primary">
      {/* Content Section */}
      <div className="flex flex-1 flex items-center justify-center p-4 md:p-8 relative z-10">
        <div className="max-w-lg text-left">
            <p>Endless possibilities with</p>
          <h2 className="text-2xl md:text-6xl mb-6 uppercase">
            Personalised Services
          </h2>
          <p className="text-sm md:text-xl mb-10 font-normal">
            Experience luxury and elegance with our bespoke beauty services, 
            tailored specifically to your unique style and preferences.
          </p>
          <button className="group relative bg-gradient-to-r from-indigo-500 to-purple-600 border-none py-2 md:py-4 px-4 md:px-10 rounded-full text-sm md:text-lg font-semibold cursor-pointer overflow-hidden transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 active:translate-y-0 uppercase tracking-wide">
            <span className="relative z-10 transition-colors duration-300 text-white">
              See all Services
            </span>
            <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-purple-600 to-indigo-500 transition-all duration-500 group-hover:left-0 z-0"></div>
          </button>
        </div>
      </div>

      {/* Video Section */}
      <div className="flex-0 md:flex-1 relative overflow-hidden">
        <video 
          className="w-full h-full object-cover object-center"
          autoPlay 
          muted 
          loop 
          playsInline
        >
          <source src="/allure.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Mobile Layout */}
    </section>
  );
};

export default PersonalizedServices;
