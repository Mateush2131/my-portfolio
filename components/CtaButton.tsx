type CtaButtonProps = {
  className?: string;
  label?: string;
};

export default function CtaButton({
  className = '',
  label = 'Заказать проект →',
}: CtaButtonProps) {
  return (
    <div className={`section-cta ${className}`.trim()}>
      <a href="#contact" className="cta-button">
        {label}
      </a>
    </div>
  );
}
