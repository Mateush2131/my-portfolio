type ProjectCTAProps = {
  title: string;
};

export default function ProjectCTA({ title }: ProjectCTAProps) {
  return (
    <section className="project-landing-section">
      <div className="project-landing-cta glass-panel">
        <h2>Заказать такой же проект</h2>
        <p>
          Нужен похожий результат для вашего бизнеса? Оставьте заявку — обсудим задачу и сроки.
        </p>
        <a href="/#contact" className="project-landing-btn project-landing-btn-accent">
          Оставить заявку
        </a>
        <p className="project-landing-cta-note">Кейс: {title}</p>
      </div>
    </section>
  );
}
