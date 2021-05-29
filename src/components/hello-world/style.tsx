import styled from 'styled-components';

const Title = styled.div.attrs({
  className: 'prose prose-indigo'
})`
  & {
    font-size: 1.5em;
    text-align: center;
  }
`;

export { Title }