import { disclaimerText } from '../data/mockData'

export default function Disclaimer({ text }: { text?: string }) {
  return <p className="disclaimer">{text ?? disclaimerText}</p>
}
