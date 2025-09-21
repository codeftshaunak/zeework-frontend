import React from 'react'
import { Header } from '../Header'
import { Footer } from '../Footer'

const TermsAndConditions = () => {

  return (
<div>
<Header/>
      <section className="bg-[#DCFCE7] rounded-xl h-full">

      <div className="py-24 md:py-16 md:w-[85%] w-[90%] max-w-[1400px] mx-[auto]">

     <h2 className="z-20 2xl:text-[50px] text-[2.5rem] max-[425px]:text-[1.8rem] max-[425px]:leading-8 font-geist-extra font-[800] 2xl:leading-[70px] leading-[50px] max-xl:text-center mb-4">Terms & Conditions</h2>


  <p>Welcome to <strong>ZeeWork</strong>. These Terms & Conditions (“Terms”) govern your use of our website, services, and applications (collectively, the “Platform”). By accessing or using ZeeWork, you agree to comply with and be bound by these Terms. If you do not agree, please do not use our services.</p>

  <section className='mt-2'>
    <h2 className="text-xl font-semibold text-black">1. Overview</h2>
    <p>ZeeWork is an online marketplace that connects freelancers with clients across the globe. Our mission is to promote fairness, transparency, and opportunity in the freelance economy.</p>
  </section>

  <section className='mt-2'>
    <h2 className="text-xl font-semibold text-black">2. User Accounts</h2>
    <ul className="list-disc list-inside space-y-1">
      <li>You must be at least 18 years old to create an account.</li>
      <li>You are responsible for maintaining the confidentiality of your login credentials.</li>
      <li>You agree to provide accurate, complete, and updated information.</li>
    </ul>
  </section>

   <section className='mt-2'>
    <h2 className="text-xl font-semibold text-black">3. Freelancers & Clients</h2>
    <ul className="list-disc list-inside space-y-1">
      <li><strong>Freelancers:</strong> You may create a profile, submit proposals, and complete client projects.</li>
      <li><strong>Clients:</strong> You may post jobs, evaluate proposals, and hire freelancers.</li>
      <li>ZeeWork does not guarantee job outcomes or project quality but facilitates interactions and provides support.</li>
    </ul>
  </section>

  <section className='mt-2'>
    <h2 className="text-xl font-semibold text-black">4. Payments</h2>
    <ul className="list-disc list-inside space-y-1">
      <li>ZeeWork uses a secure escrow-based payment system.</li>
      <li>Clients must fund projects in advance; funds are released upon project completion and approval.</li>
      <li>ZeeWork may charge service fees or commissions. These will be clearly disclosed during transactions.</li>
    </ul>
  </section>

   <section className='mt-2'>
    <h2 className="text-xl font-semibold text-black">5. Disputes & Resolutions</h2>
    <ul className="list-disc list-inside space-y-1">
      <li>In case of disputes, ZeeWork offers a mediation process.</li>
      <li>Both parties must cooperate and provide evidence to support their claims.</li>
      <li>ZeeWork reserves the right to make the final decision in unresolved disputes.</li>
    </ul>
  </section>

    <section className='mt-2'>
    <h2 className="text-xl font-semibold text-black">6. Prohibited Activities</h2>
    <p>Users must not:</p>
    <ul className="list-disc list-inside space-y-1">
      <li>Post false information or impersonate another person.</li>
      <li>Engage in fraud, spam, or abusive behavior.</li>
      <li>Circumvent the platform to avoid fees.</li>
    </ul>
    <p>Violating these rules may result in account suspension or termination.</p>
  </section>

  <section className='mt-2'>
    <h2 className="text-xl font-semibold text-black">7. Intellectual Property</h2>
    <ul className="list-disc list-inside space-y-1">
      <li>Users retain rights to their work unless agreed otherwise.</li>
      <li>You grant ZeeWork a limited license to display your profile and submitted content for promotional or operational purposes.</li>
    </ul>
  </section>

  <section className='mt-2'>
    <h2 className="text-xl font-semibold text-black">8. Termination</h2>
    <p>ZeeWork may suspend or terminate your access to the platform at any time, with or without cause, especially in cases of misconduct or policy violation.</p>
  </section>

   <section className='mt-2'>
    <h2 className="text-xl font-semibold text-black">9. Limitation of Liability</h2>
    <p>ZeeWork is not liable for:</p>
    <ul className="list-disc list-inside space-y-1">
      <li>Lost profits, data, or business opportunities.</li>
      <li>Disputes between users.</li>
      <li>Issues arising from third-party tools or services.</li>
    </ul>
  </section>
  
  <section className='mt-2'>
    <h2 className="text-xl font-semibold text-black">10. Modifications</h2>
    <p>We may update these Terms periodically. Continued use after changes implies your acceptance of the revised Terms.</p>
  </section>
  
  <section className='mt-2'>
    <h2 className="text-xl font-semibold text-black">11. Contact</h2>
    <p>If you have questions about these Terms, email us at <a href="mailto:info@zeework.com" className="text-teal-400 underline">info@zeework.com</a></p>
  </section>
      </div>
    </section>
<Footer/>
</div>
  )
}

export default TermsAndConditions