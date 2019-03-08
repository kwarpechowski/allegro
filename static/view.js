import translate from "./locales.js";

const generatePartialTemplateStats = statistics => `
    <ul class="channels-list__item-stats">
        ${Object.entries(statistics)
          .map(
            ([key, value]) => `
            <li class="channels-list__item-stats__item">
                <h2 class="channels-list__item-stats__item-label">${translate(key)}:</h2>
                ${value.toLocaleString("en-GB")}
            </li>`
          )
          .join("")}
    </ul>
`;

export default ({title, customUrl, thumbnails, statistics}) => `
    <li>
        <a href="${customUrl}" 
            class="channels-list__item"
            title="${title}"
            role="button"
            target="_blank"
        >
            <figure class="channels-list__item-logo">
                <img class="channels-list__item-logo-img " srcset="${thumbnails.high.url},
                    ${thumbnails.medium.url} 2x"
                    src="${thumbnails.medium.url}"
                    alt="${title}"
                />
            </figure>
            <h1 class="channels-list__item-title">
                ${title}
            </h1>
            ${generatePartialTemplateStats(statistics)}
        </a>
    </li>
`;
