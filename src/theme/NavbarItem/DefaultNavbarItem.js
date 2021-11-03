import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {useLocation} from '@docusaurus/router';
import IconExternalLink from '@theme/IconExternalLink';
import isInternalUrl from '@docusaurus/isInternalUrl';
const { getInfimaActiveClassName } = require('@docusaurus/theme-classic/lib/theme/NavbarItem');
const dropdownLinkActiveClass = 'dropdown__link--active';
export function NavLink({
  activeBasePath,
  activeBaseRegex,
  to,
  href,
  label,
  activeClassName = '',
  prependBaseUrlToHref,
  'data-language-prefix': languagePrefix,
  ...props
}) {
  // TODO all this seems hacky
  // {to: 'version'} should probably be forbidden, in favor of {to: '/version'}
  const toUrl = useBaseUrl(to);
  const activeBaseUrl = useBaseUrl(activeBasePath);
  const normalizedHref = useBaseUrl(href, {
    forcePrependBaseUrl: true,
  });
  const isExternalLink = label && href && !isInternalUrl(href);
  const isDropdownLink = activeClassName === dropdownLinkActiveClass;

  // Start Playwright adjustment
  const location = useLocation();
  if (languagePrefix) {
    // Rewrite the new link
    const newPathname = location.pathname.replace(/^(\/(java|dotnet|python))?\/(.*)/, '$3');
    href = "pathname://" + languagePrefix + newPathname + location.hash;
    props.autoAddBaseUrl = false
    props.target = '_self';

    // Detect if the link is active
    const languagesInSubfolders = ['java', 'dotnet', 'python'];
    const currentLanguageIsInSubfolder = languagesInSubfolders.some(l => location.pathname.startsWith(`/${l}`));
    if (location.pathname.startsWith(languagePrefix) && currentLanguageIsInSubfolder && languagePrefix.length > 1 || languagePrefix.length === 1 && !currentLanguageIsInSubfolder) {
      props.className += ` ${activeClassName}`;
    }
  }
  // End Playwright adjustment

  return (
    <Link
      {...(href
        ? {
            href: prependBaseUrlToHref ? normalizedHref : href,
          }
        : {
            isNavLink: true,
            activeClassName: !props.className?.includes(activeClassName)
              ? activeClassName
              : '',
            to: toUrl,
            ...(activeBasePath || activeBaseRegex
              ? {
                  isActive: (_match, location) =>
                    activeBaseRegex
                      ? new RegExp(activeBaseRegex).test(location.pathname)
                      : location.pathname.startsWith(activeBaseUrl),
                }
              : null),
          })}
      {...props}>
      {isExternalLink ? (
        <span>
          {label}
          <IconExternalLink
            {...(isDropdownLink && {
              width: 12,
              height: 12,
            })}
          />
        </span>
      ) : (
        label
      )}
    </Link>
  );
}

function DefaultNavbarItemDesktop({
  className,
  isDropdownItem = false,
  ...props
}) {
  const element = (
    <NavLink
      className={clsx(
        isDropdownItem ? 'dropdown__link' : 'navbar__item navbar__link',
        className,
      )}
      {...props}
    />
  );

  if (isDropdownItem) {
    return <li>{element}</li>;
  }

  return element;
}

function DefaultNavbarItemMobile({
  className,
  isDropdownItem: _isDropdownItem,
  ...props
}) {
  return (
    <li className="menu__list-item">
      <NavLink className={clsx('menu__link', className)} {...props} />
    </li>
  );
}

function DefaultNavbarItem({
  mobile = false,
  position: _position,
  // Need to destructure position from props so that it doesn't get passed on.
  ...props
}) {
  const Comp = mobile ? DefaultNavbarItemMobile : DefaultNavbarItemDesktop;
  return (
    <Comp
      {...props}
      activeClassName={
        props.activeClassName ?? getInfimaActiveClassName(mobile)
      }
    />
  );
}

export default DefaultNavbarItem;
