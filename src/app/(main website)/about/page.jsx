import Image from "next/image";

export const metadata = {
  title: "CA Vakil",
};

export default function AboutPage() {
  return (
    <section className="pt-24 pb-20 bg-gradient-to-b from-[#f8fbff] via-[#eef4ff] to-[#eaf2ff]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm font-medium text-slate-700">Get to know us</span>
          </div>
          <h1 className="mt-4 text-3xl sm:text-5xl font-bold tracking-tight text-slate-900">
            We simplify compliance so you can grow
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-slate-600">
            From registrations to filings and trademarks — we bring clarity,
            speed, and accountability to every step.
          </p>
        </div>

        {/* Mission / Values */}
        <div className="grid md:grid-cols-3 gap-6 mb-14">
          {[
            {
              title: "Mission",
              desc: "Deliver dependable tax and compliance services that empower founders and operators.",
            },
            {
              title: "Values",
              desc: "Clarity, timeliness, and trust — with every document and conversation.",
            },
            {
              title: "Promise",
              desc: "Transparent pricing, expert guidance, and proactive communication.",
            },
          ].map((card) => (
            <div key={card.title} className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">{card.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{card.desc}</p>
            </div>
          ))}
        </div>

        {/* Team highlights */}
        <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Leadership Team</h2>
            <span className="text-xs text-slate-500">Available for consultations</span>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
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
            ].map((person) => (
             
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
      </div>
    </section>
  );
}
