import styled from '@emotion/styled';
import { css } from '@emotion/core';
import Autolist_ from 'react-autolist';

export const Container = styled.main`
    display: grid;
    grid-template-rows: auto auto;
    grid-gap: 10px;
    position: relative;
`;

export const Text = styled.div`
    font-family: Arial, Helvetica, sans-serif;
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 0 15px 20px 0;
    font-size: 0.75rem;
    opacity: 0.65;
    display: grid;
    grid-template-columns: auto auto;
    grid-gap: 10px;
    align-items: center;
`;

export const Loading = styled.span`
    opacity: 0;
    transition: opacity 0.25s;
    border: 1px solid lightgray;
    border-radius: 3px;
    padding: 5px 10px;
`;

export const Autolist = styled(Autolist_)`
    border: 1px solid rgba(0, 0, 0, 0.15);
    border: 0;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.05), 0 10px 10px rgba(0, 0, 0, 0.05);
    padding: 35px;
    padding-bottom: 60px;
    border-bottom: 2px solid lightgray;
    outline: none;
    font-size: 3vw;
    background-color: white;
    width: 50vw;
    border-radius: 5px;

    &::placeholder {
        color: lightgray;
    }

    &[data-loading='yes'] ~ ${Text} ${Loading} {
        opacity: 1;
    }
`;

export const globalStyles = css`
    html {
        padding: 0;
        margin: 0;
        overflow-x: hidden;
        background-color: rgba(0, 0, 0, 0.025);
    }

    html,
    body,
    #__next {
        height: 100%;
    }

    #__next {
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;
