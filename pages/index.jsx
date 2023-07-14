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

      <main >
        <Link href="/fightScene">
          <a>
            <button>{"Let's Fight !"}</button>
          </a>
        </Link>
      </main>

      <footer >
      </footer>
    </div>
  )
}
