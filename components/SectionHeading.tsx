type SectionHeadingProps = {
  title: string;
  subtitle?: string;
  className?: string;
};

export default function SectionHeading({ title, subtitle, className = '' }: SectionHeadingProps) {
  return (
    <div className={`section-heading reveal-on-scroll ${className}`.trim()}>
      <h3 className="title">{title}</h3>
      <div className="separator" />
      {subtitle ? <p className="subtitle">{subtitle}</p> : null}
    </div>
  );
}
