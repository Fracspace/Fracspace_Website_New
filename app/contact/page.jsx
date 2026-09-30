import React from "react";
import HeroSection from "@/components/sections/contactus/HeroSection";
import ContactDetails from "@/components/sections/contactus/ContactDetails";
import ContactForm from "@/components/sections/contactus/ContactForm";

export const metadata = {
  title: 'Contact Us',
  description: "Reach out to our Concierge for assistance with property management, construction, and interior design services. We're here to help you!",
  robots: {
    index: true,
    follow: true,
  },
};

function ContactPage() {
  return (
    <div className="">
      <HeroSection />
      <ContactDetails />
      <ContactForm />
    </div>
  );
}

export default ContactPage;
