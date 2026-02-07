import Image from "next/image";
import React from "react";

const people = [
   {
    name: " Mr. Rajiv Bagga",
    role: "Founder & CEO, CA Vakil ",
    qualification: " B.A /PGDBM/LL.B.",
    focus: "With a strong vision and Extensive Practical experience, Mr. Rajiv Bagga founded CA Vakil to simplify legal and compliance service, enabling businesses to grow with confidence. With over 25+years of experience in legal and taxation matters",
    avatar: "/avatars/rajiv.png",
  },
  {
    name: "Mr. Depanshu Bagga ",
    role: "CA Australia (CA ANZ) – Pursuing CA  Final. Based in Melbourne, Australia",
    qualification: "BCom Graduate Accountant,",
    focus: "an experienced professional known for accuracy, integrity, and delivering reliable legal and compliance solutions.",
    avatar: "/avatars/deepanshu.png",
  },
  {
    name: "Mr. Gaurav Bagga  ",
    role: "Admin Department ",
    qualification: "Bachelor of Business Administration",
    focus: "A key member of the admin team, ensuring smooth day to day operations and efficient internal coordination ",
    avatar: "/avatars/gaurav.png",
  },
   {
    name: "Mr. Rankin  ",
    role: "Technical IT Analysist Consultant. 25-year Experience  ",
    qualification: "B.com, MBA, Melbourne, Australia.  ",
    focus: "A Technical IT Analysist Consultant at CA Vakil, contributing technical and IT expertise to support the company’s mission of making legal and business services simple, transparent, and trustworthy ",
    avatar: "/avatars/rankin.png",
  },
];

function TeamShowcase() {
  return (
    <section className="relative bg-gradient-to-r from-[#f8fbff] via-[#eef4ff] to-[#e4f1ff] text-slate-900 px-4 py-16 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-cyan-200/40 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-indigo-200/40 blur-3xl" />
        <div className="absolute top-1/3 right-1/3 w-48 h-48 bg-blue-200/30 blur-2xl" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-white/60 text-sm font-medium text-slate-800 shadow-sm">
              Our core team
            </p>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight">
              People behind the expertise
            </h2>
            <p className="mt-3 max-w-2xl text-base text-slate-700">
              Meet the specialists who lead our strategy, ensure compliance, and stand with you in critical legal moments.
            </p>
          </div>
          <div className="text-sm text-slate-700">
            15+ years of collective leadership across law, tax, and disputes.
          </div>
        </div>

        <div className="grid gap-5 md:gap-6 md:grid-cols-3">
          {people.map((person) => (
            <article
              key={person.name}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_20px_50px_-30px_rgba(0,0,0,0.35)]"
            >
              {/* Corner accent */}
              <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500" />

              <div className="p-5 flex items-start gap-4">
                <div className="relative w-24 h-24 flex-shrink-0">
                  <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-md" />
                  <Image
                    src={person.avatar}
                    alt={person.name}
                    fill
                    sizes="96px"
                    className="rounded-full object-contain bg-white border-2 border-slate-100"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold leading-tight">{person.name}</h3>
                  <p className="text-sm text-cyan-700">{person.role}</p>
                  <p className="text-xs text-slate-600 mt-1 font-medium">{person.qualification}</p>
                </div>
              </div>

              <div className="px-5 pb-5">
                <p className="text-sm leading-relaxed text-slate-700">
                  {person.focus}
                </p>
              </div>

              {/* <div className="px-5 pb-5 flex items-center gap-2 text-xs text-slate-600">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Available for consultations
              </div> */}

              {/* Hover glow */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/0 via-sky-50/60 to-white/0 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TeamShowcase;
