import { html, TemplateResult } from 'lit-html';
import '../src/open-wc-scaffold-ts.js';

export default {
  title: 'OpenWcScaffoldTs',
  component: 'open-wc-scaffold-ts',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  title?: string;
  backgroundColor?: string;
}

const Template: Story<ArgTypes> = ({ title, backgroundColor = 'white' }: ArgTypes) => html`
  <open-wc-scaffold-ts style="--open-wc-scaffold-ts-background-color: ${backgroundColor}" .title=${title}></open-wc-scaffold-ts>
`;

export const App = Template.bind({});
App.args = {
  title: 'My app',
};
