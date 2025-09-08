import { styled } from 'styled-components'
import Link from 'next/link'
import { useAuth } from '../context/AuthContext'

const HeaderContainer = styled.div`
  background-color: #4caf50; /* Vert */
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 0;
  width: 100%;
  height: 40px;
`

const LeftBlock = styled.div`
  display: inline-flex;
`

const RightBlock = styled.div`
  display: flex;
  align-items: center;
  color: white;
`

const StyledLink = styled.div`
  color: #fff;
  text-decoration: none;
  margin: 0 15px;
  font-size: 16px;
  padding: 8px 12px;
  border-radius: 4px;
  transition: background-color 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: #45a049; /* Vert plus foncé au survol */
  }
`

const UserInfo = styled.span`
  margin-right: 15px;
`

const LogoutButton = styled.button`
  background: none;
  border: 1px solid white;
  color: white;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`

function Header() {
  const { isAuthenticated, user, logout } = useAuth()

  return (
    <HeaderContainer>
      <LeftBlock>
        <Link href="/">
          <StyledLink>Home</StyledLink>
        </Link>
        {isAuthenticated && (
          <>
            <Link href="/fightScene">
              <StyledLink>Duel</StyledLink>
            </Link>
            <Link href="/spellBook">
              <StyledLink>Grimoire</StyledLink>
            </Link>
          </>
        )}
      </LeftBlock>
      <RightBlock>
        {isAuthenticated && user ? (
          <>
            <UserInfo>{user.pseudo}</UserInfo>
            <LogoutButton onClick={logout}>Logout</LogoutButton>
          </>
        ) : (
          <Link href="/login">
            <StyledLink>Login</StyledLink>
          </Link>
        )}
      </RightBlock>
    </HeaderContainer>
  )
}

export default Header
