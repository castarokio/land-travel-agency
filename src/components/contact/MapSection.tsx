export function MapSection() {
  const mapEmbedUrl = "https://www.google.com/maps?q=Tizi%20Ouzou%2C%20Algeria&output=embed";

  return (
    <section id="map-section" className="w-full relative rounded-3xl overflow-hidden border border-border shadow-sm h-[350px] md:h-[450px]">
      <iframe
        title="Land Travel Agency Location"
        src={mapEmbedUrl}
        className="w-full h-full border-0 absolute inset-0 grayscale contrast-125"
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </section>
  );
}
