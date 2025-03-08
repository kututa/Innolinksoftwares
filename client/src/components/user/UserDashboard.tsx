import React, { useState } from 'react';
import { 
  Clock, 
  Package, 
  CreditCard, 
  Bell, 
  MessageSquare,
  FileText,
  Settings,
  User,
  LogOut,
  Search,
  Filter,
  Calendar,
  ChevronDown,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Download,
  ExternalLink
} from 'lucide-react';
import ServiceCatalog from './ServiceCatalog';
import OrderForm from './OrderForm';
import OrderHistory from './OrderHistory';
import { useLogout } from '../../hooks/useLogout';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';

const UserDashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);
const {logout} = useLogout();
const {user} = useAuthContext();
const navigate = useNavigate();
  // Mock data for demonstration
  const recentOrders = [
    {
      id: "ORD-2025-001",
      service: "Web Development",
      status: "in_progress",
      date: "2025-03-15",
      amount: 1299.99,
      progress: 65
    },
    {
      id: "ORD-2025-002",
      service: "Mobile App Development",
      status: "pending",
      date: "2025-03-14",
      amount: 2499.99,
      progress: 0
    },
    {
      id: "ORD-2025-003",
      service: "UI/UX Design",
      status: "completed",
      date: "2025-03-10",
      amount: 799.99,
      progress: 100
    }
  ];

  const notifications = [
    {
      id: 1,
      type: "update",
      message: "Your order ORD-2025-001 is now 65% complete",
      time: "2 hours ago",
      read: false
    },
    {
      id: 2,
      type: "payment",
      message: "Payment for ORD-2025-002 is pending approval",
      time: "5 hours ago",
      read: false
    },
    {
      id: 3,
      type: "support",
      message: "Support team has responded to your inquiry",
      time: "1 day ago",
      read: true
    }
  ];

  const supportTickets = [
    {
      id: "TKT-001",
      subject: "Technical Issue with Mobile App",
      status: "open",
      priority: "high",
      lastUpdate: "2025-03-15 14:30"
    },
    {
      id: "TKT-002",
      subject: "Billing Question",
      status: "closed",
      priority: "medium",
      lastUpdate: "2025-03-14 09:15"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-orange-100 text-orange-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleOrderService = (service: any) => {
    setSelectedService(service);
    setShowOrderForm(true);
  };

  const handleCloseOrderForm = () => {
    setShowOrderForm(false);
    setSelectedService(null);
  };

  const handleSubmitOrder = (orderData: any) => {
    console.log('Order submitted:', orderData);
    setShowOrderForm(false);
    setSelectedService(null);
    // Here you would typically send the order to your backend
    // and then update the UI accordingly
    alert('Order submitted successfully!');
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'services':
        return <ServiceCatalog onOrderService={handleOrderService} />;
      case 'orders':
        return <OrderHistory />;
      default:
        return renderOverview();
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-100 text-blue-600 p-3 rounded-lg">
              <Package className="h-6 w-6" />
            </div>
            <span className="text-sm font-semibold text-blue-600">Active Orders</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">3</h3>
          <p className="text-sm text-gray-500 mt-2">2 in progress, 1 pending</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-100 text-green-600 p-3 rounded-lg">
              <CreditCard className="h-6 w-6" />
            </div>
            <span className="text-sm font-semibold text-green-600">Total Spent</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">$4,599.97</h3>
          <p className="text-sm text-gray-500 mt-2">Last 30 days</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-purple-100 text-purple-600 p-3 rounded-lg">
              <MessageSquare className="h-6 w-6" />
            </div>
            <span className="text-sm font-semibold text-purple-600">Support Tickets</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">2</h3>
          <p className="text-sm text-gray-500 mt-2">1 open, 1 resolved</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-yellow-100 text-yellow-600 p-3 rounded-lg">
              <Bell className="h-6 w-6" />
            </div>
            <span className="text-sm font-semibold text-yellow-600">Notifications</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">3</h3>
          <p className="text-sm text-gray-500 mt-2">2 unread messages</p>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
          <button 
            onClick={() => setActiveSection('orders')}
            className="text-[#106EBE] hover:text-[#0FFCBE] text-sm font-medium"
          >
            View All Orders
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Progress
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.service}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-[#106EBE] h-2.5 rounded-full" 
                        style={{ width: `${order.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500 mt-1">{order.progress}%</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${order.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-[#106EBE] hover:text-[#0FFCBE] font-medium">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Notifications */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Recent Notifications</h2>
          <button className="text-[#106EBE] hover:text-[#0FFCBE] text-sm font-medium">
            View All
          </button>
        </div>
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div 
              key={notification.id}
              className={`flex items-start p-4 rounded-lg ${
                notification.read ? 'bg-white' : 'bg-blue-50'
              }`}
            >
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                notification.type === 'update' ? 'bg-blue-100 text-blue-600' :
                notification.type === 'payment' ? 'bg-green-100 text-green-600' :
                'bg-purple-100 text-purple-600'
              }`}>
                {notification.type === 'update' && <Clock className="h-4 w-4" />}
                {notification.type === 'payment' && <CreditCard className="h-4 w-4" />}
                {notification.type === 'support' && <MessageSquare className="h-4 w-4" />}
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm text-gray-900">{notification.message}</p>
                <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
              </div>
              {!notification.read && (
                <div className="flex-shrink-0 ml-4">
                  <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Support Tickets */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Support Tickets</h2>
          <button className="bg-[#106EBE] hover:bg-[#0FFCBE] text-white hover:text-gray-900 px-4 py-2 rounded-lg transition-colors duration-300">
            New Ticket
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ticket ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Update
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {supportTickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {ticket.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {ticket.subject}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      ticket.status === 'open' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(ticket.priority)}`}>
                      {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {ticket.lastUpdate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-[#106EBE] hover:text-[#0FFCBE] font-medium">
                      View Ticket
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation Bar */}
      <nav className="bg-white shadow-md fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-gray-800">My Dashboard</h1>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="relative p-2 text-gray-500 hover:text-gray-700 focus:outline-none">
                <Bell className="h-6 w-6" />
                <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  2
                </span>
              </button>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-3 focus:outline-none"
                >
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=48&h=48&q=80"
                    alt="User"
                    className="h-8 w-8 rounded-full"
                  />
                  <div className="hidden md:block text-left">
                    <span className="text-sm font-semibold text-gray-700">
                     {user?.fullName}
                    </span>
                    <span className="block text-xs text-gray-500">
                     {user?.email}
                    </span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
                    <a
                      href="#profile"
                      className=" px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <User className="h-4 w-4 mr-3" />
                      Profile
                    </a>
                    <a
                      href="#settings"
                      className=" px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <Settings className="h-4 w-4 mr-3" />
                      Settings
                    </a>
                    <hr className="my-2" />
                    <a
                      href="#logout"
                      className="px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                      onClick={() => {
                        logout();
                        navigate("/");
                      }}
                    >
                      <LogOut className="h-4 w-4 mr-3" />
                      Logout
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Quick Actions */}
          <div className="mb-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <button
              onClick={() => setActiveSection("services")}
              className={`p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow text-center ${
                activeSection === "services" ? "ring-2 ring-[#106EBE]" : ""
              }`}
            >
              <FileText className="h-6 w-6 text-[#106EBE] mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-700">
                New Order
              </span>
            </button>
            <button className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
              <MessageSquare className="h-6 w-6 text-[#106EBE] mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-700">Support</span>
            </button>
            <button
              onClick={() => setActiveSection("orders")}
              className={`p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow text-center ${
                activeSection === "orders" ? "ring-2 ring-[#106EBE]" : ""
              }`}
            >
              <Package className="h-6 w-6 text-[#106EBE] mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-700">
                Track Orders
              </span>
            </button>
            <button className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
              <CreditCard className="h-6 w-6 text-[#106EBE] mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-700">
                Payments
              </span>
            </button>
            <button className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
              <Download className="h-6 w-6 text-[#106EBE] mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-700">
                Downloads
              </span>
            </button>
            <button className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
              <ExternalLink className="h-6 w-6 text-[#106EBE] mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-700">
                Resources
              </span>
            </button>
          </div>

          {/* Main Content Area */}
          {renderContent()}
        </div>
      </div>

      {/* Order Form Modal */}
      {showOrderForm && selectedService && (
        <OrderForm
          service={selectedService}
          onClose={handleCloseOrderForm}
          onSubmit={handleSubmitOrder}
        />
      )}
    </div>
  );
};

export default UserDashboard;