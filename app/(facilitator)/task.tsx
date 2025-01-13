import { getAssignedProject } from "@/api/facilitator/FacilitatorAPI";
import {
  getProjectDateInto,
  getTaskToUpdateProgress,
} from "@/api/facilitator/ReportAPI";
import TasksToUpdateProgress from "@/components/TasksToUpdateProgress";
import React from "react";
import { ActivityIndicator, View } from "react-native";

const task = () => {
  const { data: projId, isLoading: isLoadingId } = getAssignedProject();
  const projectTaskToDos = getTaskToUpdateProgress(projId!);
  const {
    data: projInfo,
    isLoading,
    refetch: refetchDateInfo,
  } = getProjectDateInto(projId!);

  if (isLoadingId || isLoading || projectTaskToDos.isLoading)
    return <ActivityIndicator className="bg-orange-500" />;

  return (
    <View>
      <TasksToUpdateProgress
        taskToDo={projectTaskToDos.data!}
        refetch={projectTaskToDos.refetch}
        isFacilitator={true}
        refetchDateInfo={refetchDateInfo}
      />
    </View>
  );
};

export default task;
