import React, { useCallback, useState } from 'react';
import { uniq } from 'ramda';
import { Global } from '@emotion/core';
import delay from 'delay';
import countries from './countries.json';
import * as e from './styles';

export default function List() {
    const [list, setList] = useState([]);

    const handleSuggest = useCallback(async (country) => {
        await delay(2000);

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
                <e.Loading>Loading&hellip;</e.Loading>

                <span>
                    You ❤️ {list.length}{' '}
                    {list.length === 1 ? 'country' : 'countries'}.
                </span>
            </e.Text>

            <Global styles={e.globalStyles} />
        </e.Container>
    );
}
