import { NavLink } from 'react-router-dom'
import { IconPulse, IconChart, IconPill } from './icons'

const items = [
  { to: '/measure', label: '측정', Icon: IconPulse },
  { to: '/record', label: '기록', Icon: IconChart },
  { to: '/medication', label: '복약', Icon: IconPill },
]

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      {items.map(({ to, label, Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `bottom-nav__item${isActive ? ' is-active' : ''}`
          }
        >
          <Icon />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
