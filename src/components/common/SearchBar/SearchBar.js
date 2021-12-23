import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";

import styles from "./search-bar.module.scss";

export default function SearchBar({ placeholder, data }) {
  const [filteredData, setFilteredData] = React.useState([]);
  const [searchText, setSearchText] = React.useState("");

  const handleFilterChange = (e) => {
    const searchedText = e.target.value;
    setSearchText(searchedText);
    const newFilter = data.filter((item) => {
      return item.label.toLowerCase().includes(searchedText.toLowerCase());
    });

    if (searchedText === "") {
      setFilteredData([]);
      return;
    }
    setFilteredData(newFilter);
  };

  const handleFilterClear = () => {
    setFilteredData([]);
    setSearchText("");
  };

  return (
    <section className={styles.SearchBar}>
      Search bar
      <div className={styles.search}>
        <div className={styles.searchInputs}>
          <input
            type="text"
            placeholder={placeholder}
            onChange={handleFilterChange}
            value={searchText}
          />
          <div className={styles.searchIcon}>
            {filteredData.length === 0 && searchText.length === 0 ? (
              <FontAwesomeIcon icon={["fas", "search"]} />
            ) : (
              <FontAwesomeIcon
                icon={["fas", "times"]}
                className={styles.clearBtn}
                onClick={handleFilterClear}
              />
            )}
          </div>
        </div>
        <ul className={styles.dataResult}>
          {filteredData.length !== 0 &&
            filteredData.slice(0, 15).map((item) => {
              return (
                <li>
                  <a className={styles.dataItem} href={item.links.href}>
                    <p>{item.label}</p>
                  </a>
                </li>
              );
            })}
        </ul>
      </div>
    </section>
  );
}
