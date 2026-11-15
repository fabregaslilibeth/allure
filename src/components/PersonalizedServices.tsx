import Button from "./Button";

export default function PersonalizedServices() {
  return (
    <section
      id="about"
      className="flex flex-col-reverse gap-10 px-4 py-24 md:flex-row md:items-center md:gap-16 md:px-8 lg:px-20 lg:py-32"
    >
      <div className="flex-1">
        <div className="max-w-lg">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.3em] opacity-70">
            Endless possibilities with
          </p>
          <h2 className="mt-4 text-4xl md:text-6xl">Personalised services</h2>
          <p className="mt-6 font-body text-lg leading-relaxed md:text-xl">
            Experience luxury and elegance with our bespoke beauty services, tailored specifically to your unique style
            and preferences.
          </p>
          <Button href="/#services" className="mt-10">
            See all services
          </Button>
        </div>
      </div>

      <div className="relative aspect-[4/5] w-full flex-1 overflow-hidden md:max-h-[80vh]">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden
        >
          <source src="/allure.mp4" type="video/mp4" />
        </video>
      </div>
    </section>
  );
}
