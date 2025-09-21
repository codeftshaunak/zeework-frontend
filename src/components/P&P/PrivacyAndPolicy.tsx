import React from 'react'
import { Footer } from '../Footer'
import { Header } from '../Header'

const PrivacyAndPolicy = () => {
  return (
     <div>
     <Header/>
       <section className="bg-[#DCFCE7] rounded-xl h-full">
      <div className="py-24 md:py-16 md:w-[85%] w-[90%] max-w-[1400px] mx-[auto]">
     <h2 className="z-20 2xl:text-[50px] text-[2.5rem] max-[425px]:text-[1.8rem] max-[425px]:leading-8 font-geist-extra font-[800] 2xl:leading-[70px] leading-[50px] max-xl:text-center mb-4">Privacy & Policy</h2>

  <p><strong>ZeeWork</strong> (“we”, “our”, “us”) values your privacy. This Privacy Policy outlines how we collect, use, and protect your personal data when you use our services.</p>

  <section className='mt-2'>
    <h2 className="text-xl font-semibold text-black">1. Information We Collect</h2>
    <ul className="list-disc list-inside space-y-1">
      <li><strong>Personal Information:</strong> Name, email address, phone number, country, profile data.</li>
      <li><strong>Financial Information:</strong> Payment details processed securely via third-party payment providers.</li>
      <li><strong>Usage Information:</strong> Log data, IP address, device type, browser type.</li>
      <li><strong>Communications:</strong> Messages, calls, and reviews exchanged within the platform.</li>
    </ul>
  </section>

  <section className='mt-2'>
    <h2 className="text-xl font-semibold text-black">2. How We Use Your Information</h2>
    <ul className="list-disc list-inside space-y-1">
      <li>Provide and improve our services.</li>
      <li>Process payments and manage transactions.</li>
      <li>Resolve disputes and enforce our Terms.</li>
      <li>Communicate with you about updates, support, or marketing (with your consent).</li>
    </ul>
  </section>

  <section className='mt-2'>
    <h2 className="text-xl font-semibold text-black">3. Sharing Your Information</h2>
    <p>We do <strong>not</strong> sell your personal data. However, we may share your information with:</p>
    <ul className="list-disc list-inside space-y-1">
      <li><strong>Service Providers:</strong> For payment processing, analytics, communication, and support.</li>
      <li><strong>Legal Authorities:</strong> If required by law, or to protect the rights and safety of users.</li>
    </ul>
  </section>

  <section className='mt-2'>
    <h2 className="text-xl font-semibold text-black">4. Data Security</h2>
    <p>We implement industry-standard encryption and security protocols to protect your data. However, no method of transmission over the internet is 100% secure.</p>
  </section>

  <section className='mt-2'>
    <h2 className="text-xl font-semibold text-black">5. Cookies</h2>
    <p>We use cookies to enhance your experience, analyze traffic, and personalize content. You can manage cookie preferences in your browser settings.</p>
  </section>

  <section className='mt-2'>
    <h2 className="text-xl font-semibold text-black">6. Your Rights</h2>
    <p>Depending on your location, you may have rights to:</p>
    <ul className="list-disc list-inside space-y-1">
      <li>Access, update, or delete your personal information.</li>
      <li>Opt-out of marketing communications.</li>
      <li>Lodge complaints with a data protection authority.</li>
    </ul>
    <p>Contact us at <a href="mailto:info@zeework.com" className="text-teal-600 underline">info@zeework.com</a> to exercise these rights.</p>
  </section>

  <section className='mt-2'>
    <h2 className="text-xl font-semibold text-black">7. Data Retention</h2>
    <p>We retain your data as long as necessary for legal, operational, and user-experience purposes. Account information may be deleted upon request, subject to legal obligations.</p>
  </section>

  <section className='mt-2'>
    <h2 className="text-xl font-semibold text-black">8. International Users</h2>
    <p>If you are accessing ZeeWork from outside Bangladesh, your data may be transferred and stored in countries with different data protection laws. We take necessary steps to protect your data in such cases.</p>
  </section>

  <section className='mt-2'>
    <h2 className="text-xl font-semibold text-black">9. Children’s Privacy</h2>
    <p>ZeeWork is not intended for users under 18. We do not knowingly collect data from minors. If you believe a child has provided us with personal data, please contact us immediately.</p>
  </section>

  <section className='mt-2'>
    <h2 className="text-xl font-semibold text-black">10. Changes to This Policy</h2>
    <p>We may update this Privacy Policy. We will notify users of significant changes. Continued use after such changes indicates your acceptance.</p>
  </section>

  <section className='mt-2'>
    <h2 className="text-xl font-semibold text-black">11. Contact Us</h2>
    <ul className="space-y-1">
      <li>📧 <strong>Email:</strong> <a href="mailto:info@zeework.com" className="text-teal-600 underline">info@zeework.com</a></li>
      <li>🌐 <strong>Website:</strong> <a href="https://www.zeework.com" className="text-teal-600 underline" target="_blank" rel="noopener noreferrer">www.zeework.com</a></li>
    </ul>
  </section>

      </div>
    </section>
    <Footer/>
     </div>
  )
}

export default PrivacyAndPolicy