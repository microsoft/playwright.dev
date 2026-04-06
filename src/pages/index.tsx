import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import GitHubStarButton from '../components/GitHubStarButton';
import styles from "./styles.module.css";

type PathCardProps = {
  title: string;
  description: string;
  install: string;
  href: string;
  linkText: string;
};

const PathCard: React.FC<PathCardProps> = ({ title, description, install, href, linkText }) => (
  <div className={clsx("col col--4", styles.pathCard)}>
    <h3>{title}</h3>
    <p>{description}</p>
    <code className={styles.installCode}>{install}</code>
    <div className={styles.pathCardLink}>
      <Link to={href}>{linkText}</Link>
    </div>
  </div>
);

type FeatureSectionProps = {
  title: string;
  children: React.ReactNode;
  reversed?: boolean;
};

const FeatureSection: React.FC<FeatureSectionProps> = ({ title, children, reversed }) => (
  <section className={clsx(styles.featureSection, reversed && styles.featureSectionAlt)}>
    <div className="container">
      <h2 className={styles.featureSectionTitle}>{title}</h2>
      <div className={styles.featureSectionContent}>
        {children}
      </div>
    </div>
  </section>
);

const paths: PathCardProps[] = [
  {
    title: "Playwright Test",
    description: "Full-featured test runner with auto-waiting, assertions, tracing, and parallelism across Chromium, Firefox, and WebKit.",
    install: "npm init playwright@latest",
    href: "docs/intro",
    linkText: "Testing documentation",
  },
  {
    title: "Playwright CLI",
    description: "Token-efficient browser automation for coding agents like Claude Code and GitHub Copilot. Skill-based workflows without large context overhead.",
    install: "npm i -g @playwright/cli@latest",
    href: "docs/getting-started-cli",
    linkText: "CLI documentation",
  },
  {
    title: "Playwright MCP",
    description: "Model Context Protocol server that gives AI agents full browser control through structured accessibility snapshots.",
    install: "npx @playwright/mcp@latest",
    href: "docs/getting-started-mcp",
    linkText: "MCP documentation",
  },
];

const logos = [
  { imageUrl: "img/logos/VSCode.png", href: "https://code.visualstudio.com", alt: "VS Code" },
  { imageUrl: "img/logos/Bing.png", href: "https://bing.com", alt: "Bing" },
  { imageUrl: "img/logos/Outlook.png", href: "https://outlook.com", alt: "Outlook" },
  { imageUrl: "img/logos/DHotstar.jpg", href: "https://www.hotstar.com/", alt: "Disney+ Hotstar" },
  { imageUrl: "img/logos/MUI.png", href: "https://github.com/mui-org/material-ui", alt: "Material UI" },
  { imageUrl: "img/logos/ING.png", href: "https://github.com/ing-bank/lion", alt: "ING" },
  { imageUrl: "img/logos/Adobe2.png", href: "https://github.com/adobe/spectrum-web-components", alt: "Adobe" },
  { imageUrl: "img/logos/ReactNavigation.png", href: "https://github.com/react-navigation/react-navigation", alt: "React Navigation" },
  { imageUrl: "img/logos/accessibilityinsights.png", href: "https://accessibilityinsights.io/", alt: "Accessibility Insights" },
];

