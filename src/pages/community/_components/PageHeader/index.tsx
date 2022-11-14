import React from 'react';

function PageHeader({ title, description }) {
  return (
    <section className="margin-top--lg margin-bottom--lg text--center">
      <h1>{title}</h1>
      <p>{description}</p>
    </section>
  );
}

export default PageHeader;
