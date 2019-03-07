import translate from "./locales.js";

const generatePartialTemplateStats = statistics => `
    <ul class="stats">
        ${Object.entries(statistics)
          .map(
            ([key, value]) => `
            <li class="stats__element">
                <h2 class="stats_label">${translate(key)}:</h2>
                ${value.toLocaleString("en-GB")}
            </li>`
          )
          .join("")}
    </ul>
`;

//TODO KW skalowanie obrazka
//TODO KW sprawdzic BEM i czy podkreślinik są podwójne
export default ({title, customUrl, thumbnails, statistics}) => `
    <li>
        <a href="${customUrl}" class="channels_channel" title="${title}" target="_blank">
            <figure class="channel__figure">
                <img class="channel__figure-img" srcset="${thumbnails.high.url},
                    ${thumbnails.medium.url} 2x"
                    src="${thumbnails.medium.url}"
                    alt="${title}"
                />
            </figure>
            <h1 class="channel__title">${title}</h1>
            ${generatePartialTemplateStats(statistics)}
        </a>
    </li>
`;
