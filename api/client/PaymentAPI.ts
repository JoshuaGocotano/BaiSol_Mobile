import { useQuery } from "@tanstack/react-query";
import { api } from "../AuthAPI";
import { getClientProjId } from "./ClientAPI";

interface IPayment {
  referenceNumber: string;
  checkoutUrl: string;
  amount: string;
  description: string;
  status: string;
  sourceType: string;
  createdAt: string;
  updatedAt: string;
  paidAt: string;
  paymentFee: string;
  isAcknowledged: boolean;
  acknowledgedBy: string;
  acknowledgedAt: string | null;
}

export const getClientPayments = (projId: string) => {
  return useQuery<IPayment[], Error>({
    queryKey: ["client-payment", projId],
    queryFn: async () => {
      const response = await api.get("api/Payment/GetClientPayments", {
        params: { projId },
      });
      return response.data;
    },
  });
};

// get payment progress
export const getPaymentProgress = (projId: string) => {
  return useQuery<number, Error>({
    queryKey: ["PaymentProgress", projId],
    queryFn: async () => {
      const response = await api.get("api/Payment/PaymentProgress", {
        params: {
          projId: projId,
        },
      });
      return response.data;
    },
  });
};
