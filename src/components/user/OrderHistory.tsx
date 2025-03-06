import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Download,
  MessageSquare,
  Eye,
  FileText,
  Calendar
} from 'lucide-react';

const OrderHistory = () => {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState('all');

  // Mock data for orders
  const orders = [
    {
      id: "ORD-2025-001",
      service: "Web Development",
      description: "E-commerce website with payment integration",
      status: "in_progress",
      orderDate: "2025-03-15",
      deadline: "2025-04-15",
      lastUpdate: "2025-03-20",
      price: 1299.99,
      progress: 65
    },
    {
      id: "ORD-2025-002",
      service: "Mobile App Development",
      description: "iOS fitness tracking application",
      status: "pending",
      orderDate: "2025-03-14",
      deadline: "2025-04-10",
      lastUpdate: "2025-03-14",
      price: 1899.99,
      progress: 0
    },
    {
      id: "ORD-2025-003",
      service: "UI/UX Design",
      description: "Website redesign and branding",
      status: "completed",
      orderDate: "2025-03-10",
      deadline: "2025-03-25",
      lastUpdate: "2025-03-25",
      price: 799.99,
      progress: 100
    },
    {
      id: "ORD-2025-004",
      service: "Digital Marketing",
      description: "SEO optimization and content strategy",
      status: "cancelled",
      orderDate: "2025-03-05",
      deadline: "2025-04-05",
      lastUpdate: "2025-03-07",
      price: 599.99,
      progress: 0
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
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatStatus = (status: string) => {
    return status.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  // Filter orders based on search term, status, and date range
  const filteredOrders = orders.filter(order => {
    // Filter by search term
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by status
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    
    // Filter by date range (simplified for demo)
    let matchesDateRange = true;
    if (dateRange !== 'all') {
      const orderDate = new Date(order.orderDate);
      const now = new Date();
      
      if (dateRange === 'month') {
        const monthAgo = new Date();
        monthAgo.setMonth(now.getMonth() - 1);
        matchesDateRange = orderDate >= monthAgo;
      } else if (dateRange === 'week') {
        const weekAgo = new Date();
        weekAgo.setDate(now.getDate() - 7);
        matchesDateRange = orderDate >= weekAgo;
      }
    }
    
    return matchesSearch && matchesStatus && matchesDateRange;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Order History</h2>
        <button className="bg-[#106EBE] hover:bg-[#0FFCBE] text-white hover:text-gray-900 px-4 py-2 rounded-lg transition-colors duration-300 flex items-center space-x-2">
          <Download className="h-5 w-5" />
          <span>Export Orders</span>
        </button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
        {/* Search */}
        <div className="relative w-full sm:w-96">
          <input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#106EBE] focus:border-[#106EBE]"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-4 w-full sm:w-auto">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#106EBE] focus:border-[#106EBE]"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#106EBE] focus:border-[#106EBE]"
          >
            <option value="all">All Time</option>
            <option value="month">Last Month</option>
            <option value="week">Last Week</option>
          </select>
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
            <Filter className="h-5 w-5" />
            <span>More Filters</span>
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order Details
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Progress
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Dates
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    {order.id}
                  </div>
                  <div className="text-sm text-gray-500">{order.service}</div>
                  <div className="text-sm text-gray-500 truncate max-w-xs">
                    {order.description}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                    {formatStatus(order.status)}
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
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span>Ordered: {order.orderDate}</span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span>Due: {order.deadline}</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${order.price.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    <button className="p-1 hover:bg-blue-100 rounded" title="View Details">
                      <Eye className="h-5 w-5 text-blue-600" />
                    </button>
                    <button className="p-1 hover:bg-purple-100 rounded" title="Message Support">
                      <MessageSquare className="h-5 w-5 text-purple-600" />
                    </button>
                    {order.status === 'completed' && (
                      <button className="p-1 hover:bg-green-100 rounded" title="Download Files">
                        <FileText className="h-5 w-5 text-green-600" />
                      </button>
                    )}
                    {order.status === 'pending' && (
                      <button className="p-1 hover:bg-red-100 rounded" title="Cancel Order">
                        <XCircle className="h-5 w-5 text-red-600" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-700">
            Showing {filteredOrders.length} of {orders.length} orders
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 rounded border border-gray-300 text-sm hover:bg-gray-50">
            Previous
          </button>
          <button className="px-3 py-1 rounded bg-[#106EBE] text-white text-sm">
            1
          </button>
          <button className="px-3 py-1 rounded border border-gray-300 text-sm hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;