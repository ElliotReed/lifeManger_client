// import { useQuery } from '@apollo/react-hooks';
// import gql from 'graphql-tag';
// import { BackLink } from "components/Links";
// import { HeaderContainer } from "components/Header";
// import LoadingSpinner from "components/common/LoadingSpinner";

import "./SelectorList.module.scss";

// const GET_ASSETS = gql`
// 	query getAssetList {
// 		assetItems {
// 			id
// 			name
// 		}
// 	}
// `;

function isSearched(searchTerm) {
  return function (item) {
    return (
      item.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.description ? item.description.toLowerCase() : "").includes(
        searchTerm.toLowerCase()
      )
    );
  };
}

export default function Selector({
  onSearchChange,
  searchTerm = "",
  // searchTerm,
  handleCreateUpdateForm,
  handleSelectorClick,
  assets,
  listItems,
  children,
}) {
  // const { data, loading, error } = useQuery(GET_ASSETS);
  // const { data, loading, error } = [[], false, false];

  // if (loading) return <LoadingSpinner />;
  // if (error) return <p>ERROR</p>;

  return (
    <>
      {/* <HeaderContainer> */}
      {/* <BackLink to="/manager">Asset Manager</BackLink> */}
      {/* <section className="asset__selector__sort-find">
        <i className="material-icons">sort</i>
        <i className="material-icons">sort</i>
      </section> */}
      {/* </HeaderContainer> */}
      {/* <section className="asset__selector__sort-find">
        <input type="text" onChange={onSearchChange} />
        <i className="material-icons">search</i>
      </section> */}

      <ul className="asset__selector__ul">
        {children}
        {/* {assets.filter(isSearched(searchTerm)).map((item) => (
          <li key={item.id} id={item.id} onClick={handleSelectorClick}>
            {item.label}
            <div>{item.description}</div>
          </li>
        ))} */}
      </ul>
      {/* <i
        className="material-icons md-48 btn-add"
        // onClick={handleCreateUpdateForm}
        data-name="create"
        title="Click to add an item."
      >
        add_circle
      </i> */}
    </>
  );
};

