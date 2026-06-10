export default function About() {
  return (
    <section id="about">
      <div className="wrapper">
        <article>
          <div className="title reveal-on-scroll">
            <h3>Кто этот парень?</h3>
            <div className="separator" />
            <p className="subtitle">Меня зовут Матвей.</p>
          </div>
          <div className="desc full reveal-on-scroll">
            <p>
              Создаю стабильные backend-архитектуры и умные Telegram-боты для бизнеса. Работаю с
              SQLAlchemy, Redis, SQLite, PostgreSQL и Docker. Проектирую REST API, системы тикетов,
              ERP для бизнеса и образовательные боты с интерактивным контентом.
            </p>
          </div>
          <div className="title reveal-on-scroll">
            <h3>Чем я занимаюсь?</h3>
            <div className="separator" />
            <p className="subtitle">Backend и Telegram-боты.</p>
          </div>
          <div className="desc reveal-on-scroll">
            <p>
              <strong>Python-разработчик.</strong> Создаю Telegram-ботов на Aiogram с FSM,
              интеграциями и админ-панелями. Проектирую REST API, CRM-системы и автоматизацию
              бизнес-процессов.
            </p>
          </div>
          <div className="desc reveal-on-scroll">
            <p>
              <strong>Backend-системы.</strong> Разрабатываю серверную логику, интеграции с внешними
              сервисами и надёжные хранилища данных. Санкт-Петербург · бокс · английский B2. Открыт
              к новым проектам и сотрудничеству.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
