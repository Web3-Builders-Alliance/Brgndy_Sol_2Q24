import React, { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'; // Import WalletMultiButton
import { useWallet } from '@solana/wallet-adapter-react'; // Import useWallet hook

const Header = () => {
  return (
    <HeaderContainer>
      <Link href="/" passHref>
        <Logo>FunderDAO</Logo>
      </Link>
      <Link href="/initplatfrom" passHref>
        <NavItem>Init Platform</NavItem>
      </Link>
      <Nav>
        <Link href="/" passHref>
          <NavItem>Home</NavItem>
        </Link>
        <Link href="/projects" passHref>
          <NavItem>Projects</NavItem>
        </Link>
        <Link href="/staking" passHref>
          <NavItem>Stake</NavItem>
          <Link href="/createproject" passHref>
            <NavItem>Create Project</NavItem>
          </Link>
        </Link>
        <WalletMultiButton />
      </Nav>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  background-color: #333;
  color: #fff;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.a`
  font-size: 1.5rem;
  text-decoration: none;
  color: #fff;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
`;

const NavItem = styled.a`
  margin-left: 20px;
  text-decoration: none;
  color: #fff;
  cursor: pointer;
`;

export default Header;
