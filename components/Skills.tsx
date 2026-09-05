import { skills } from '../lib/skills';
import { getTechIcon } from '../lib/techIcons';
import SectionHeading from './SectionHeading';

export default function Skills() {
  return (
    <section id="skills" className="site-section">
      <div className="section-wrapper">
        <SectionHeading
          title="Навыки"
          subtitle="Технологии, с которыми я создаю надёжные решения для бизнеса"
        />

        <div className="skills-grid">
          {skills.map((skill) => {
            const Icon = getTechIcon(skill.iconKey);
            return (
              <article key={skill.name} className="glass-card skill-card reveal-on-scroll">
                <div className="skill-icon">
                  {Icon ? <Icon aria-hidden="true" /> : <span>{skill.name.charAt(0)}</span>}
                </div>
                <h4>{skill.name}</h4>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
