import { history } from 'instantsearch.js/es/lib/routers';
import {type UiState} from "instantsearch.js";

export const useRouter = (indexName: string) => {
    return {
        router: history(),
        stateMapping: {
            stateToRoute(uiState: UiState) {
                const indexUiState = uiState[indexName];
                return {... indexUiState.refinementList, page: indexUiState.page}
            },
            routeToState(routeState: UiState) {
                return {
                    [indexName]: {refinementList: {... routeState}, page: routeState.page }
                };
            }
        }
    };
};
