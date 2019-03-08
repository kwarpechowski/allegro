export default class DataManager {
  constructor({ url, defaultSort }) {
    this.url = url;
    this.json = [];
    this.defaultSort = defaultSort;
    this.clear();
  }

  static compareStrings = search => source =>
    source.toLowerCase().includes(search.toLowerCase());

  static getValue = path => channel =>
    path.split('.').reduce((p, c) => p[c], channel);

  download = async generateViewModel => {
    const response = await fetch(this.url);
    const data = await response.json();
    this.json = data.map(generateViewModel);
  };

  clear = () => {
    this.filterValue = "";
    this.sortValue = this.defaultSort;
  };

  filter = ({ title }) => {
    const { filterValue } = this;
    if (filterValue) {
      const comparator = DataManager.compareStrings(filterValue);
      return comparator(title);
    }
    return true;
  };

  sort = (chA, chB) => {
    const values = DataManager.getValue(this.sortValue);
    const valueA = values(chA);
    const valueB = values(chB);

    if (Number.isInteger(valueA)) {
      return valueB - valueA;
    }
    return valueA.localeCompare(valueB);
  };

  getData = () => this.json.filter(this.filter).sort(this.sort);
}
