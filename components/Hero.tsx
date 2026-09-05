export default function Hero() {
  return (
    <header id="welcome-section">
      <div className="forest" />
      <div className="silhouette" />
      <div className="moon" />
      <div className="container">
        <h1>
          <span className="line">
            Создаю <span className="color">Telegram-ботов</span>
          </span>
          <span className="line">и fullstack проекты</span>
        </h1>
        <p className="hero-subtitle">
          Матвей, <span className="color">Python-разработчик</span> из Санкт-Петербурга
        </p>
        <div className="buttons">
          <a href="#projects">МОИ ПРОЕКТЫ</a>
          <a href="#contact" className="cta">
            СВЯЗАТЬСЯ
          </a>
        </div>
      </div>
    </header>
  );
}
