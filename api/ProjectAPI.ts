import { useQuery } from "@tanstack/react-query";
import { getClientProjId } from "./client/ClientAPI";
import { api } from "./AuthAPI";
import { useClientUserEmail } from "./Hooks/userHook";

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

export interface IProjectInfo {
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerAddress: string;
  projectId: string;
  projectDescription: string;
  projectDateCreation: string;
  projectDateValidity: string;
}

// Fetch all project info
export const getProjectInfo = (projId?: string) => {
  const customerEmail = useClientUserEmail();
  return useQuery<IProjectInfo, Error>({
    queryKey: ["project-info", projId, customerEmail],
    queryFn: () =>
      api
        .get("api/Project/ProjectQuotationInfo", {
          params: { projId, customerEmail },
        })
        .then((res) => res.data),
  });
};

export interface ProjectQuotationTotalExpense {
  quoteId: string;
  subTotal: string;
  discount: string;
  discountRate: string;
  subTotalAfterDiscount: string;
  vat: string;
  vatRate: string;
  total: string;
  estimationDate: number;
  totalMaterialCost: IProjectSupply;
  totalLaborCost: IProjectSupply;
}

export interface IProjectSupply {
  description: string;
  lineTotal: string;
}

// fetch all project Expense
export const getProjectExpense = (projId: string) => {
  return useQuery<ProjectQuotationTotalExpense, Error>({
    queryKey: ["project-Expense", projId], // Include parameters for better cache control
    queryFn: () =>
      api
        .get("api/Project/ProjectQuotationExpense", {
          params: { projId: projId },
        })
        .then((res) => res.data),
  });
};

export interface IProjectSupply {
  description: string;
  lineTotal: string;
}

// fetch all project Supply
export const getProjectSupply = (projId: string) => {
  return useQuery<IProjectSupply[], Error>({
    queryKey: ["project-supply-quotation", projId],
    queryFn: async () => {
      const response = await api.get("api/Project/ProjectQuotationSupply", {
        params: { projId: projId },
      });
      return response.data;
    },
  });
};

// Check project status
export const getIsOnGoingProject = (projId: string) => {
  return useQuery<boolean, Error>({
    queryKey: ["IsProjectOnGoing", projId],
    queryFn: async () => {
      const response = await api.get("api/Project/IsProjectOnGoing", {
        params: {
          projId: projId,
        },
      });
      return response.data;
    },
  });
};
