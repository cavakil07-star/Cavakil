import Link from 'next/link';
import Image from 'next/image';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';

export default function Footer() {
    const quickLinks = [
        { label: 'Home', href: '/' },
        { label: 'About Us', href: '/about' },
        { label: 'Our Services', href: '/services' },
        { label: 'Why Choose Us', href: '/#why' },
        { label: 'Testimonials', href: '/#testimonials' },
        { label: 'Contact', href: '/contact-us' },
        { label: 'Blogs', href: '/blogs' },
    ];

    const policyLinks = [
        { label: 'Privacy Policy', href: '/privacy-policy' },
        { label: 'Terms & Conditions', href: '/terms&conditions' },
        { label: 'Refund Policy', href: '/refund-policy' },
    ];


    const services = [
        'Startup Registration',
        'Trademark Services',
        'GST & Tax Filing',
        'PF & MSME Registration',
        'Legal Compliance',
        'DSC & Udyam Registration',
    ];

    const socialLinks = [
        { 
            name: 'Facebook', 
            icon: FaFacebook, 
            url: 'https://facebook.com',
            color: 'hover:bg-[#1877F2]'
        },
        { 
            name: 'Twitter', 
            icon: FaTwitter, 
            url: 'https://twitter.com',
            color: 'hover:bg-[#1DA1F2]'
        },
        { 
            name: 'Instagram', 
            icon: FaInstagram, 
            url: 'https://www.instagram.com/ca.vakil?igsh=Ynl4ajJ2b2JqZnJ1&utm_source=qr',
            color: 'hover:bg-gradient-to-r hover:from-[#833AB4] hover:via-[#FD1D1D] hover:to-[#FCAF45]'
        },
        { 
            name: 'LinkedIn', 
            icon: FaLinkedin, 
            url: 'https://linkedin.com',
            color: 'hover:bg-[#0A66C2]'
        },
        { 
            name: 'YouTube', 
            icon: FaYoutube, 
            url:'https://www.youtube.com/@CAVakil',
            color: 'hover:bg-[#FF0000]'
        },
    ];

    return (
        <footer className="relative overflow-hidden bg-gradient-to-br from-[#002244] to-[#003366] text-white pt-16 pb-8 px-4">

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
                    {/* Brand & Contact */}
                    <div className="space-y-6">
                        <div className="flex items-center">
                            <div className="p-2">
                                <div className="relative w-40 h-16">
                                    <Image
                                        src="/logo-white.png"
                                        alt="Legal Services Logo"
                                        layout="fill"
                                        objectFit="contain"
                                        className="filter rounded-lg"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* <p className="text-gray-300 leading-relaxed max-w-xs">
                            Providing comprehensive legal solutions to help your business thrive in today's competitive environment.
                        </p> */}

                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="mt-1 bg-[#0055aa] p-2 rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-semibold">Our Office</h4>
                                    <p className="text-gray-300">1334/1 1st Floor, Haibowal Khurd, Ludhiana, Punjab, 141001</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="mt-1 bg-[#0055aa] p-2 rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-semibold">Email Us</h4>
                                    <p className="text-gray-300">baggarajiv@gmail.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="mt-1 bg-[#0055aa] p-2 rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-semibold">Call Us</h4>
                                    <p className="text-gray-300">+91 7696 000 201</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xl font-bold mb-6 pb-2 border-b-2 border-[#0055aa] inline-block">Quick Links</h3>
                        <ul className="space-y-3">
                            {quickLinks.map(link => (
                                <li key={link.href}>
                                    <Link href={link.href}>
                                        <p className="flex items-center gap-3 group text-gray-300 hover:text-white transition-colors">
                                            <span className="w-2 h-2 rounded-full bg-[#0055aa]"></span>
                                            <span className="group-hover:underline group-hover:underline-offset-4">{link.label}</span>
                                        </p>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* legal */}
                    <div>
                        <h3 className="text-xl font-bold mb-6 pb-2 border-b-2 border-[#0055aa] inline-block">Policies</h3>
                        <ul className="space-y-3">
                            {policyLinks.map(link => (
                                <li key={link.href}>
                                    <Link href={link.href}>
                                        <p className="flex items-center gap-3 group text-gray-300 hover:text-white transition-colors">
                                            <span className="w-2 h-2 rounded-full bg-[#0055aa]"></span>
                                            <span className="group-hover:underline group-hover:underline-offset-4">{link.label}</span>
                                        </p>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    {/* <div>
                        <h3 className="text-xl font-bold mb-6 pb-2 border-b-2 border-[#0055aa] inline-block">Our Services</h3>
                        <ul className="space-y-3">
                            {services.map((svc, i) => (
                                <li key={i} className="flex items-center gap-3 group">
                                    <span className="w-2 h-2 rounded-full bg-[#0055aa]"></span>
                                    <span className="text-gray-300 group-hover:text-white transition-colors">{svc}</span>
                                </li>
                            ))}
                        </ul>
                    </div> */}

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-xl font-bold mb-3 pb-2 border-b-2 border-[#0055aa] inline-block">Best Services</h3>
                        <p className="text-gray-300 mb-3">
                            Offering expert tax and GST solutions to help your business stay compliant and grow with confidence. Subscribe to our newsletter for the latest tax tips, compliance updates, and financial insights.
                        </p>

                        {/* <form className="space-y-4">
                            <div>
                                <input
                                    type="email"
                                    placeholder="Your email address"
                                    className="w-full px-4 py-3 rounded-lg bg-[#001a33] border border-[#0055aa] focus:outline-none focus:ring-2 focus:ring-[#0055aa] text-white placeholder-gray-400"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-[#0055aa] to-[#0077cc] hover:from-[#0077cc] hover:to-[#0055aa] text-white font-medium py-3 rounded-lg transition-all shadow-lg hover:shadow-xl"
                            >
                                Subscribe Now
                            </button>
                        </form> */}

                        {/* <div className="mt-8">
                            <h4 className="font-semibold mb-4">Follow Us</h4>
                            <div className="flex gap-3">
                                {socialLinks.map((social, index) => (
                                    <a
                                        key={index}
                                        href="#"
                                        className="bg-[#0055aa] hover:bg-[#0077cc] p-3 rounded-full transition-all"
                                        aria-label={social.name}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24">
                                            <path fill="currentColor" d={social.icon} />
                                        </svg>
                                    </a>
                                ))}
                            </div>
                        </div> */}
                    </div>
                </div>

                {/* Bottom section */}
                <div className="border-t border-[#0055aa] pt-8">
                    {/* Social Media Section */}
                    <div className="flex flex-col items-center mb-6">
                        <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
                        <div className="flex flex-wrap justify-center gap-3">
                            {socialLinks.map((social) => {
                                const IconComponent = social.icon;
                                return (
                                    <a
                                        key={social.name}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`group bg-[#0055aa] p-3.5 rounded-full transition-all duration-300 transform hover:scale-110 hover:shadow-lg ${social.color}`}
                                        aria-label={social.name}
                                    >
                                        <IconComponent className="h-5 w-5 text-white" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 border-t border-[#0055aa]/50">
                        <div className="text-gray-300 text-sm text-center md:text-left">
                            © {new Date().getFullYear()} CA Vakil. All rights reserved.
                        </div>

                        {/* <div className="text-sm text-gray-400">
                            Developed by{" "}
                            <a
                                href="https://matchbestsoftware.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-white text-[#E7F7FF] transition-colors font-semibold no-underline"
                            >
                                Matchbest Software
                            </a>
                        </div> */}
                    </div>
                </div>


            </div>

            {/* Decorative bottom wave */}
            <div className="absolute bottom-0 left-0 w-full h-12 overflow-hidden">
                <svg
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                    className="absolute bottom-0 left-0 w-full h-full fill-[#001a33] opacity-20"
                >
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
                </svg>
            </div>
        </footer>
    );
}
