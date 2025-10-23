'use client';

import React from 'react';
import Button from '../Button/page';

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
          <Button size="medium">
              SEE ALL SERVICES zz
          </Button>
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
