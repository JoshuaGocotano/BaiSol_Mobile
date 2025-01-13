import { useMutation, useQuery } from "@tanstack/react-query";
import { useClientUserEmail, useUserEmail } from "../Hooks/userHook";
import { api } from "../AuthAPI";
import Toast from "react-native-toast-message";

interface IProjId {
  projId: string;
}

// const userEmail = "richardddquirante98@gmail.com";

// export const getClientProjId = (userEmail: string) => {
export const getClientProjId = () => {
  const userEmail = useUserEmail();
  return useQuery<IProjId[], Error>({
    queryKey: ["projId", userEmail],
    queryFn: async () => {
      const response = await api.get(`api/Client/GetClientProjectId`, {
        params: { userEmail },
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
  totalDays?: number;
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

  export const useApproveProjectQuotation = () => {
    const user = useUserEmail();
    return useMutation({
      mutationFn: async (id: { projId: string }) => {
        const { data } = await api.put(
          "api/Client/ApproveProjectQuotation",
          { ...id, userEmail: user },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        return data;
      },
      onError: (error: any) => {
      Toast.show({ type: "error", text1: error.response.data });
        
      },
    });
  };
  
  // Check project status
  export const getIsProjectApprovedQuotation = (projId: string) => {
    return useQuery<boolean, Error>({
      queryKey: ["IsProjectApprovedQuotation", projId],
      queryFn: async () => {
        const response = await api.get("api/Client/IsProjectApprovedQuotation", {
          params: {
            projId: projId,
          },
        });
        return response.data;
      },
    });
  };
  