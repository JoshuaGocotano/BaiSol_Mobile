import { api } from "@/api/AuthAPI";
import { useUserEmail } from "@/api/Hooks/userHook";
import { useMutation, useQuery } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

export interface IAllRequest {
  reqId: number;
  submittedAt: string;
  reviewedAt: string;
  status: string;
  quantityRequested: number;
  requestSupply: string;
  projectName: string;
  supplyCategory: string;
  submittedBy: string;
  reviewedBy: string;
}

export const getRequestsByProj = () => {
  const userEmail = useUserEmail();
  return useQuery<IAllRequest[], Error>({
    queryKey: ["request-by-project", userEmail],
    queryFn: async () => {
      const response = await api.get("api/Facilitator/SentRequestByProj", {
        params: {
          userEmail: userEmail,
        },
      });
      return response.data;
    },
  });
};

interface IActionAcknowledge {
  reqId: number[];
}

export const useAcknowledgeRequest = () => {
  const userEmail = useUserEmail();
  return useMutation({
    mutationFn: async (data: IActionAcknowledge) => {
      const response = await api.put(
        "api/Facilitator/AcknowledgeRequest",
        {
          ...data,
          userEmail: userEmail,
        },
        {
          headers: {
            "Content-Type": "application/json", // Ensure it matches the server requirements
          },
        }
      );
      return response.data;
    },
    onError: (error: any) => {
      Toast.show({ type: "error", text1: error.response.data });
      console.error("Error approve request:", error);
    },
  });
};

interface IDeleteRequest {
  reqId: number;
}

export const useDeleteRequest = () => {
  const userEmail = useUserEmail();
  return useMutation({
    mutationFn: async (data: IDeleteRequest) => {
      const response = await api.delete("api/Requisition/DeleteRequest", {
        data: {
          reqId: data.reqId, // Include the reqId in the body
          userEmail: userEmail,
        },
      });
      return response.data;
    },
    onError: (error: any) => {
      Toast.show({ type: "error", text1: error.response.data });
      console.error("Error delete request:", error);
    },
  });
};

interface IRequestSupplies {
  suppId: number;
  supplyName: string;
}

export const getRequestMaterialSupplies = () => {
  const userEmail = useUserEmail();
  return useQuery<IRequestSupplies[], Error>({
    queryKey: ["request-material-supplies"],
    queryFn: async () => {
      const response = await api.get("api/Facilitator/RequestSupplies", {
        params: {
          userEmail: userEmail,
          supplyCtgry: "Equipment",
        },
      });
      return response.data;
    },
  });
};

export interface IRequestSupply {
  requestDetails: IRequestDetail[];
}
export interface IRequestDetail {
  quantityRequested: number;
  suppId: number;
}

export const useRequestSupply = () => {
  const userEmail = useUserEmail();
  return useMutation({
    mutationFn: async (formData: IRequestSupply) => {
      const response = await api.post(
        "api/Requisition/RequestSupply",
        {
          ...formData,
          submittedBy: userEmail,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    },
    onError: (error: any) => {
      Toast.show({ type: "error", text1: error.response.data });
      console.error("Error request supply:", error);
    },
  });
};
