/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable jsx-a11y/anchor-has-content, jsx-a11y/anchor-is-valid */
import React from 'react';
import clsx from 'clsx';
import { useThemeConfig } from '@docusaurus/theme-common';
import './styles.css';
import styles from './styles.module.css';

// This component was modified to strip out the search parameter in the link

const Heading = Tag => function TargetComponent({
  id,
  ...props
}) {
  const {
    navbar: {
      hideOnScroll
    }
  } = useThemeConfig();

  if (!id) {
    return <Tag {...props} />;
  }

  const handleOnHeadingClick = (ev) => {
    ev.preventDefault()
    const url = new URL(ev.target.href)
    url.search = ""
    history.pushState('', document.title, url.toString());
  }

  return <Tag {...props}>
        <a aria-hidden="true" tabIndex={-1} className={clsx('anchor', {
      [styles.enhancedAnchor]: !hideOnScroll
    })} id={id} />
        {props.children}
        <a className="hash-link" href={`#${id}`} onClick={handleOnHeadingClick} title="Direct link to heading">
          #
        </a>
      </Tag>;
};

export default Heading;