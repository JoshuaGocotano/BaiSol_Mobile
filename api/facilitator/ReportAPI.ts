import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../AuthAPI";
import { getClientProjId } from "../client/ClientAPI";
import Toast from "react-native-toast-message";

export interface ITaskItem {
  id: number;
  proofImage: string | null;
  actualStart: string;
  estimationStart: string;
  taskProgress: number;
  isFinish: boolean;
  isEnable: boolean;
  isLate: boolean;
  daysLate: number;
}

export interface ITask {
  id: number;
  taskName: string;
  plannedStartDate: string;
  plannedEndDate: string;
  startDate: string;
  endDate: string;
  isEnable: boolean;
  isFinished: boolean;
  isStarting: boolean;
  daysLate: number;
  taskList: ITaskItem[];
}

export const getTaskToUpdateProgress = (projId: string) => {
  return useQuery<ITask[], Error>({
    queryKey: ["facilitator-task-to-update", projId],
    queryFn: async () => {
      const response = await api.get("api/Gantt/TaskToUpdateProgress", {
        params: { projId },
      });
      return response.data;
    },
  });
};

export interface IProjectDateInto {
  startDate: string;
  endDate: string;
  estimatedStartDate: string;
  estimatedEndDate: string;
  assignedFacilitator: string;
  estimatedProjectDays: string;
}

export const getProjectDateInto = (projId: string) => {
  return useQuery<IProjectDateInto, Error>({
    queryKey: ["ProjectDateInto", projId],
    queryFn: async () => {
      const response = await api.get("api/Gantt/ProjectDateInfo", {
        params: {
          projId: projId,
        },
      });
      return response.data;
    },
  });
};

export const useUpdateTaskProgress = () => {
  return useMutation({
    mutationFn: async ({
      id,
      Progress,
      ProofImage,
      EstimationStart,
    }: {
      id: number;
      Progress: number;
      ProofImage: File;
      EstimationStart: string;
    }) => {
      const data = new FormData(); // Create a FormData instance
      data.append("ProofImage", ProofImage); // Append the file

      const response = await api.put("api/Gantt/UpdateTaskProgress", data, {
        params: { id, Progress, EstimationStart }, // Pass the ID as a query parameter
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
    onError: (error: any) => {
      Toast.show({ type: "error", text1: error.response.data });

      console.error("Error submit report:", error);
    },
  });
};
