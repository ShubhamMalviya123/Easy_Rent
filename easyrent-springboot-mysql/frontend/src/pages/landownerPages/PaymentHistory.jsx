import React from "react";

const PaymentHistory = () => {
  const payments = [
    {
      id: 1,
      renter: "John Doe",
      amount: 1200,
      date: "2024-01-10",
      status: "Paid",
    },
    {
      id: 2,
      renter: "Jane Smith",
      amount: 800,
      date: "2024-01-15",
      status: "Pending",
    },
    {
      id: 3,
      renter: "Robert Johnson",
      amount: 1500,
      date: "2024-02-01",
      status: "Paid",
    },
  ];

  const totalPaid = payments
    .filter((payment) => payment.status === "Paid")
    .reduce((sum, payment) => sum + payment.amount, 0);

  const totalPending = payments
    .filter((payment) => payment.status === "Pending")
    .reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Payment Dashboard
          </h1>
          <p className="text-gray-600">
            Track payments and ensure transparency
          </p>
        </div>

        {/* Summary Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700">Total Paid</h2>
            <p className="text-3xl font-bold text-green-500">${totalPaid}</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700">
              Total Pending
            </h2>
            <p className="text-3xl font-bold text-yellow-500">
              ${totalPending}
            </p>
          </div>
        </div>

        {/* Payment History Table */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-4 border-b">
            <h2 className="text-xl font-semibold text-gray-700">
              Payment History
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-200">
                <tr>
                  <th className="text-left p-4 text-sm font-medium text-gray-700">
                    Renter
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-gray-700">
                    Amount
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-gray-700">
                    Date
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-gray-700">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.id} className="border-b">
                    <td className="p-4 text-gray-700">{payment.renter}</td>
                    <td className="p-4 text-gray-700">${payment.amount}</td>
                    <td className="p-4 text-gray-700">{payment.date}</td>
                    <td
                      className={`p-4 font-semibold ${
                        payment.status === "Paid"
                          ? "text-green-500"
                          : "text-yellow-500"
                      }`}
                    >
                      {payment.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
