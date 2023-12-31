import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";

// components
import Header from "../components/header";

const MainContainer = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(180deg, #050022 0%, #0A0047 100%);
`

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
`

const GoTo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  margin-top: 16px;
  padding: 16px 32px;
  border: 2px solid white;
  border-radius: 5px;
  cursor: pointer;
  color: white;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1); /* Légère transparence blanche au survol */
    transform: scale(1.05); /* Léger agrandissement au survol */
  }
`

export default function Home() {
  return (
    <div className="wrapperGlobal">
      <Head>
        <title>Magician Duel</title>
        <meta name="description" content="Jeu de duel de magicien - Youpi" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainContainer>
        <Header />
        <Menu>
          <Link href="/fightScene">
            <GoTo>Duel</GoTo>
          </Link>
          <Link href="/spellBook">
            <GoTo>Grimoire</GoTo>
          </Link>
        </Menu>
      </MainContainer>

      <footer />
    </div>
  );
}
