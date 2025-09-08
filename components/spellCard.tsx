import styled from 'styled-components'
import { Spell } from '../types/model'

const CardContainer = styled.div<{ $attribut: string }>`
  width: 200px;
  height: 200px;
  padding: 4px;
  border: 2px solid white;
  border-radius: 5px;
  color: white;
  background: ${({ $attribut }) => {
    switch ($attribut) {
      case 'fire':
        return 'linear-gradient(90deg, rgba(187,17,17,1) 0%, rgba(223,3,3,1) 74%)'
      case 'water':
        return 'linear-gradient(90deg, rgba(110,118,255,1) 0%, rgba(146,155,255,1) 74%)'
      case 'earth':
        return 'linear-gradient(90deg, rgba(160,82,45,1) 0%, rgba(126,50,14,1) 74%)'
      case 'wind':
        return 'linear-gradient(90deg, rgba(24,227,24,1) 0%, rgba(46,230,46,1) 74%)'
      default:
        return 'grey'
    }
  }};
`

const HeaderCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  margin-bottom: 8px;
  border: 1px solid ghostwhite;
  border-radius: 5px;
  text-transform: capitalize;
`

const SpellStats = styled.div`
  font-size: 12px;

  p {
    margin-bottom: 8px;
  }

  span {
    font-weight: 700;
  }
`

type SpellCardProps = {
  spell: Spell
}

function SpellCard({ spell }: SpellCardProps) {
  return (
    <CardContainer $attribut={spell.attribut}>
      <HeaderCard>{spell.name}</HeaderCard>
      <SpellStats>
        <p>
          Type: <span>{spell.type}</span>
        </p>
        <p>
          Damage: <span>{spell.damage}</span>
        </p>
        {spell.shields &&
          Object.entries(spell.shields).map(([type, value]) => {
            if (value && value > 0) {
              return (
                <p key={type}>
                  {type} shield: <span>{value}</span>
                </p>
              )
            }
            return null
          })}
        <p>
          Attribute: <span>{spell.attribut}</span>
        </p>
      </SpellStats>
    </CardContainer>
  )
}

export default SpellCard
