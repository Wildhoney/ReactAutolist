# ReactAutolist

> Browser native implementation of autocomplete using the datalist element.

![Travis](http://img.shields.io/travis/Wildhoney/ReactAutolist.svg?style=for-the-badge)
&nbsp;
![npm](http://img.shields.io/npm/v/react-autolist.svg?style=for-the-badge)
&nbsp;
![License MIT](http://img.shields.io/badge/license-mit-lightgrey.svg?style=for-the-badge)
&nbsp;
![Coveralls](https://img.shields.io/coveralls/Wildhoney/ReactAutolist.svg?style=for-the-badge)
&nbsp;
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=for-the-badge)](https://github.com/prettier/prettier)

**npm**: `npm install react-autolist`

**yarn**: `yarn add react-autolist`

---

## Getting Started

Autolist uses the browser native [`<datalist />`](https://www.w3schools.com/tags/tag_datalist.asp) tag for its auto-completion functionality.

```javascript
import Autolist from 'react-autolist';

export default function App() {
    const handleSuggest = async (value) => {
        const list = await fetch(`/list/${value}`);
        return list.map((item) => ({ id: item.id, value: item.name }));
    };

    const handleChange = (suggestion) => {
        console.log(`You chose ${suggestion.value}!`);
    };

    return <Autolist onSuggest={handleSuggest} onChange={handleChange} />;
}
```

Adding the `onSuggest` callback allows you to initiate the search when the user types into the `input` field &ndash; and `onChange` is invoked when the user submits an item that is in the list of suggestions.

By default `onSuggest` is invoked for every character that's typed into the field no matter how small, however you can modify the behaviour by passing a `minLength` prop that will prevent the invocation if the text length is below the desired length.

You may also pass a `children` function that accepts the `handleSubmit` prop which can be invoked at any point, such as on the click of a button.

```javascript
<Autolist onSuggest={handleSuggest} onChange={handleChange}>
    {(handleSubmit) => <button onClick={handleSubmit}>Submit!</button>}
</Autolist>
```
