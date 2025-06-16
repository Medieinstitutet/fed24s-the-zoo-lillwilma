import { createContext, useReducer, useContext} from "react";
import type { ReactNode } from "react";

type FeedingState = {
    [animalId: string]: number;
};
type FeedingAction =
    | { type: "FEED"; animalId: string; time: number; };

function feedingReducer(state: FeedingState, action: FeedingAction): FeedingState {
    switch (action.type) {
        case "FEED": {
            return {
                ...state,
                [action.animalId]: action.time,
            };
        }
        default: {
            return state;
        }
    }
}
const FeedingContext= createContext<{
    state: FeedingState;
    dispatch: React.Dispatch<FeedingAction>;
} | undefined>(undefined);

export const FeedingProvider= ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(feedingReducer, {});

    return (
        <FeedingContext.Provider value={{ state, dispatch }}>
            {children}
        </FeedingContext.Provider>
    );
};

export const useFeeding = () => {
    const context = useContext(FeedingContext);
    if (!context) {
        throw new Error("useFeeding must be used within a FeedingProvider");
    }
    return context;
};
