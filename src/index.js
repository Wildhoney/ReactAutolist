import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { isNil } from 'ramda';
import { useMethods } from 'react-use';
import * as duck from './duck';

export default function Autolist({
    name,
    value,
    minLength,
    onSuggest,
    onResolve,
    onChange,
    ...props
}) {
    const [state, methods] = useMethods(
        duck.createMethods,
        duck.getInitialState(value),
    );

    const handleChange = useCallback(async ({ target }) => {
        methods.text(target.value);

        // Don't continue if the length is too short.
        if (target.value.length <= minLength) return;

        // Invoke the `onSuggest` function to fetch the suggestions.
        methods.initiateSuggestions();
        const suggestions = await onSuggest(target.value);
        methods.putSuggestions(suggestions);
    }, []);

    const handleKeyPress = useCallback(
        (event) => {
            if (event.key.toLowerCase() === 'enter') {
                event.preventDefault();

                // Attempt to find the suggestion on enter key.
                const suggestion = state.amalgamatedSuggestions.find(
                    (suggestion) => onResolve(state.text, suggestion),
                );

                // Resolve once we've discovered a valid suggestion.
                if (!isNil(suggestion)) {
                    const value = onChange(suggestion);
                    methods.claimSuggestion(value);
                }
            }
        },
        [state.text, state.amalgamatedSuggestions],
    );

    return (
        <>
            <input
                type="text"
                {...props}
                name={name}
                list={name ?? 'autolist'}
                value={state.text}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
            />

            <datalist id={name ?? 'autolist'}>
                {state.suggestions.map((suggestion) => (
                    <option key={suggestion.id}>{suggestion.value}</option>
                ))}
            </datalist>
        </>
    );
}

Autolist.propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    minLength: PropTypes.number,
    onSuggest: PropTypes.func.isRequired,
    onResolve: PropTypes.func,
    onChange: PropTypes.func.isRequired,
};

Autolist.defaultProps = {
    name: null,
    value: null,
    minLength: -Infinity,
    onResolve: (text, suggestion) => suggestion.value === text,
};
