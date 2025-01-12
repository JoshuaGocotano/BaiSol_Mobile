
export type Payment = {
  referenceNumber: string;
  checkoutUrl: string;
  amount: string;
  description: string;
  status: string;
  sourceType: string;
  createdAt: string;
  updatedAt: string;
  paidAt: string | null;
  paymentFee: string;
  isAcknowledged: boolean;
  acknowledgedBy: string;
  acknowledgedAt: string | null;
};

// Export payment data
export const paymentsData: Payment[] = [
  {
    referenceNumber: "e5G6kKd",
    checkoutUrl: "https://pm.link/org-gTczw5RKjpUgJAvrf1udJM36/test/e5G6kKd",
    amount: "600.00",
    description: "60% Down Payment",
    status: "paid",
    sourceType: "GCash",
    createdAt: "2024-10-15 11:14:37",
    updatedAt: "2024-10-15 11:14:37",
    paidAt: "2024-10-15 11:19:38",
    paymentFee: "15.00",
    isAcknowledged: true,
    acknowledgedBy: "",
    acknowledgedAt: "2024-10-15 11:56:10",
  },
  {
    referenceNumber: "JALJHGv",
    checkoutUrl: "https://pm.link/org-gTczw5RKjpUgJAvrf1udJM36/test/JALJHGv",
    amount: "300.00",
    description: "30% Progress Payment",
    status: "paid",
    sourceType: "Bank of the Philippine Islands",
    createdAt: "2024-10-15 11:14:37",
    updatedAt: "2024-10-15 11:14:37",
    paidAt: "2024-11-20 22:15:38",
    paymentFee: "0.00",
    isAcknowledged: false,
    acknowledgedBy: "",
    acknowledgedAt: null,
  },
  {
    referenceNumber: "747QA9u",
    checkoutUrl: "https://pm.link/org-gTczw5RKjpUgJAvrf1udJM36/test/747QA9u",
    amount: "100.00",
    description: "10% Final Payment",
    status: "unpaid",
    sourceType: "",
    createdAt: "2024-10-15 11:14:37",
    updatedAt: "2024-10-15 11:14:37",
    paidAt: "",
    paymentFee: "0.00",
    isAcknowledged: false,
    acknowledgedBy: "",
    acknowledgedAt: null,
  },
];
