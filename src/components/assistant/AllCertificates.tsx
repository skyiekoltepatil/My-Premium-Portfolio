import { Link } from "react-router-dom";
import { Card, Carousel } from "../projects/apple-cards-carousel";
import { CERTIFICATES } from "../../pages/Experience";

const CertificateContent = ({ certificate }: { certificate: { title: string; period: string; description: string; image: string } }) => {
  return (
    <div className="space-y-10">
      <div className="rounded-3xl bg-[#F5F5F7] p-8">
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="font-bold text-blue-600">{certificate.period}</span>
          </div>
          <p className="text-gray-900 font-sans text-base leading-relaxed md:text-lg">
            {certificate.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default function AllCertificates() {
  const cards = CERTIFICATES.map((cert) => ({
    category: 'Certificate',
    title: cert.title,
    src: cert.image,
    content: <CertificateContent certificate={cert} />
  })).map((card, index) => (
    <Card key={card.src} card={card} index={index} layout={true} />
  ));

  return (
    <div className="w-full h-full pt-4 pb-2 bg-white rounded-3xl mb-4 border border-gray-100 shadow-sm flex flex-col">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-6 w-full mb-2">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 font-sans">
          My Certificates
        </h2>
        <Link 
          to="/experience"
          className="text-sm md:text-base font-medium text-blue-600 hover:text-blue-800 transition-colors"
        >
          See more in Experience →
        </Link>
      </div>
      <Carousel items={cards} />
    </div>
  );
}
