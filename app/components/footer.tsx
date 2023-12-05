import { FaLinkedin, FaGithub } from 'react-icons/fa6'
import { GrMail } from 'react-icons/gr'

const icons = [
  {
    href: 'https://www.linkedin.com/in/alex-ross-32b278236',
    icon: <FaLinkedin className="text-2xl" />,
  },
  {
    href: 'https://www.github.com/aross2010',
    icon: <FaGithub className="text-2xl" />,
  },
  {
    href: 'mailto:adross1027@gmail.com',
    icon: <GrMail className="text-2xl" />,
  },
]

export default function Footer() {
  return (
    <footer className="bg-blue-600 w-full px-6 py-10 text-gray-50 flex justify-center">
      <section className="w-full max-w-[1100px] flex justify-center">
        <div className="flex items-center gap-2">
          <small>
            ©{' '}
            {new Date().toLocaleDateString('en-US', {
              year: 'numeric',
            })}{' '}
            by{' '}
            <a
              href="https://www.alexross.vercel.app"
              className="hover:underline"
              target="_blank"
            >
              Alex Ross
            </a>
            .
          </small>
          <div className="flex items-center gap-1">
            {icons.map(({ href, icon }) => (
              <a
                key={href}
                href={href}
                className="rounded-full p-2  hover:bg-blue-700 transition-all"
                target="_blank"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </section>
    </footer>
  )
}
