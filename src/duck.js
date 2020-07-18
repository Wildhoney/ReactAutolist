import { uniq } from 'ramda';

export function getInitialState(text) {
    return {
        text: text ?? '',
        isLoading: false,
        suggestions: [],
        amalgamatedSuggestions: [],
    };
}

export function createMethods(state) {
    return {
        text(value) {
            return { ...state, text: value ?? '' };
        },
        initiateSuggestions() {
            return { ...state, isLoading: true };
        },
        putSuggestions(suggestions) {
            return {
                ...state,
                suggestions,
                isLoading: false,
                amalgamatedSuggestions: uniq([
                    ...state.amalgamatedSuggestions,
                    ...suggestions,
                ]),
            };
        },
        claimSuggestion(value) {
            return { ...state, text: value ?? '', suggestions: [] };
        },
    };
}
