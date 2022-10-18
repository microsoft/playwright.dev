import React from 'react';
import Layout from '@theme/Layout';
import {
  CaseStudiesCards,
  CaseStudiesCard
} from '../components/CaseStudiesCard';
import styles from "./case-studies-styles.module.css";

export default function CaseStudies() {
  return (
    <Layout
      title="Playwright Case Studies"
      description="We had a chance to talk to some of the developers using Playwright
        across open source projects and enterprise companies to learn how they
        are using Playwright, why they chose Playwright and what their favourite
        features are."
    >
      <div className="container">
      <h1 className={styles.heading}>Playwright Case Studies</h1>
      <p>
        We had a chance to talk to some of the developers using Playwright
        across open source projects and enterprise companies to learn how they
        are using Playwright, why they chose Playwright and what their favourite
        features are.
      </p>
      <main>
        <CaseStudiesCards>
          <CaseStudiesCard
            url="qwik"
            logo="https://raw.githubusercontent.com/BuilderIO/qwik/main/.github/assets/qwik-logo.svg"
            name="Qwik"
            description="Qwik is a new kind of web framework that can deliver instant loading web applications at any size or complexity. Playwright powers the whole end to end testing of of Qwik, which is not to test an app itself but to test all the things that the framework needs to solve, the internals of all the coordinate cases of what can happen."
          />
          
        </CaseStudiesCards>
      </main>
      </div>
    </Layout>
  );
}
