const PaginationClassic = ({paginatedObject, onClickFunction}) => {

    const {
        current_page, //number
        last_page, //number
        links, //array of link object
    } = paginatedObject

    let items = []

    //if there are more than 1 pages
    if(last_page > 1){
        for(let i = 0; i < links.length; i++){
            const currentItem = links[i]
            console.log(currentItem)
            items.push(
                <li className={"page-item"} key={i} onClick={() => onClickFunction(i)}>
                    <a className="page-link" href="#">{i + 1 === links.length ? "Next" : i === 0 ? "Previous" : i}</a>
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