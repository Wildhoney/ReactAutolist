import test from 'ava';
import * as duck from '../duck';

test('It should be able to handle initiating the state;', (t) => {
    const state = duck.getInitialState(null);
    t.snapshot(state);

    {
        const state = duck.getInitialState('Imogen!');
        t.snapshot(state);
    }
});

test('It should be able to handle updating the text values;', (t) => {
    const methods = duck.createMethods(duck.getInitialState());
    t.snapshot(methods.text());
    t.snapshot(methods.text(undefined));
    t.snapshot(methods.text(null));
    t.snapshot(methods.text('Maria!'));
});

test('It should be able to initiating the suggestions;', (t) => {
    const methods = duck.createMethods(duck.getInitialState());
    t.snapshot(methods.initiateSuggestions());
});

test('It should be able to putting the suggestions;', (t) => {
    const methods = duck.createMethods(duck.getInitialState());
    t.snapshot(methods.putSuggestions([]));

    const state = methods.putSuggestions([
        { id: 1, value: 'Russian Federation' },
        { id: 2, value: 'United Kingdom' },
    ]);
    t.snapshot(state);

    {
        const methods = duck.createMethods(state);
        t.snapshot(methods.putSuggestions([{ id: 3, value: 'Cambodia' }]));
    }
});

test('It should be able to claim the suggestion;', (t) => {
    const methods = duck.createMethods(duck.getInitialState());
    t.snapshot(methods.claimSuggestion());
    t.snapshot(methods.claimSuggestion(undefined));
    t.snapshot(methods.claimSuggestion(null));
    t.snapshot(methods.claimSuggestion('Adam!'));
});
