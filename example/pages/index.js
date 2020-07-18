import React, { useCallback, useState } from 'react';
import { uniq } from 'ramda';
import { Global } from '@emotion/core';
import countries from './countries.json';
import * as e from './styles';

export default function Index() {
    const [list, setList] = useState([]);

    const handleSuggest = useCallback((country) => {
        return countries
            .filter(({ name }) =>
                name.toLowerCase().includes(country.toLowerCase()),
            )
            .map(({ name }) => ({
                id: name.toLowerCase(),
                value: name,
            }));
    }, []);

    const handleChange = useCallback(
        (model) => {
            setList(uniq([...list, model]));
            return null;
        },
        [list],
    );

    return (
        <e.Container>
            <e.Autolist
                minLength={2}
                placeholder="Which countries do you love?"
                onSuggest={handleSuggest}
                onChange={handleChange}
            />

            <e.Text>
                You ❤️ {list.length}{' '}
                {list.length === 1 ? 'country' : 'countries'}.
            </e.Text>

            <Global styles={e.globalStyles} />
        </e.Container>
    );
}
