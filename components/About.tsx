import Image from 'next/image';
import { capabilities, keySkills } from '../lib/skills';
import { getTechIcon } from '../lib/techIcons';
import SectionHeading from './SectionHeading';

export default function About() {
  return (
    <section id="about" className="site-section">
      <div className="wrapper">
        <SectionHeading
          title="Обо мне"
          subtitle="Python-разработчик, который превращает рутину в автоматизацию"
        />

        <div className="about-grid reveal-on-scroll">
          <div className="about-photo">
            <Image
              src="/images/about-photo.png"
              alt="Матвей"
              width={220}
              height={220}
              className="about-photo-image"
              priority
            />
          </div>

          <div className="about-info">
            <h4 className="about-name">Матвей</h4>
            <p className="about-role">
              <span className="color">Python-разработчик</span> · Backend & Telegram-боты
            </p>

            <ul className="about-meta">
              <li>
                <span className="about-meta-label">Локация</span>
                <span>Санкт-Петербург</span>
              </li>
              <li>
                <span className="about-meta-label">Возраст</span>
                <span>19 лет</span>
              </li>
              <li>
                <span className="about-meta-label">О себе</span>
                <span>Занимаюсь боксом, владею английским на уровне B2</span>
              </li>
            </ul>

            <p className="about-bio">
              Создаю стабильные backend-архитектуры и умные Telegram-боты для бизнеса. Проектирую
              REST API, CRM-системы, ERP и образовательные боты с интерактивным контентом.
            </p>

            <div className="about-capabilities">
              <p className="about-key-skills-title">Что я умею</p>
              <ul className="about-capabilities-list">
                {capabilities.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="about-key-skills">
              <p className="about-key-skills-title">Ключевые навыки</p>
              <div className="about-key-skills-list">
                {keySkills.map((skill) => {
                  const Icon = getTechIcon(skill.iconKey);
                  return (
                    <div key={skill.name} className="about-skill-icon" title={skill.name}>
                      {Icon ? <Icon aria-hidden="true" /> : <span>{skill.name.charAt(0)}</span>}
                      <span className="sr-only">{skill.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="about-mini-stats">
              <div className="glass-card about-stat-card">
                <span className="about-stat-value">10+</span>
                <span className="about-stat-label">проектов</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
