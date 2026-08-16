import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaHome,
  FaUpload,
  FaMoneyBillAlt,
  FaSearch,
  FaStar,
  FaHouseUser,
  FaArchive,
  FaChartLine,
  FaCog,
  FaBell,
  FaArrowRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Get user data from localStorage or session storage
    const userData = JSON.parse(localStorage.getItem('user')) || JSON.parse(sessionStorage.getItem('user'));
    setUser(userData);
    setIsVisible(true);
  }, []);

  const { userType, name } = user || {};

  const dashboardCards = [
    {
      id: "profile",
      title: "Profile",
      description: "View and edit your profile details easily.",
      icon: FaUser,
      link: "/profile",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      hoverColor: "hover:border-blue-300 hover:shadow-blue-100",
      delay: "0ms"
    },
    ...(userType === "landowner" ? [
      {
        id: "my-rooms",
        title: "My Rooms",
        description: "Manage the rooms you own and oversee their details.",
        icon: FaHome,
        link: "/landowner-rooms",
        color: "from-green-500 to-green-600",
        bgColor: "bg-green-50",
        iconColor: "text-green-600",
        hoverColor: "hover:border-green-300 hover:shadow-green-100",
        delay: "100ms"
      },
      {
        id: "upload-rooms",
        title: "Upload Rooms",
        description: "Add new rooms to your listings with ease.",
        icon: FaUpload,
        link: "/uploadrooms",
        color: "from-purple-500 to-purple-600",
        bgColor: "bg-purple-50",
        iconColor: "text-purple-600",
        hoverColor: "hover:border-purple-300 hover:shadow-purple-100",
        delay: "200ms"
      },
      {
        id: "my-renters",
        title: "My Renters",
        description: "Add and manage renters here with ease.",
        icon: FaHouseUser,
        link: "/my-renters",
        color: "from-pink-500 to-pink-600",
        bgColor: "bg-pink-50",
        iconColor: "text-pink-600",
        hoverColor: "hover:border-pink-300 hover:shadow-pink-100",
        delay: "300ms"
      },
      {
        id: "archived-renters",
        title: "Archived Renters",
        description: "View your archived renters here.",
        icon: FaArchive,
        link: "/archieved-renters",
        color: "from-orange-500 to-orange-600",
        bgColor: "bg-orange-50",
        iconColor: "text-orange-600",
        hoverColor: "hover:border-orange-300 hover:shadow-orange-100",
        delay: "400ms"
      }
    ] : userType === "renter" ? [
      {
        id: "find-rooms",
        title: "Find Rooms",
        description: "Search and discover rooms that match your preferences.",
        icon: FaSearch,
        link: "/findRooms",
        color: "from-purple-500 to-purple-600",
        bgColor: "bg-purple-50",
        iconColor: "text-purple-600",
        hoverColor: "hover:border-purple-300 hover:shadow-purple-100",
        delay: "100ms"
      },
      {
        id: "favourite-rooms",
        title: "Favourite Rooms",
        description: "View your saved favorite rooms here.",
        icon: FaStar,
        link: "/favouriteRooms",
        color: "from-yellow-500 to-yellow-600",
        bgColor: "bg-yellow-50",
        iconColor: "text-yellow-600",
        hoverColor: "hover:border-yellow-300 hover:shadow-yellow-100",
        delay: "200ms"
      },
      {
        id: "my-room",
        title: "My Room",
        description: "Check details and payment history updated by the owner.",
        icon: FaHouseUser,
        link: "/rentersMyRoom",
        color: "from-pink-500 to-pink-600",
        bgColor: "bg-pink-50",
        iconColor: "text-pink-600",
        hoverColor: "hover:border-pink-300 hover:shadow-pink-100",
        delay: "300ms"
      }
    ] : []),
    {
      id: "payment-history",
      title: "Payment History",
      description: "Track your payment records and transaction history.",
      icon: FaMoneyBillAlt,
      link: "/payment-history",
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-50",
      iconColor: "text-emerald-600",
      hoverColor: "hover:border-emerald-300 hover:shadow-emerald-100",
      delay: userType === "landowner" ? "500ms" : "400ms"
    }
  ];

  return (
    <div className="font-sans bg-gray-50 text-gray-900 min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative bg-white py-16 overflow-hidden border-b border-gray-100">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-50"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl mb-4">
              Welcome Back{name ? `, ${name}` : ''}! 👋
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-gray-600 sm:text-xl mx-auto leading-relaxed">
              Manage your {userType === "landowner" ? "properties and renters" : "rental experience"} with our intuitive dashboard tools.
            </p>
          </div>

          {/* User Info Badge */}
          <div className="flex justify-center">
            <div className="inline-flex items-center bg-white rounded-full px-6 py-3 shadow-md border border-gray-200">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 flex items-center justify-center mr-3">
                <FaUser className="text-white text-lg" />
              </div>
              <div className="text-left">
                <p className="text-xs text-gray-500 font-medium">Logged in as</p>
                <p className="text-sm font-bold text-gray-900 capitalize">{userType || "User"}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-3">
              Quick Access
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Access all your important features and tools from one central location.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {dashboardCards.map((card, index) => (
              <Link
                key={card.id}
                to={card.link}
                className={`group bg-white rounded-2xl p-6 shadow-md border-2 border-gray-100 ${card.hoverColor} transition-all duration-300 transform hover:-translate-y-1`}
                style={{
                  animationDelay: card.delay,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: `all 0.6s ease-out ${card.delay}`
                }}
              >
                <div className={`h-14 w-14 rounded-xl ${card.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 mb-4`}>
                  <card.icon className={`h-7 w-7 ${card.iconColor}`} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {card.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {card.description}
                </p>

                {/* Hover Arrow */}
                <div className="flex items-center text-primary-600 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="text-sm font-bold">Access Now</span>
                  <FaArrowRight className="ml-2 w-3 h-3 transform group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Overview Section */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-3">
              Platform Overview
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get insights into your {userType === "landowner" ? "property management" : "rental"} activities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 shadow-md border border-blue-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="h-14 w-14 rounded-xl bg-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300 mx-auto mb-6 shadow-md">
                <FaChartLine className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 text-center mb-3">Active Status</h3>
              <p className="text-gray-700 text-center leading-relaxed">
                Your account is active and ready for {userType === "landowner" ? "property management" : "room searching"}.
              </p>
            </div>

            <div className="group bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 shadow-md border border-purple-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="h-14 w-14 rounded-xl bg-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300 mx-auto mb-6 shadow-md">
                <FaBell className="h-7 w-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 text-center mb-3">Notifications</h3>
              <p className="text-gray-700 text-center leading-relaxed">
                Stay updated with real-time notifications about your activities.
              </p>
            </div>

            <div className="group bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-8 shadow-md border border-emerald-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="h-14 w-14 rounded-xl bg-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300 mx-auto mb-6 shadow-md">
                <FaCog className="h-7 w-7 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 text-center mb-3">Settings</h3>
              <p className="text-gray-700 text-center leading-relaxed">
                Customize your preferences and manage your account settings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Help Section for First-Time Users */}
      <section className="py-12 bg-gradient-to-br from-primary-50 to-indigo-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-primary-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              New to EasyRent? 🎉
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {userType === "landowner"
                ? "Start by uploading your first property listing to connect with potential renters. Use the 'Upload Rooms' card above to get started!"
                : "Begin your search by exploring available rooms in your preferred location. Click on 'Find Rooms' above to discover your perfect rental!"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to={userType === "landowner" ? "/uploadrooms" : "/findRooms"}
                className="inline-flex items-center justify-center px-6 py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-md"
              >
                {userType === "landowner" ? "Upload Your First Room" : "Find Your Perfect Room"}
                <FaArrowRight className="ml-2" />
              </Link>
              <Link
                to="/profile"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-gray-900 font-bold rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-300"
              >
                Complete Your Profile
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;