import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import webImage from "/img/app-web.png"
import mobileImage from "/img/app-mobile.png"
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.text}>
          <h1 className={styles.title}>
            Elegant 
            <br/>
            Sound
          </h1>
          <p className={styles.description}>
          Elegant Sound é um e-commerce fullstack desenvolvido com Next.js, NestJS e PostgreSQL. O projeto simula uma 
          loja de produtos de áudio, com funcionalidades como cadastro, login, carrinho, pedidos, favoritos e painel 
          administrativo, utilizando JWT, Prisma, Docker e AWS para infraestrutura moderna.
          </p>
          <Link to="/github">
            Github
          </Link>
        </div>
        <div className={styles.images}>
          <img className={styles.image_web} src={webImage}/>
          <img className={styles.image_mobile}  src={mobileImage}/>
        </div>
      </div>
    </header>
  );
}


export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      {/* <main>
        <HomepageFeatures />
      </main> */}
    </Layout>
  );
}
