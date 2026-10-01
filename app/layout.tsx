import '@fontsource/inter/400.css'; import '@fontsource/inter/500.css'; import '@fontsource/inter/600.css'; import '@fontsource/inter/700.css'; import './globals.css';
import type { Metadata } from 'next';
export const metadata:Metadata={title:'AI Skill Certificate | AI & AI Agents Assessment',description:'Mobile-first AI and AI Agents skill assessment with certificate generation.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
