import React from "react";
import ContactHero from "@/features/contacts/components/ContactHero";
import ContactCard from "@/features/contacts/components/ContactCard";
import OperationalHours from "@/features/contacts/components/OperationalHours";
import ContactCTA from "@/features/contacts/components/ContactCTA";
import CONTACTS from "@/features/contacts/service/contactsService";
import { Mail, Phone, AtSign, MapPin } from "lucide-react";

export default function ContactPage() {
  const items = [
    { key: "email", icon: Mail, iconClass: "text-red-500", ...CONTACTS.email },
    { key: "phone", icon: Phone, iconClass: "text-blue-500", ...CONTACTS.phone },
    { key: "instagram", icon: AtSign, iconClass: "text-sky-500", ...CONTACTS.instagram },
    { key: "location", icon: MapPin, iconClass: "text-emerald-500", ...CONTACTS.location },
  ];

  return (
    <main className="py-12">
      <div className="max-w-6xl mx-auto px-6 space-y-8">
        <ContactHero />

        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((it) => (
              <ContactCard key={it.key} title={it.title} value={it.value} description={it.description} icon={it.icon} iconClass={it.iconClass} />
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <OperationalHours />
          <ContactCTA />
        </div>
      </div>
    </main>
  );
}
