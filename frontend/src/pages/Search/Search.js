import FilterList from "./FilterList";
import ProfileList from "./ProfileList";
import classes from "./Search.module.css";

const Search = () => {
  return (
    <div className={classes["search-page"]}>
      <FilterList />
      <ProfileList />
    </div>
  );
};

export default Search;
