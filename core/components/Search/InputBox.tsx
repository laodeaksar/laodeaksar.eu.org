import { connectSearchBox } from 'react-instantsearch-dom';

const InputBox = ({ refine }: any) => {
  return (
    <input
      type="search"
      placeholder="Type keywords to search blog posts..."
      id="search-input"
      name="search"
      onChange={e => {
        refine(e.currentTarget.value);
      }}
      autoFocus
      autoCorrect="off"
      autoCapitalize="off"
      spellCheck="false"
      autoComplete="off"
      title="Search"
    />
  );
};

export default connectSearchBox(InputBox);
