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
    description: <>Single API to automate Chromium, Firefox and WebKit.</>,
    link: "docs/why-playwright#support-for-all-browsers",
  },
  {
    title: "Automate without trade-offs",
    description: (
      <>
        Capable automation for single page apps that rely on the modern web
        platform.
      </>
    ),
    link: "docs/why-playwright#powerful-automation-capabilities",
  },
  {
    title: "Use in your preferred language",
    description: (
      <>
        Use the Playwright API in <a
        href="https://playwright.dev">JavaScript &amp; TypeScript</a>, <a
        href="https://playwright.dev/python/docs/intro">Python</a>, <a
        href="https://playwright.dev/dotnet/docs/intro">.NET</a> and, <a
        href="https://playwright.dev/java/docs/intro">Java</a>.
      </>
    ),
    link: "docs/languages",
  },
];

const videoRows = [
  {
    title: "Get started instantly",
    description:
      "Install Playwright and browsers with a single command – on local and CI environments. Then use the API to launch browsers, create pages, and automate page interactions.",
    videoUrl: "img/gifs/intro.mp4",
  },
  {
    title: "Reliably automate with auto-waits",
    description:
      "Actions, like clicks, auto-wait for UI elements to ensure your scripts are reliable to execute. Wait for precise events for more control and say goodbye to timeouts.",
    videoUrl: "img/gifs/auto-wait.mp4",
  },
  {
    title: "Intercept network activity",
    description:
      "Playwright can intercept network activity to modify or mock network requests during test scenarios.",
    videoUrl: "img/gifs/network.mp4",
  },
  {
    title: "Run multi-page emulation scenarios",
    description:
      "A single browser instance in Playwright can create multiple isolated browser contexts. Each browser context can run multi-page emulation scenarios.",
    videoUrl: "img/gifs/contexts.mp4",
  },
];

type FeatureProps = {
  imageUrl?: string
  title: string
  description: React.ReactElement
  link: string
}

const Feature: React.FC<FeatureProps> = ({ imageUrl, title, description, link }) => {
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
        <Link to={useBaseUrl(link)}>Learn more</Link>
      </p>
    </div>
  );
}

const GitHubStars: React.FC = () => {
  const {siteConfig} = useDocusaurusContext();
  return (
    <div style={{ height: 30 }}>
      <iframe
        className={styles.githubStars}
        src={`https://ghbtns.com/github-btn.html?user=microsoft&repo=${siteConfig.customFields.repositoryName}&type=star&count=true&size=large`}
        width={160}
        height={30}
        title="GitHub Stars"
      />
    </div>
  );
}

type FeatureRowProps = {
  title: string
  description: string
  videoUrl: string
  isImageLeft: boolean
}

const FeatureRow: React.FC<FeatureRowProps> = ({ title, description, videoUrl, isImageLeft }) => {
  const textColumn = (
    <div className={"col col--5"}>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
  const imageColumn = (
    <div className={"col col--7"}>
      <video muted controls loop>
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
  return (
    <section
      className={clsx(!isImageLeft ? styles.featureContainerAlt : undefined)}
    >
      <div className={"container"}>
        <div
          className={clsx(
            "row",
            styles.featureRow,
            !isImageLeft ? styles.featureRowAlt : undefined
          )}
        >
          {imageColumn}
          {textColumn}
        </div>
      </div>
    </section>
  );
}

const logos = [
  { imageUrl: "img/logos/VSCode.png", href: "https://code.visualstudio.com" },
  { imageUrl: "img/logos/Bing.png", href: "https://bing.com" },
  { imageUrl: "img/logos/Outlook.png", href: "https://outlook.com" },
  { imageUrl: "img/logos/DHotstar.jpg", href: "https://www.hotstar.com/" },
  {
    imageUrl: "img/logos/MUI.png",
    href: "https://github.com/mui-org/material-ui",
  },
  { imageUrl: "img/logos/ING.png", href: "https://github.com/ing-bank/lion" },
  {
    imageUrl: "img/logos/Adobe2.png",
    href: "https://github.com/adobe/spectrum-web-components",
  },
  {
    imageUrl: "img/logos/ReactNavigation.png",
    href: "https://github.com/react-navigation/react-navigation",
  },
  {
    imageUrl: "img/logos/accessibilityinsights.png",
    href: "https://accessibilityinsights.io/",
  },
];

const Home: React.FC = () => {
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
            <span className={styles.highlight}>Playwright</span> enables
            reliable end-to-end testing for modern web apps.
          </h1>
          <div className={styles.buttons}>
            <Link
              className={styles.getStarted}
              to={useBaseUrl("docs/intro")}
            >
              Get started
            </Link>
            <GitHubStars />
          </div>
        </div>
      </header>
      <main>
        <section className={styles.features}>
          <div className="container">
            <div className="row">
              {features.map((props, idx) => (
                <Feature key={idx} {...props} />
              ))}
            </div>
          </div>
        </section>

        <section className={styles.logosSection}>
          <div className="container">
            <div className="row">
              <div className={clsx("col col--12", styles.logosColumn)}>
                <h2>Chosen by companies and open source projects</h2>
                <ul className={styles.logosList}>
                  {logos.map(({ imageUrl, href }, idx) => (
                    <li key={idx}>
                      <a href={href} target="_blank">
                        <img src={imageUrl} />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {videoRows.map((row, idx) => (
          <FeatureRow {...row} key={idx} isImageLeft={idx % 2 === 1} />
        ))}
      </main>
    </Layout>
  );
}

export default Home;
