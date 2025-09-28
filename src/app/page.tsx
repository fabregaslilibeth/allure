import Image from "next/image";
import ZoomParallax from "@/components/ZoomParallax/page";
import ScrollParallax2 from "@/components/ScrollParallax2/page";
import ScrollParallax from "@/components/ScrollParallax/page";
import FeaturedServices from "@/components/FeaturedServices/page";

export default function Home() {
  return (
    <div className="relative w-full h-[160vh] bg-green-500">
      {/* Background Image */}
      <div 
        className="absolute inset-0 w-full h-[160vh] bg-contain bg-bottom bg-no-repeat z-1"
        style={{ 
          backgroundImage: "url('/images/allure-bg.avif')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      />
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 w-full h-[160vh] bg-gradient-to-b from-black to-transparent opacity-60 z-2" />
      <div className="absolute bottom-0 left-0 right-0 w-full h-[100vh] z-3 bg-gradient-to-t from-[#E4DCCF]" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-6 lg:px-8 ">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white text-center mb-6">
          FARFETCHER
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl font-semibold text-white text-center mb-8 max-w-4xl">
          We are a team of developers who are passionate about creating beautiful and functional websites.
        </p>
        <button className="bg-[#482763] hover:bg-blue-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-md text-lg font-semibold transition-colors duration-300 shadow-lg">
          Get Started
        </button>
      </div>

      <div className="relative z-10 bg-[#E4DCCF]">
        <FeaturedServices />
      </div>

      <div>
        <ScrollParallax />
      </div>


      {/* <div>
        <ScrollParallax2 />
      </div> */}

      <div>
        <ZoomParallax />
      </div>
    </div>
  );
}
