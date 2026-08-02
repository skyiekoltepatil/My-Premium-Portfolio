
interface RollingTextProps {
  text: string;
  heightClass?: string;
  leadingClass?: string;
}

export const RollingText = ({
  text,
  heightClass = "h-[20px] sm:h-[22px]",
  leadingClass = "leading-[20px] sm:leading-[22px]"
}: RollingTextProps) => {
  return (
    <div className={`flex overflow-hidden ${heightClass} ${leadingClass}`}>
      {text.split('').map((char, i) => (
        <div
          key={i}
          className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover/text:-translate-y-1/2"
          style={{ transitionDelay: `${i * 0.015}s`, height: '200%' }}
        >
          <span className="flex-1 flex items-center justify-center">{char === ' ' ? '\u00A0' : char}</span>
          <span className="flex-1 flex items-center justify-center">{char === ' ' ? '\u00A0' : char}</span>
        </div>
      ))}
    </div>
  );
};
