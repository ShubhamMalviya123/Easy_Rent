import React, { useState, useEffect } from "react";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaCode, FaLaptopCode, FaRocket, FaDatabase, FaLinux, FaServer, FaFutbol, FaPlane } from "react-icons/fa";
import { SiCplusplus } from "react-icons/si";

const Developer = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="font-sans bg-gray-50 text-gray-900 min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative bg-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-70"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Image Section */}
            <div className={`lg:w-1/2 w-full transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <div className="w-full flex items-center justify-center relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-2xl transform rotate-6 scale-105 opacity-20 blur-lg"></div>
                <img
                  src="images/praveer.jpg"
                  alt="Praveer Kumar"
                  className="relative rounded-2xl shadow-2xl w-80 h-96 object-cover z-10 transform hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Text and Social Section */}
            <div className={`lg:w-1/2 w-full text-center lg:text-left transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4 tracking-tight">
                Praveer Kumar
              </h1>
              <p className="text-2xl md:text-3xl leading-8 font-extrabold tracking-tight text-primary-600 mb-6">
                Full-Stack Developer
              </p>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Hi, I'm a passionate developer currently pursuing MCA at NIT Bhopal.
                I am dedicated to building intuitive applications and solving
                real-world problems with innovative solutions. Let's connect and
                create something amazing together!
              </p>

              {/* Skills/Interests */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-10">
                {[
                  { icon: FaCode, text: "Web Dev", color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100" },
                  { icon: FaLaptopCode, text: "Full-Stack", color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-100" },
                  { icon: FaServer, text: "Backend", color: "text-green-600", bg: "bg-green-50", border: "border-green-100" },
                  { icon: FaDatabase, text: "Big Data", color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-100" },
                  { icon: FaLinux, text: "Linux", color: "text-yellow-600", bg: "bg-yellow-50", border: "border-yellow-100" },
                  { icon: SiCplusplus, text: "C++", color: "text-red-600", bg: "bg-red-50", border: "border-red-100" },
                  { icon: FaRocket, text: "Innovation", color: "text-pink-600", bg: "bg-pink-50", border: "border-pink-100" },
                ].map((skill, index) => (
                  <div key={index} className={`flex items-center ${skill.bg} rounded-full px-4 py-2 border ${skill.border} hover:shadow-md transition-all duration-300 transform hover:-translate-y-1`}>
                    <skill.icon className={`${skill.color} mr-2`} />
                    <span className="text-gray-700 font-medium text-sm">{skill.text}</span>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex justify-center lg:justify-start space-x-6">
                <a
                  href="https://github.com/kumarpraveer143"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100"
                >
                  <FaGithub size={24} className="text-gray-700 group-hover:text-black transition-colors duration-300" />
                </a>
                <a
                  href="https://www.linkedin.com/in/praveerdeveloper/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100"
                >
                  <FaLinkedin size={24} className="text-gray-700 group-hover:text-blue-600 transition-colors duration-300" />
                </a>
                <a
                  href="https://x.com/kumarpraveer3?t=s-r4AAAheb9JaG9UBN70og&s=09"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100"
                >
                  <FaTwitter size={24} className="text-gray-700 group-hover:text-blue-400 transition-colors duration-300" />
                </a>
                <a
                  href="https://www.instagram.com/kumar_praveeer?igsh=a3ZxamN0aWFqcjQw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100"
                >
                  <FaInstagram size={24} className="text-gray-700 group-hover:text-pink-600 transition-colors duration-300" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="py-20 bg-gray-50 relative">
        <div className="absolute inset-0 opacity-40 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-4">
              What I Do
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Passionate about creating innovative solutions, building applications, and enjoying life through sports and travel.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: FaCode, title: "Web Development", desc: "Building modern, responsive web applications using cutting-edge technologies and best practices.", color: "text-blue-600", bg: "bg-blue-50" },
              { icon: FaLaptopCode, title: "Full-Stack Solutions", desc: "End-to-end development from database design to user interface, ensuring seamless integration.", color: "text-purple-600", bg: "bg-purple-50" },
              { icon: FaFutbol, title: "Football", desc: "Passionate about football, both playing and watching. It keeps me active and teaches teamwork and strategy.", color: "text-green-600", bg: "bg-green-50" },
              { icon: FaPlane, title: "Travel", desc: "Love exploring new places and cultures. Traveling broadens perspectives and inspires creativity in my work.", color: "text-cyan-600", bg: "bg-cyan-50" },
              { icon: FaRocket, title: "Innovation", desc: "Constantly exploring new technologies and approaches to solve complex problems creatively.", color: "text-pink-600", bg: "bg-pink-50" },
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 group">
                <div className={`flex items-center justify-center w-16 h-16 ${item.bg} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon size={32} className={item.color} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Developer;
