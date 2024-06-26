import { Dialog } from "primereact/dialog";
import { useEffect, useRef, useState } from "react";
import DateField from "../../components/DateField/Datefield";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { Card } from "primereact/card";
import data from "./notes.json";
import { InputTextarea } from "primereact/inputtextarea";
import "./notes.css";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useParams } from "react-router-dom";

export default function Notes({ visible, setVisible }) {
  const [formData, setFormData] = useState({});
  const toast = useRef(null);

  const [key, setKey] = useState(0);

  const handleChange = (name, value) => {
    if (name == "set_reminder") {
      setIsReminder(true);
    }

    setFormData({ ...formData, [name]: value });
  };

  const [notes, setNotes] = useState([]);

  const [isView, setIsView] = useState(false);

  const [isReminder, setIsReminder] = useState(false);

  useEffect(() => {
    setNotes(data);
  }, [data]);

  const addNote = () => {
    if (validateForm()) {
      showSuccess();
      setNotes([...notes, formData]);
      setFormData({});
      setKey(key + 1);
    } else {
      showMandatoryFill();
    }
  };

  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Saved Successfully",
      life: 3000,
    });
  };

  const validateForm = () => {
    const { reference_id } = formData;
    return reference_id;
  };

  const showMandatoryFill = () => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: "Please fill all the required details",
      life: 3000,
    });
  };

  const viewNote = (data) => {
    console.log("data ", data);
    setFormData(data);
    setIsView(true);
  };

  const clearNote = () => {
    setFormData({});
    setKey(key + 1);
    setIsView(false);
  };

  return (
    <div>
      <Dialog
        className="card-container"
        header="Notes"
        visible={visible}
        style={{ width: "80vw" }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
      >
        <Toast ref={toast} />
        <div className="flex w-5/5">
          <div className="w-3/5" key={key}>
            <Card className="child-card">
              <div>
                <div className="flex">
                  <div className="w-1/5">
                    Reference #
                    <span className="text-red-600 text-xl ml-2">*</span>
                  </div>
                  <div className="w-4/5">
                    <InputText
                      name="reference_id"
                      className="w-3/5"
                      value={formData.reference_id || ""}
                      onChange={(e) =>
                        handleChange("reference_id", e.target.value)
                      }
                      disabled={isView}
                    />
                  </div>
                </div>

                <div className="flex mt-5">
                  <div className="w-1/5">Notes</div>
                  <div className="w-4/5">
                    <InputTextarea
                      name="notes"
                      className="input-area sourceTextArea"
                      value={formData.notes || ""}
                      onChange={(e) => handleChange("notes", e.target.value)}
                      rows={10}
                      cols={10}
                      autoResize
                      disabled={isView}
                    />
                  </div>
                </div>

                <div className="flex mt-5">
                  <div className="w-1/5">Set Reminder</div>
                  <div className="w-4/5">
                    <Checkbox
                      className="w-3/5"
                      name="set_reminder"
                      checked={formData.set_reminder}
                      onChange={(e) => handleChange("set_reminder", e.checked)}
                      disabled={isView}
                    />
                  </div>
                </div>

                <div className="flex mt-5">
                  <div className="w-1/5">Follow Up Date</div>
                  <div className="w-4/5">
                    <DateField
                      className="w-5/5"
                      name="follow_up_date"
                      labelType="left"
                      showIcon={true}
                      value={
                        formData.follow_up_date
                          ? new Date(formData.follow_up_date)
                          : null
                      }
                      onChange={(e) => handleChange("follow_up_date", e.value)}
                      disabled={isView || !isReminder}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-5">
                {!isView ? (
                  <Button
                    rounded={false}
                    label="Save"
                    aria-controls="popup_menu_left"
                    onClick={() => addNote()}
                    aria-haspopup
                  />
                ) : (
                  <Button
                    rounded={false}
                    label="Clear"
                    aria-controls="popup_menu_left"
                    onClick={() => clearNote()}
                    aria-haspopup
                  />
                )}
              </div>
            </Card>
          </div>
          <div className="2/5 ml-7">
            <Card className="child-card list-container">
              {notes.map((data) => {
                return (
                  <div className="mb-3">
                    <Card>
                      <div className="flex">
                        <div className="w-24">Reference #</div>
                        <div className="w-64 ml-10">
                          <InputText
                            name="reference_id"
                            className="w-5/5"
                            value={data.reference_id || ""}
                            onChange={(e) =>
                              handleChange("reference_id", e.target.value)
                            }
                            disabled
                          />
                        </div>
                      </div>

                      <div className="flex mt-2">
                        <div className="w-14">Notes</div>
                        <div className="w-64 ml-20">
                          <InputText
                            name="reference_id"
                            className="w-3/5"
                            value={data.notes || ""}
                            onChange={(e) =>
                              handleChange("reference_id", e.target.value)
                            }
                            disabled
                          />
                        </div>
                      </div>

                      <div className="flex justify-end mt-5">
                        <Button
                          rounded={false}
                          label="View"
                          aria-controls="popup_menu_left"
                          onClick={() => viewNote(data)}
                          aria-haspopup
                        />
                      </div>
                    </Card>
                  </div>
                );
              })}
            </Card>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
