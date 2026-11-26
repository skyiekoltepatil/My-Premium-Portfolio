import { motion } from 'framer-motion';
import innovateImage from '../../assets/INNOVATE-image.webp';
import gymImage from '../../assets/GYM-image.webp';

const PHOTOS = [
  {
    num: '01',
    url: gymImage,
    alt: 'Discipline through strength training',
    keyword: 'Create',
    discipline: 'DISCIPLINE',
  },
  {
    num: '02',
    url: innovateImage,
    alt: 'Engineering and creative coding workspace',
    keyword: 'Innovate',
    discipline: 'SYSTEMS',
  },
  {
    num: '03',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=75&w=600&auto=format&fit=crop',
    alt: 'Coastal horizon at sunset',
    keyword: 'Inspire',
    discipline: 'CLARITY',
  },
  {
    num: '04',
    url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=75&w=600&auto=format&fit=crop',
    alt: 'Sunlit forest canopy',
    keyword: 'Collaborate',
    discipline: 'BALANCE',
  },
  {
    num: '05',
    url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=75&w=600&auto=format&fit=crop',
    alt: 'Abstract chromatic studio form',
    keyword: 'Grow',
    discipline: 'MOMENTUM',
  },
];

export const PhotoGallery = () => {
  return (
    <section aria-labelledby="visual-journal-heading" className="py-12 md:py-20 bg-[#F9F9F8] relative z-20 w-full">
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 md:px-10">
        <div className="border border-stone-300/80 bg-[#FAF9F7] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-sm">
          {/* Kicker Bar */}
          <div className="px-6 sm:px-10 py-4 border-b border-stone-200 flex flex-wrap items-center justify-between gap-4 text-[11px] font-mono tracking-[0.2em] uppercase text-stone-500">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#FF4400]" />
              <h2 id="visual-journal-heading" className="font-bold text-stone-950 font-mono text-[11px]">
                01 / VISUAL JOURNAL
              </h2>
            </div>
            <span className="font-semibold">FIVE PRINCIPLES IN MOTION — 001 TO 005</span>
          </div>

          {/* Uniform 5-Column Editorial Contact Sheet */}
          <div className="p-4 sm:p-6 md:p-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 bg-white">
            {PHOTOS.map((photo, i) => (
              <motion.div
                key={photo.num}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className={`group relative aspect-[3/4] rounded-2xl overflow-hidden border border-stone-200 bg-stone-100 cursor-default ${
                  i === 4 ? 'col-span-2 sm:col-span-1 aspect-[16/9] sm:aspect-[3/4]' : ''
                }`}
              >
                <img
                  src={photo.url}
                  alt={photo.alt}
                  width={360}
                  height={480}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />

                {/* Top Corner Index Stamp */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[10px] font-mono font-bold tracking-widest uppercase text-white/85">
                  <span>{photo.num}</span>
                  <span>{photo.discipline}</span>
                </div>

                {/* Inside-Frame Principle Tag */}
                <div className="absolute bottom-3.5 left-4 right-4 flex items-center justify-between">
                  <span className="font-editorial italic text-xl sm:text-2xl text-white tracking-tight group-hover:translate-x-0.5 transition-transform duration-300">
                    {photo.keyword}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF4400] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
