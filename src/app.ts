const startApp = async () => {
    const pageNumberElement = document.querySelector('[data-pageview]');
    const dataTable = document.querySelector('[data-sink]') as HTMLTableElement;

    const addDataToTable = (data) => {
        if (data && dataTable) {
            Array.from(dataTable.children).map((tableRow, index) => {
                tableRow.setAttribute('data-entryId', data[index].id);
                tableRow.children[0].innerHTML = data[index].row;
                tableRow.children[1].innerHTML = data[index].gender?.toUpperCase();
                tableRow.children[2].innerHTML = data[index].age;
            });
        }
    };

    const initialUrl = `https://randomapi.com/api/8csrgnjw?key=LEIX-GF3O-AG7I-6J84`;
    const fetchData = async (url: string) => {
        try {
            const data = await fetch(url);
            const dataToJSON = await data.json();
            const { info, results } = dataToJSON;

            const pageData = results[0];
            let currentPage = info.page;
            const currentPageData = getPageData(pageData, currentPage);
            addDataToTable(currentPageData);
            if (pageNumberElement) {
                pageNumberElement.innerHTML = `Showing Page ${currentPage}`;
            }
        } catch (error) {}
    };

    fetchData(initialUrl);
};

document.addEventListener('DOMContentLoaded', startApp);

const getPageData = (data, page) => {
    if (data.hasOwnProperty(page)) {
        return data[page];
    }
    return [];
};
