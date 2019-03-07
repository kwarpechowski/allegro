import DataManager from './DataManager.js';
import translate from './locales.js';
import view from './view.js';
import model from './model.js';

const $body = document.querySelector('.channels');
const $filterInput = document.querySelector('.filter__input');
const $categories = Array.from(document.querySelectorAll('[name="sort"]'));
const $clearBtn = document.querySelector('.sort button');
const defaultSort = $categories.find(x => x.checked).dataset.field;

(async () => {
  const dataManager = new DataManager({
    url: `${document.URL}channels.json`,
    defaultSort
  });
  await dataManager.download(model);

  const displayChannels = () => {
    const data = dataManager
      .getData()
      .map(view)
      .join("");
    $body.innerHTML = data || translate('noResults');
  };

  displayChannels();

  const setFilterValue = ({ target: { value } }) => {
    dataManager.filterValue = value;
    displayChannels();
  };

  const setSortValue = ({
    target: {
      dataset: { field }
    }
  }) => {
    dataManager.sortValue = field;
    displayChannels();
  };

  const clearSearch = () => {
    dataManager.clear();
    $categories.forEach(el => (el.checked = false));
    $categories.find(el => el.dataset.field === defaultSort).checked = true;
    displayChannels();
  };

  $filterInput.addEventListener('keyup', setFilterValue);
  $categories.forEach(input => input.addEventListener('click', setSortValue));
  $clearBtn.addEventListener('click', clearSearch);
})();
