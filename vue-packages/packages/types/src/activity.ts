/**
 * Activity types for lowcode engine
 */

export interface IActivity {
  id: string;
  name: string;
  description?: string;
  type: 'activity' | 'task' | 'milestone';
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  startTime?: number;
  endTime?: number;
  assignee?: string;
  dependencies?: string[];
}

export interface IActivityTracker {
  activities: IActivity[];
  addActivity(activity: IActivity): void;
  getActivity(id: string): IActivity | undefined;
  updateActivity(id: string, updates: Partial<IActivity>): void;
  removeActivity(id: string): void;
  getActivitiesByType(type: IActivity['type']): IActivity[];
}
