import { useAppState } from "../store";
import { useDisperseMachine } from "./useDisperseMachine";
import { useFeatureFlags } from "./useFeatureFlags";

/**
 * Hook that provides app state either from the state machine or derived selector
 * based on the feature flag. This allows gradual migration to the state machine.
 */
export function useAppStateWithMachine() {
  const flags = useFeatureFlags();
  const derivedState = useAppState();
  const machineState = useDisperseMachine();
  
  if (flags.useStateMachine) {
    // Use state machine
    return {
      appState: machineState.appState,
      isStateMachineEnabled: true,
      machineState: machineState.state,
      send: machineState.send,
    };
  } else {
    // Use derived selector (current implementation)
    return {
      appState: derivedState.appState,
      isStateMachineEnabled: false,
      machineState: null,
      send: null,
    };
  }
}