import PortfolioApp from '../components/PortfolioApp';
import { getProjects } from '../lib/projects';

export default async function HomePage() {
  const projects = await getProjects();

  return (
    <main>
      <PortfolioApp projects={projects} />
    </main>
  );
}
