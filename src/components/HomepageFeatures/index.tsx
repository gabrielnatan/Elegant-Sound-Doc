import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Frontend moderno com Next.js',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default, // coloque aqui seu SVG
    description: (
      <>
        Interface rápida e responsiva com Next.js e Tailwind CSS, proporcionando
        uma experiência fluida para o usuário.
      </>
    ),
  },
  {
    title: 'Backend escalável com NestJS',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default, // coloque aqui seu SVG
    description: (
      <>
        API robusta construída com NestJS, utilizando arquitetura modular e
        autenticação JWT para segurança.
      </>
    ),
  },
  {
    title: 'Banco de dados e infraestrutura',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default, // coloque aqui seu SVG
    description: (
      <>
        Integração com PostgreSQL via Prisma ORM, além de deploy em ambiente
        Docker e suporte a AWS.
      </>
    ),
  },
];


function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
