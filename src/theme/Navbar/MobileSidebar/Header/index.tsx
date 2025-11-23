/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import { useNavbarMobileSidebar } from '@docusaurus/theme-common/internal';
import NavbarColorModeToggle from '@theme/Navbar/ColorModeToggle';
import NavbarLogo from '@theme/Navbar/Logo';
import IconClose from '@theme/Icon/Close';

function NavbarMobileSidebarHeader() {
    const mobileSidebar = useNavbarMobileSidebar();
    return (
        <div className="navbar-sidebar__brand">
            <NavbarLogo />
            <NavbarColorModeToggle className="margin-right--md" />

            {/* Moved icons */}
            <a
                href="https://github.com/microsoft/playwright"
                target="_blank"
                rel="noopener noreferrer"
                className="header-github-link"
                aria-label="GitHub repository"
                style={{ marginRight: '20px', display: 'flex', alignItems: 'center', width: '24px', height: '24px' }}
            ></a>
            <a
                href="https://aka.ms/playwright/discord"
                target="_blank"
                rel="noopener noreferrer"
                className="header-discord-link"
                aria-label="Discord server"
                style={{ marginRight: '10px', display: 'flex', alignItems: 'center', width: '24px', height: '24px' }}
            ></a>

            <button
                type="button"
                className="clean-btn navbar-sidebar__close"
                onClick={() => mobileSidebar.toggle()}>
                <IconClose />
            </button>
        </div>
    );
}

export default NavbarMobileSidebarHeader;
