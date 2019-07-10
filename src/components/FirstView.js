import { h, Component } from 'preact';
import { Text, withText } from 'preact-i18n';
import Helmet from "preact-helmet";

@withText({
  title: <Text id="first.title"></Text>
})
export default class FirstView extends Component {
  render(props, state) {
    return (
      <div>
        <Helmet
          title={props.title}
          meta={[
            {name: "title", content: props.title},
          ]}
        />
      </div>
    );
  }
};
