import React from "react";
import Table from "../util/Table";

function ProductTable ({products}) {
    const columns = React.useMemo(
        () => [
            {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'Description',
                accessor: 'description',
            },
        ],
        []
    );

    const productList = React.useMemo(() => products, []);

    return (
        <Table columns={columns} data={productList} />
    );
}

export default ProductTable;