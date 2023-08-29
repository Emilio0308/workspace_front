'use client'
import { useRouter } from 'next/navigation';


const Dashboard = () => {
  const router = useRouter()
  const token = localStorage.getItem('token')
  if (!token) {
    router.push('/')
  }
  return (
    <section className='grid grid-cols-[auto,_1fr]'>
      Dashboard
    </section>
  )
}
export default Dashboard