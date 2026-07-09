import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function AgencyStory() {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text Editorial */}
          <div className="lg:col-span-7 space-y-6">
            <SectionHeader
              label="Our Story"
              title="Building Trust Since 2015"
              align="left"
            />
            
            <p className="text-base text-muted/95 leading-relaxed">
              Founded in Tizi Ouzou, Algeria, Land Travel emerged from a simple observation: navigating student admissions abroad, planning customized family tours, and booking pilgrimage packages often involve complex bureaucracy, hidden fees, and administrative hurdles.
            </p>

            <p className="text-base text-muted/95 leading-relaxed">
              We set out to create a consulting agency built on transparency, certified expertise, and end-to-end follow-up. Over the years, we have built key partnerships with major university networks in Europe, Asia, and Canada, while coordinating custom tour itineraries for hundreds of families and pilgrims.
            </p>

            <p className="text-base text-muted/95 leading-relaxed">
              Today, our division has expanded to offer specialized advisory desks, certified translation coordination, block account verification, and a H24 emergency customer helpline, ensuring every journey is secure, structured, and successful.
            </p>
          </div>

          {/* Image */}
          <div className="lg:col-span-5 relative aspect-[4/3] rounded-3xl overflow-hidden border border-border shadow-lg">
            <Image
              src="/plane and tree only.webp"
              alt="Land Travel Agency Story"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
