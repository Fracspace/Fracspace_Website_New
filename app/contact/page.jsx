import React from "react";
import HeroSection from "@/components/sections/contactus/HeroSection";
import ContactDetails from "@/components/sections/contactus/ContactDetails";
import ContactForm from "@/components/sections/contactus/ContactForm";

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
