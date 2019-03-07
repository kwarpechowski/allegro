const $body = document.querySelector('.channels');
const $filterInput = document.querySelector('.filter__input');
const $categories = Array.from(document.querySelectorAll('[name="sort"]'));
const $clearBtn = document.querySelector('.sort button');

const locales = {
    'subscriberCount': 'Subscribers',
    'videoCount': 'Videos',
    'viewCount': 'Views',
    'noResults': 'No results'
};

const translate = key => locales[key] || key;

//TODO KW funkcja do cache templates

const allowedKeys = ['subscriberCount', 'videoCount', 'viewCount']; //TODO KW oddzielna funkcja do generowania modelu
const generateViewModel = ({statistics, localized: {title}, thumbnails, customUrl}) => ({
    title,
    customUrl,
    thumbnails,
    statistics: allowedKeys.reduce((p, c) => ({...p, [c]: Number(statistics[c])}), {})
});

const getData = async () => {
    const response = await fetch(`${document.URL}channels.json`);
    const data = await response.json();
    return data.map(generateViewModel);
};

const generatePartialTemplateStats = statistics => `
    <ul class="stats">
        ${Object.entries(statistics).map(([key, value]) =>`
            <li class="stats__element">
                <h2 class="stats_label">${translate(key)}:</h2>
                ${value.toLocaleString('en-GB')}
            </li>`
        ).join('')}
    </ul>
`;

//TODO KW skalowanie obrazka
//TODO KW sprawdzic BEM i czy podkreślinik są podwójne
const generateTemplate = ({title, customUrl, thumbnails, statistics}) => `
    <li>
        <a href="${customUrl}" class="channels_channel" title="${title}" target="_blank">
            <figure class="channel__figure">
                <img srcset="${thumbnails.high.url},
                    ${thumbnails.medium.url} 2x"
                    src="${thumbnails.medium.url}"
                    alt="${title}"
                />
            </figure>
            <h1>${title}</h1>
            ${generatePartialTemplateStats(statistics)}
        </a>
    </li>
`;

let json; //na this
const defaultSort = $categories.find(x => x.checked).dataset.field;
const formState = {
    filterValue: '',
    sortValue : defaultSort
}

const setFilterValue = ({ target: { value }}) => {
    formState.filterValue = value;
    displayChannels();
};

const setSortValue= ({ target: { dataset: { field } }}) => {
    formState.sortValue = field;
    displayChannels();
};

const compareStrings = search => source =>
    source.toLowerCase().includes(search.toLowerCase());

const filterChannel = ({ title }) => {
    if (formState.filterValue) {
        const comparator = compareStrings(formState.filterValue);
        return comparator(title);
    }
    return true;
};


const getValue = path => channel =>
    path
        .split('.')
        .reduce((p, c) => p[c], channel);

const sortChannels = (chA, chB) => {
    const values = getValue(formState.sortValue);
    const valueA = values(chA);
    const valueB = values(chB);

    if (typeof valueA === 'number') {
        return valueB - valueA;
    }
    return valueA.localeCompare(valueB);
};

const clearSearch = () => {
    $filterInput.value = '';
    formState.filterValue = undefined;
    $categories.find(el => el.dataset.field === defaultSort).click();
};

const displayChannels = () => {
    const data = json.filter(filterChannel);
    $body.innerHTML = data.length ? data
        .sort(sortChannels)
        .map(generateTemplate)
        .reduce((p, c) => p + c, '') : `<p>${translate('noResults')}</p>`
};

(async () => {
    json = await getData();
    displayChannels();

    $filterInput.addEventListener('keyup', setFilterValue); //debounce ?
    $categories.forEach(input =>
        input.addEventListener('change', setSortValue)
    )
    $clearBtn.addEventListener('click', clearSearch)
})();