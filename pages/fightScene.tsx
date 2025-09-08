import Head from 'next/head'
import styled from 'styled-components'
import React from 'react'
import Header from '../components/header'
import FightContainer from '../container/fightContainer'
import ProtectedRoute from '../components/auth/ProtectedRoute'

const FightSceneContainer = styled.div`
  width: 100%;
  height: 100vh;
  padding-top: 62px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(180deg, #050022 0%, #0a0047 100%);
`

function FightScene() {
  return (
    <ProtectedRoute>
      <div>
        <Head>
          <title>MD - Playground</title>
          <meta name="description" content="Jeu de duel de magicien" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />

        <FightSceneContainer>
          <FightContainer />
        </FightSceneContainer>
      </div>
    </ProtectedRoute>
  )
}

export default FightScene
