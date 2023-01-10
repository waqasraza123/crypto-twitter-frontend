const PaginationClassic = ({paginatedObject, onClickFunction}) => {

    const {
        current_page, //number
        last_page, //number
        next_page_url, //url or null
        prev_page_url, //url or null
        links, //array of link object
    } = paginatedObject

    let items = []

    //if there are more than 1 pages
    if(last_page > 1){
        for(let i = 0; i < links.length; i++){
            const currentItem = links[i]

            //set the next page to null
            //current page is next
            const nextButtonClass = next_page_url === null && i === links.length - 1 ? " disabled" : ""
            const prevButtonClass = prev_page_url === null && i === 0 ? " disabled" : "" //last item
            const pageNumber = i === links.length - 1 ? current_page + 1 : i

            items.push(
                <li className={"page-item" + nextButtonClass + prevButtonClass } key={i} onClick={() => onClickFunction(pageNumber)}>
                    <a className="page-link" href="#">{i === links.length - 1 ? "Next" : i === 0 ? "Previous" : i}</a>
                </li>
            )
        }
    }

    return (
        <nav>
            <ul className="pagination">
                {items}
            </ul>
        </nav>
    )

}

export default PaginationClassic