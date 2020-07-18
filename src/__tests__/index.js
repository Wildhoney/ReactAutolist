import React from 'react';
import test from 'ava';
import { mount } from 'enzyme';
import * as R from 'ramda';
import sinon from 'sinon';
import delay from 'delay';
import Autolist from '../';

test('It should be always able to associate the input with the datalist;', (t) => {
    const wrapper = mount(
        <Autolist onSuggest={R.identity} onChange={R.identity} />,
    );
    t.is(wrapper.find('input').props().list, 'autolist');
    t.is(
        wrapper.find('input').props().list,
        wrapper.find('datalist').props().id,
    );

    {
        const wrapper = mount(
            <Autolist
                name="example"
                onSuggest={R.identity}
                onChange={R.identity}
            />,
        );
        t.is(wrapper.find('input').props().list, 'example');
        t.is(
            wrapper.find('input').props().list,
            wrapper.find('datalist').props().id,
        );
    }
});

test('It should only invoke the `onSuggest` callback when the value exceeds minLength;', (t) => {
    const spies = { onSuggest: sinon.spy() };

    const wrapper = mount(
        <Autolist
            minLength={3}
            onSuggest={spies.onSuggest}
            onChange={R.identity}
        />,
    );
    wrapper.find('input').simulate('change', { target: { value: 'Ada' } });
    t.is(spies.onSuggest.callCount, 0);
    wrapper.find('input').simulate('change', { target: { value: 'Adam' } });
    t.is(spies.onSuggest.callCount, 1);
});

test('It should be able to invoke the `onSuggest` and update the datalist;', async (t) => {
    const spies = {
        onSuggest: sinon.spy(() => [{ id: 1, value: 'Russian Federation' }]),
    };

    const wrapper = mount(
        <Autolist onSuggest={spies.onSuggest} onChange={R.identity} />,
    );
    wrapper.find('input').simulate('change', { target: { value: 'Russia' } });
    await delay(1);
    t.snapshot(wrapper.find('datalist').html());
});

test('It should be able to invoke the `onChange` when selecting a value from the datalist;', async (t) => {
    const spies = {
        onSuggest: sinon.spy(() => [{ id: 2, value: 'United Kingdom' }]),
        onChange: sinon.spy(),
    };

    const wrapper = mount(
        <Autolist onSuggest={spies.onSuggest} onChange={spies.onChange} />,
    );
    wrapper
        .find('input')
        .simulate('change', { target: { value: 'United Kingdom' } });
    await delay(1);
    t.snapshot(wrapper.find('datalist').html());
    wrapper.find('input').simulate('keypress', { key: 'enter' });
    t.is(spies.onChange.callCount, 1);

    wrapper.find('input').simulate('change', { target: { value: 'kingdom' } });
    await delay(1);
    t.snapshot(wrapper.find('datalist').html());
    wrapper.find('input').simulate('keypress', { key: 'enter' });
    t.is(spies.onChange.callCount, 1);

    wrapper.setProps({
        onResolve: (text, suggestion) =>
            suggestion.value.toLowerCase().includes(text.toLowerCase()),
    });
    wrapper.find('input').simulate('change', { target: { value: 'kingdom' } });
    await delay(1);
    t.snapshot(wrapper.find('datalist').html());
    wrapper.find('input').simulate('keypress', { key: 'enter' });
    t.is(spies.onChange.callCount, 2);
});
