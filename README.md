# React PINInput
React component for entering and validating PIN code.


## Installation

`npm i --save pin-input`

## Usage

### Numeric Input
```js
<PINInput
          type='number'
          fields={4}
        />
```

### Text input:

```js
<PINInput
          type='text'
          fields={4}
        />
```

### Password input:
```js
<PINInput
          type='password'
          fields={4}
        />
```

### Password input with numeric input type:
```js
<PINInput
          type='password'
          inputType='number'
          fields={4}
        />
```

### Password input with showing last typed input value:
```js
<PINInput
          type='password'
          inputType='number'
          showLastTypedValue={true}
          fields={4}
        />
```

### Passing filter key codes and characters :

```js
<PINInput
          type='text'
          fields={4}
          filterKeyCodes={[189, 190]}
          filterChars= {['-', '.']}
        />
```

### Passing class for input wrapper div and for input:

```js
<PINInput
          type='text'
          fields={4}
          inputClassName={'pin-input'}
          inputWrapperClassName={'pin-input-wrapper'}
        />
```

### Passing default value
```js
<PINInput
          type='text'
          fields={4}
          value={'1111'}
        />
```

### Passing readOnly param
```js
<PINInput
          type='text'
          fields={4}
          readOnly={true}
        />
```


## Props:

| Property | Type | Description |
|:---|:---|:---|
| type | string | Only types like: `text`, `number`, `password` are accepted.|
| inputType | string | The inputType prop you can set with the type="password" for accepting password type (number or text)|
| fields | number | Allowed amount of characters to enter. |
| value | string | Setting the initial value of code input field. |
| onChange | func | Function, which is called whenever there is a change of value in the input box. |
| onKeyDown | func | Function, key down call back function |
| inputClassName | string | Add classname to the input element. |
| inputWrapperClassName | string | Add classname to the div element. |
| readOnly | bool | When present, it specifies that the element should be disabled. |
| autoFocus | bool | Setup autofocus on the first input, `true` by default. |
| filterKeyCodes | array | Filter characters on key down. |
| filterChars | array | Filter characters. | default: ['-', '.'] |
| pattern | string | The pattern prop specifies a regular expression that the <input> element's value is checked against. |


## License
MIT
