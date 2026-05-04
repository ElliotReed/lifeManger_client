import "./Selector.module.scss";

function SelectorHeader({ children }) {
  return <header>{children}</header>;
}

function SelectorList({ children }) {
  return <ul>{children}</ul>;
}
function SelectorFooter({ children }) {
  return <footer>{children}</footer>;
}

export default function Selector({ children }) {
  return <section className="selector">{children}</section>;
}

Selector.Header = SelectorHeader;
Selector.List = SelectorList;
Selector.Footer = SelectorFooter;
