import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import CheckBox from "../../../components/CheckBox/CheckBox";
import { approvalFieldData } from "../../../mock-data/underwriting/approval";
import DateField from "../../../components/DateField/Datefield";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";

const Approval = () => {
  const toast = useRef(null);
  const [approveQuotes, setApproveQuotes] = useState({
    approve: false,
    automate: true,
    convert: false,
    confirm: false,
  });

  const handelCheckboxUpdate = (name, value) => {
    setApproveQuotes({ ...approveQuotes, automate: value });
    console.log(name, value, "Approve value");
  };

  useEffect(() => {
    if (approveQuotes.approve && toast.current) {
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Quotation Approved Successfully !!!",
        life: 3000,
      });
    }
  }, [approveQuotes.approve]);

  const renderFields = (element) => {
    switch (element.field_type) {
      case "dateField":
        return (
          <div>
            <DateField />
          </div>
        );
      case "checkBox":
        return (
          <CheckBox
            boxChecked={approveQuotes.automate}
            name={element.name}
            checkBoxId={element.name}
            labelName={element.label}
            onChange={handelCheckboxUpdate}
          />
        );
      case "dropDown":
        return <Dropdown />;
      default:
        return;
    }
  };

  const handleQuotesApprove = () => {
    // toast.current.show({ severity: 'success', summary: 'Success', detail: 'Quotation Approved Successfully !!!', life: 3000 });
    setApproveQuotes({ ...setApproveQuotes, approve: true });
  };

  return (
    <div className="approval-section">
      <div className="flex align-center pt-5 flex-wrap">
        <div className="w-1/3 p-2 flex items-center">
          <label className="pr-3" style={{ color: "#414141" }}>
            Quotes Number :
          </label>
          <p className="font-medium">Q/10/1001/2024/0545</p>
        </div>
        <div className="w-1/3 p-2 flex items-center">
          <label className="pr-3" style={{ color: "#414141" }}>
            Policy From Date :
          </label>
          <p className="font-medium">10/01/2024</p>
        </div>
        <div className="w-1/3 p-2 flex items-center">
          <label className="pr-3" style={{ color: "#414141" }}>
            Policy To Date :
          </label>
          <p className="font-medium">10/02/2024</p>
        </div>
        <div className="w-1/3 p-2 flex items-center">
          <label className="pr-3" style={{ color: "#414141" }}>
            Outstanding Premium :
          </label>
          <p className="font-medium">2024</p>
        </div>
        <div className="w-1/3 p-2 flex items-center">
          <label className="pr-3" style={{ color: "#414141" }}>
            Claims Ratio :
          </label>
          <p className="font-medium">10</p>
        </div>
      </div>
      <div className="approve-btn flex items-center mt-5">
        <Button text label="Business Rules" />
        <Button label="Approve" onClick={handleQuotesApprove} />
        <Button outlined label="Reject" />
        {approveQuotes.approve && (
          <div className="ml-3">
            <Toast ref={toast} />
            <Button
              label="Convert to Policy"
              onClick={(e) => {
                setApproveQuotes({ ...approveQuotes, convert: true });
              }}
            />
          </div>
        )}
      </div>
      {approveQuotes.convert && (
        <>
          <div className="mt-5">
            <CheckBox
              name={"autoPolicyApprove"}
              labelName="Do you want to approve the policy automatically ?"
              checkBoxId={"autoPolicyApprove"}
              onChange={handelCheckboxUpdate}
            />
            {approveQuotes.automate && (
              <div className="flex items-center flex-wrap">
                {approvalFieldData.map((element) => {
                  return (
                    <div className="w-1/4 p-2">
                      {element.field_type !== "checkBox" && (
                        <label>{element.label}</label>
                      )}
                      {renderFields(element)}
                    </div>
                  );
                })}
              </div>
            )}
            <div className="flex items-center my-5">
              <Link
                style={{
                  fontWeight: "600",
                  color: "#4338CA",
                  textDecoration: "underline",
                }}
                className="mr-3"
                to={"/#"}
                target="black"
              >
                Business Rules
              </Link>
              <Button
                label="Confirm"
                onClick={(e) => {
                  setApproveQuotes({ ...approveQuotes, confirm: true });
                }}
              />
            </div>
            {approveQuotes.confirm && (
              <>
                <div className="flex items-center justify-center">
                  <p>
                    Policy <span>P/10/1001/2024/00056 </span>created with status
                    Approved Successfully !!!
                  </p>
                  <Link
                    style={{
                      fontWeight: "600",
                      color: "#4338CA",
                      textDecoration: "underline",
                    }}
                    className="ml-4"
                    to={"/#"}
                    target="black"
                  >
                    View Ploicy
                  </Link>
                </div>
                <div className="mt-5 flex items-center justify-center">
                  <Button label="Account Query" />
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Approval;