const Home: React.FC = () => {
  const context = useDocusaurusContext();
  const { siteConfig } = context;
  return (
    <Layout
      title={siteConfig.tagline}
      description="Web automation and testing for apps, scripts, and AI agents"
    >
      {/* Hero */}
      <header className={clsx("hero hero--primary", styles.heroBanner)}>
        <div className="container">
          <h1 className={clsx("hero__title", styles.heroTitle)}>
            <span className={styles.highlight}>Playwright</span> enables reliable
            web automation for testing, scripting, and AI&nbsp;agents.
          </h1>
          <p className={styles.heroSubtitle}>
            One API to drive Chromium, Firefox, and WebKit — in your tests, your scripts, and your agent workflows.
            Available for{' '}
            <a href="https://playwright.dev/docs/intro">TypeScript</a>,{' '}
            <a href="https://playwright.dev/python/docs/intro">Python</a>,{' '}
            <a href="https://playwright.dev/dotnet/docs/intro">.NET</a>, and{' '}
            <a href="https://playwright.dev/java/docs/intro">Java</a>.
          </p>
          <div className={styles.buttons}>
            <Link className={styles.getStarted} to="docs/intro">
              Get started
            </Link>
            <GitHubStarButton owner="microsoft" repo={siteConfig.customFields.repositoryName as string} />
          </div>
        </div>
      </header>

      <main>
        {/* Path cards */}
        <section className={styles.pathCards}>
          <div className="container">
            <div className="row">
              {paths.map((props, idx) => (
                <PathCard key={idx} {...props} />
              ))}
            </div>
          </div>
        </section>

        {/* Testing features */}
        <FeatureSection title="Built for testing" reversed>
          <div className="row">
            <div className="col col--6">
              <h4>Auto-wait and web-first assertions</h4>
              <p>
                Playwright waits for elements to be actionable before performing actions.
                Assertions automatically retry until conditions are met. No artificial timeouts,
                no flaky tests.
              </p>
              <h4>Test isolation</h4>
              <p>
                Each test gets a fresh browser context — equivalent to a brand new browser profile.
                Full isolation with near-zero overhead. Save authentication state once and reuse it
                across tests.
              </p>
            </div>
            <div className="col col--6">
              <h4>Resilient locators</h4>
              <p>
                Find elements with selectors that mirror how users see the page:{' '}
                <code>getByRole</code>, <code>getByLabel</code>, <code>getByPlaceholder</code>,{' '}
                <code>getByTestId</code>. No brittle CSS paths.
              </p>
              <h4>Parallelism and sharding</h4>
              <p>
                Tests run in parallel by default across all configured browsers.
                Shard across multiple machines for faster CI. Full cross-browser coverage
                on every commit.
              </p>
            </div>
          </div>
        </FeatureSection>

        {/* Agent features */}
        <FeatureSection title="Built for AI agents">
          <div className="row">
            <div className="col col--6">
              <h4>Accessibility snapshots, not screenshots</h4>
              <p>
                Agents interact with pages through structured accessibility trees — element roles,
                names, and refs. Deterministic and unambiguous, no vision models required.
              </p>
              <h4>MCP server</h4>
              <p>
                Drop-in <a href="https://modelcontextprotocol.io" target="_blank" rel="noreferrer noopener">Model Context Protocol</a> server
                for VS Code, Cursor, Claude Desktop, Windsurf, and any MCP client. Full browser
                control through standard tool calls.
              </p>
            </div>
            <div className="col col--6">
              <h4>CLI for coding agents</h4>
              <p>
                Token-efficient command-line interface with installable skills. Purpose-built
                for Claude Code, GitHub Copilot, and similar coding agents that need to balance
                browser automation with large codebases.
              </p>
              <h4>Session monitoring</h4>
              <p>
                Visual dashboard with live screencast previews of all running browser sessions.
                Click any session to zoom in and take control.
              </p>
            </div>
          </div>
        </FeatureSection>

        {/* Tooling */}
        <FeatureSection title="Powerful tooling">
          <div className="row">
            <div className="col col--4">
              <h4><a href="docs/codegen">Test generator</a></h4>
              <p>
                Record your actions in the browser and Playwright writes the test code.
                Generate assertions from the recording toolbar. Pick locators by clicking
                on elements.
              </p>
            </div>
            <div className="col col--4">
              <h4><a href="docs/trace-viewer-intro">Trace Viewer</a></h4>
              <p>
                Full timeline of test execution with DOM snapshots, network requests,
                console logs, and screenshots at every step. Investigate failures
                without re-running.
              </p>
            </div>
            <div className="col col--4">
              <h4><a href="docs/getting-started-vscode">VS Code extension</a></h4>
              <p>
                Run, debug, and generate tests directly in the editor.
                Set breakpoints, live-inspect locators in the browser, and view
                full execution traces in the sidebar.
              </p>
            </div>
          </div>
        </FeatureSection>

        {/* Cross-browser */}
        <section className={styles.crossBrowser}>
          <div className="container" style={{ textAlign: 'center' }}>
            <img src="img/logos/Browsers.png" width="30%" alt="Chromium, Firefox, WebKit" />
            <p className={styles.crossBrowserText}>
              <b>Any browser. Any platform.</b> Chromium, Firefox, and WebKit on Linux, macOS, and Windows.
              Headless and headed. Also available for{' '}
              <a href="https://playwright.dev/python/docs/intro">Python</a>,{' '}
              <a href="https://playwright.dev/dotnet/docs/intro">.NET</a>, and{' '}
              <a href="https://playwright.dev/java/docs/intro">Java</a>.
            </p>
          </div>
        </section>

        {/* Logos */}
        <section className={styles.logosSection}>
          <div className="container">
            <div className="row">
              <div className={clsx("col col--12", styles.logosColumn)}>
                <h2>Chosen by companies and open source projects</h2>
                <ul className={styles.logosList}>
                  {logos.map(({ imageUrl, href, alt }, idx) => (
                    <li key={idx}>
                      <a href={href} target="_blank" rel="noreferrer noopener">
                        <img src={imageUrl} alt={alt} />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default Home;
