import { Title } from './style';

interface Props {
  text: string;
  alt?: string;
}

const HelloWorld = ({ text, alt }: Props) => (
  <Title>
    Hello World, {text}, {alt}
  </Title>
)

export default HelloWorld;
