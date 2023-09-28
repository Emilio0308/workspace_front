import NavMenu from './dashboarComponents/NavMenu'

export default function RootLayout({ children }){
  return (
    <main className='grid sm:grid-cols-[auto,_1fr] relative pt-[56px] sm:pt-[64px]'>
        <NavMenu/>
        { children }
    </main>
  )
}
