export default function AboutSection() {
  return (
    <section
      className="relative bg-secondary/50 py-12 sm:py-16 border-b border-border"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center sm:text-left">
        <h2
          id="about-heading"
          className="font-display text-2xl font-extrabold tracking-tight text-heading sm:text-3xl"
        >
          About Sheferoy Guppy
        </h2>

        <div className="mt-4 space-y-3 text-sm sm:text-base leading-relaxed text-body">
          <p>
            Sheferoy Guppy specialises in ornamental aquarium fish, including fancy guppies, colourful bettas, and selected breeding pairs. Our collection includes varieties with distinctive colours, patterns, and fin shapes for aquarium enthusiasts and fish breeders.
          </p>
          <p>
            Contact us to learn about current fish availability, pricing, breeding pair options, and the varieties that best suit your interests.
          </p>
        </div>
      </div>
    </section>
  );
}
