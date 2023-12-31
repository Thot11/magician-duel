import { styled } from 'styled-components'
import Link from "next/dist/client/link";
import { useEffect, useState, useCallback, useRef, ChangeEvent } from "react";

const HeaderContainer = styled.div`
  background-color: #4CAF50; /* Vert */
  padding: 15px;
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 0;
  width: 100%;
  height 40px:
`

const LeftBlock = styled.div`
 display: inline-flex;
`

const StyledLink = styled.div`
  color: #fff;
  text-decoration: none;
  margin: 0 15px;
  font-size: 16px;
  padding: 8px 12px;
  border-radius: 4px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049; /* Vert plus foncé au survol */
  }
`

const Pseudo = styled.input`
  color: white;
  border: 1px solid white;
  border-radius: 12px;
  padding: 10px 8px;
`


const Header = () => {
  const [username, setUsername] = useState<string>('')

  const handleUserName = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
    localStorage.setItem('username', event.target.value);
  }

  useEffect(() => {
    const username = localStorage.getItem("username")
    setUsername(username || '')
  }, [])

  return (
    <HeaderContainer>
      <LeftBlock>
        <Link href="/">
          <StyledLink>Home</StyledLink>
        </Link>
        <Link href="/fightScene">
          <StyledLink>Duel</StyledLink>
        </Link>
        <Link href="/spellBook">
          <StyledLink>Grimoire</StyledLink>
        </Link>
      </LeftBlock>
      <Pseudo value={username} onChange={(e) => handleUserName(e)} placeholder={'ton pseudo ici'} />
    </HeaderContainer>
  );
}
export default Header;
