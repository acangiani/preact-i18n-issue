On the project I'm currently working we needed to support several languages so we ended upusing [preact-helmet](https://github.com/download/preact-helmet) to inject the title and the corresponding metatags for each of the App views, but I'm unable to make it work with ```{{fields}}``` placeholders, so I created this sample project to demonstrate the issue.


## How to install and run the sample project

- Clone the repository with ```git clone git@github.com:acangiani/preact-i18n-issue.git```
- Install the dependencies: ```npm install```
- Run the project ```npm run start```

## First view

This one works fine and correctly adds the title and the title metatag.

Doing ```curl http://localhost:3000/```, this outputs the following html:

```html
...
<title>Foo - Bar</title>
<meta name="title" content="Foo - Bar" data-preact-helmet="true">
...
```

## Second view

On the other hand on this view I needed to use a ```{{field}}``` placeholder, so doing ```curl http://localhost:3000/test```, this outputs the following html:

```html
...
<title>test - Bar</title>
<meta name="title" content="[object Object]" data-preact-helmet="true">
...
```

## Things I tried

1. Use ```@withText``` as decorator on the second view, but I cannot access the props.
2. Tried to use ```withText``` as a functional component wrapper so to obtain the translated text but I couldn't make it work.
3. Tried to render the component to a string like:
```js
render(<Text id="second.title" " fields={{ field: props.slug }}>default text</Text>)
```
but I only obtained the default text regardless of the i18n definitions loaded on the ```IntlProvider```.

Bottom line what I need it's to obtain the translated text as a string but I'm unable to do so, could you please help with this?


# [Solution](https://github.com/synacor/preact-i18n/issues/35) by [@pl12133 ](https://github.com/pl12133)

```js
@withText((props) => ({
  title: <Text id="second.title" fields={{ field: props.slug }} />
}))
export default class SecondView extends Component {
  render(props, state) {
    return (
      <div>
        <Helmet
          title={props.title}
          meta={[
            {name: "title", content: props.title },
          ]}
        />
      </div>
    );
  }
};
```
