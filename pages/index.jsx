import Head from 'next/head'
import Link from "next/link";


export default function Home() {
  return (
    <div>
      <Head>
        <title>Magician Duel</title>
        <meta name="description" content="Jeu de duel de magicien - Youpi" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='home' >
        <div className="menu">
          <Link href="/fightScene">
            <a>
              <button>{"Duel"}</button>
            </a>
          </Link>
          <Link href="/spellBook">
            <a>
              <button>{"Grimoire"}</button>
            </a>
          </Link>

        </div>
      </main>

      <footer >
      </footer>
    </div>
  )
}
