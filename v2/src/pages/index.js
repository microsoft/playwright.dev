import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";

const features = [
  {
    title: "Test across all modern browsers",
    // imageUrl: "img/undraw_docusaurus_mountain.svg",
    description: <>Single automation API for Chromium, Firefox and WebKit.</>,
    link: "docs/why-playwright#support-for-all-browsers",
  },
  {
    title: "Automation without trade-offs",
    // imageUrl: "img/undraw_docusaurus_react.svg",
    description: (
      <>Automation for single page apps that use the modern web platform.</>
    ),
    link: "docs/why-playwright#powerful-automation-capabilities",
  },
  {
    title: "Use in your preferred language",
    // imageUrl: "img/undraw_docusaurus_tree.svg",
    description: (
      <>Use the API in JavaScript/TypeScript, Python, C# and Java.</>
    ),
    link: "docs/languages",
  },
];

function Feature({ imageUrl, title, description, link }) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx("col col--4", styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
      <p>
        <Link to={useBaseUrl("docs/why-playwright#support-for-all-browsers")}>
          Learn more
        </Link>
      </p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout
      title={siteConfig.tagline}
      description="Cross-browser end-to-end testing for modern web apps"
    >
      <header className={clsx("hero hero--primary", styles.heroBanner)}>
        <div className="container">
          <h1 className={clsx("hero__title", styles.heroTitle)}>
            <span className={clsx(styles.highlight)}>Playwright</span> enables
            reliable end-to-end testing for modern web apps.
          </h1>
          <div className={styles.buttons}>
            <Link
              className={clsx(styles.getStarted)}
              to={useBaseUrl("docs/intro")}
            >
              Get started
            </Link>
            <div>
              <iframe
                className={styles.githubStars}
                src="https://ghbtns.com/github-btn.html?user=microsoft&amp;repo=playwright&amp;type=star&amp;count=true&amp;size=large"
                width={160}
                height={30}
                title="GitHub Stars"
              />
            </div>
          </div>
        </div>
      </header>
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
