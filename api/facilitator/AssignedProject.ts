import { useQuery } from "@tanstack/react-query";
import { useUserEmail } from "../Hooks/userHook";
import { api } from "../AuthAPI";

export const getAssignedProject = () => {
  const userEmail = useUserEmail();
  return useQuery<string, Error>({
    queryKey: ["assigned-project", userEmail],
    queryFn: async () => {
      const response = await api.get("api/Facilitator/GetAssignedProject", {
        params: {
          userEmail: userEmail,
        },
      });
      return response.data;
    },
  });
};

export interface IClientProjectInfo {
  projId: string;
  projName: string;
  projDescript: string;
  discount: number;
  vatRate: number;
  clientId: string;
  clientFName: string;
  clientLName: string;
  clientEmail: string;
  clientContactNum: string;
  clientAddress: string;
  systemType: string;
  kWCapacity: number;
  sex: string;
  isMale: boolean;
  paymentProgress?: number;
  projectProgress?: number;
  status?: "OnGoing" | "Finished" | "OnWork" | "OnProcess";

  installers?: [{ name: string; position: string }];
  facilitatorName?: string;
  facilitatorEmail?: string;

  projectStarted?: string;
  projectEnded?: string;
  totalDays?: string;
}

// fetch client Info
export const getClientProjectInfo = (projId?: string) =>
  useQuery<IClientProjectInfo, Error>({
    queryKey: ["client-Info", projId],
    queryFn: () =>
      api
        .get("api/Project/Get-Client-Info", {
          params: { projId },
        })
        .then((res) => res.data),
  });

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

interface IProjectProgress {
  progress: number;
}

export const getProjectProgress = (projId: string) => {
  return useQuery<IProjectProgress, Error>({
    queryKey: ["ProjectProgress", projId],
    queryFn: async () => {
      const response = await api.get("api/Gantt/ProjectProgress", {
        params: {
          projId: projId,
        },
      });
      return response.data;
    },
  });
};
