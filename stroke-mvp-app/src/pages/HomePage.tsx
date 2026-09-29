import { useNavigate } from 'react-router-dom'
import { homeContext } from '../data/mockData'

export default function HomePage() {
  const navigate = useNavigate()
  return (
    <div className="home-screen">
      <h1 className="home-headline">{homeContext.headline}</h1>
      <button className="fast-cta" onClick={() => navigate('/fast')}>
        FAST 증상 체크하기
      </button>
    </div>
  )
}
