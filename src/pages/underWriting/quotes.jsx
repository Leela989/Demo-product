import { useEffect, useMemo, useRef, useState } from "react";
import { DataTable } from "primereact/datatable";
import {
  getQuotesInitialData,
  getQuotesTableData,
  getquotesOption,
} from "../../mock-data/underwriting/quotes";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Link, useLocation, useParams } from "react-router-dom";
import { Menu } from "primereact/menu";
import { OverlayPanel } from "primereact/overlaypanel";
import { Dropdown } from "primereact/dropdown";
import QuotesHeader from "./sub-components/quotesHeader";
import QuotesTabComponent from "./sub-components/quotesTabComponent";
import "./underwriting-styles.css";
import { Card } from "primereact/card";
import { QuotesList, QuotesListHeader } from "../../mock-data/underwriting/editquotes-data";

const Quotes = () => {
  const { pathname, state } = useLocation();
  const { lob } = useParams();
  const menuOpen = useRef(null);
  const overlayOpen = useRef(null);
  const options = getquotesOption.filter((data) => data.type === lob);


  const [selectedProduct, setSelectedProduct] = useState({
    type: "",
    name: "",
    code: "",
  });
  const [quotesTable, setQuotesTable] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);

  // let tableHeader = [];

  useEffect(() => {
    let tableData = QuotesList.data.find(set => set.LOB_Code === state.code);
    setQuotesTable(tableData.Quot_list);
  }, [state])

  // useEffect(() => {
  //   tableHeader = Object.keys(quotesTable[0]).map(data => {
  //     return(
  //       {field: data, header: data
  //         .split("_")
  //         .map((data) => data.charAt(0).toUpperCase() + data.slice(1))
  //         .join(" "),}
  //     )
  //   })
  //   tableHeader = [...tableHeader, { field: "action", header: "" }];
  // }, [quotesTable])
  

  // let tableHeader = Object.keys(getQuotesInitialData[0]).map((data) => {
  //   return {
  //     field: data,
  //     header: data
  //       .split("_")
  //       .map((data) => data.charAt(0).toUpperCase() + data.slice(1))
  //       .join(" "),
  //   };
  // });
  // tableHeader = [...tableHeader, { field: "action", header: "" }];

  const handleMenuClick = (rowData) => {
    console.log(rowData, "handleEdit");
  };

  const menuList = (rowData) => [
    {
      items: [
        {
          template: (item, options) => {
            return (
              <Link
                className={options.className}
                to={`${pathname}/edit/${rowData.key}`}
                onClick={handleMenuClick(rowData)}
                style={{ textDecoration: "none" }}
              >
                Edit
              </Link>
            );
          },
        },
      ],
    },
  ];

  const quotesCustomBody = (rowData, rowHeader) => {
    const { field } = rowHeader;
    if (field === "action") {
      return (
        <>
          <Button
            rounded
            text
            className="action-menu"
            icon="pi pi-ellipsis-v cursor-pointer"
            onClick={(event) => {
              setSelectedRow(rowData);
              menuOpen.current.toggle(event);
            }}
          />
          <Menu
            model={selectedRow ? menuList(selectedRow) : []}
            popup
            ref={menuOpen}
          />
        </>
      );
    } else {
      return <p>{rowData[field]}</p>;
    }
  };

  const handleProductDropdown = (event) => {
    setSelectedProduct(event.value);
  };

  const showSelectedProduct = useMemo(() => {
    return (
      <Dropdown
        value={selectedProduct}
        options={options}
        onChange={handleProductDropdown}
        optionLabel="name"
        placeholder="Select Product"
      />
    );
  }, [selectedProduct, options]);

  return (
    <div>
      <div className="flex justify-end pb-3">
        <Button onClick={(e) => overlayOpen.current.toggle(e)}>
          Create New
        </Button>
        <OverlayPanel className="create-overlay" ref={overlayOpen}>
          <div>
            <div className="flex items-center">
              <label className="pr-3">Line Of Business</label>
              <p style={{ color: "rgba(0, 60, 149, 0.85)", fontWeight: 700 }}>
                {state.code} - {state.name}
              </p>
            </div>
            <div className="mt-4">
              <label>Product</label>
              {showSelectedProduct}
            </div>
          </div>
          <div>
            <Link
              to={`${pathname}/new`}
              style={{
                color: "rgba(0, 60, 149, 0.85)",
                marginTop: "16px",
                marginLeft: "auto",
                display: "block",
                width: "fit-content",
              }}
            >
              Create
            </Link>
          </div>
        </OverlayPanel>
      </div>
      <DataTable value={quotesTable}>
        {QuotesListHeader.map((quoteData, index) => {
          return (
            <Column
              key={index}
              headerClassName= {quoteData.field === 'action' ? 'action-cell': ''}
              bodyClassName= {quoteData.field === 'action' ? 'action-cell': ''}
              field={quoteData.field}
              header={quoteData.header}
              body={quotesCustomBody}
            ></Column>
          );
        })}
      </DataTable>
    </div>
  );
};

export default Quotes;
