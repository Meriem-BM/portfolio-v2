"use client";

import React from "react";
import BackgroundEffects from "@/components/ping/BackgroundEffects";
import ContactForm from "@/components/ping/ContactForm";
import ContactInfo from "@/components/ping/ContactInfo";
import PageHeader from "@/components/PageHeader";

export default function PingPage() {
  return (
    <div className="min-h-screen bg-black text-white relative">
      <BackgroundEffects />
      <PageHeader 
      title="PING"
      description="Establish connection"
      statusText="ONLINE"
      statusInfo="RESPONSE TIME: ~24H"
      accentColor="pink"
    />
      
      <main className="relative z-10 p-4 sm:p-6">
        <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact form */}
          <div className="order-1">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">SEND_MESSAGE</h2>
            <ContactForm />
          </div>

          {/* Contact info and social */}
          <div className="order-2">
            <ContactInfo />
          </div>
        </div>
      </main>
    </div>
  );
}
