import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-[160vh]">
      <Image src="/images/allure-bg.avif" alt="" fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-screen bg-gradient-to-t from-secondary" />

      <div className="relative flex h-full items-center justify-center px-4">
        <h1 className="text-center text-5xl tracking-[0.12em] text-white md:text-7xl lg:text-8xl">Allure</h1>
      </div>
    </section>
  );
}
