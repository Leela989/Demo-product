import { useEffect, useRef, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { OverlayPanel } from "primereact/overlaypanel";
import "./lang-desctiption.css";

const LanguageDescription = ({ langData, className, onLangUpdate }) => {
  const [selectLang, setSelectedLang] = useState();
  const overlayOpen = useRef(null);

  useEffect(() => {
    getSelectedLang(langData.default);
  }, []);

  useEffect(() => {
    console.log(selectLang, "selectLang");
  }, [selectLang])
  

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const getLanguageCode = (value = "") => {
    return langData.data
      .map((data) => {
        if (value !== "") {
          if (data.code === langData.default) {
            return data.description;
          } else {
            return null;
          }
        } else {
          if (
            (!selectLang && data.code === langData.default) ||
            (selectLang && data.code === selectLang.code)
          ) {
            return capitalize(data.lang);
          } else {
            return null;
          }
        }
      })
      .filter((description) => description !== null);
  };

  const handleDescriptionChange = (event) => {
    setSelectedLang((prevData) => ({
      ...prevData,
      description: event.target.value,
    }));
  };

  const getSelectedLang = (selectedCode) => {
    langData.data.map((data) => {
      if (data.code === selectedCode) {
        setSelectedLang(data);
      }
      return null;
    });
  };
  
  const handelDropchange = (event) => {
    const selectedCode = event.value;
    onLangUpdate(selectLang);
    getSelectedLang(selectedCode);
  };

  return (
    <>
      {langData ? (
        <div className={`p-inputgroup ${className}`}>
          <label>
            Description
            <span> ({getLanguageCode()})</span>
          </label>
          <div className="flex" onBlur={onLangUpdate(selectLang)}>
            <InputText
              value={selectLang?.description}
              onChange={handleDescriptionChange}
            />
            <i
              className="pi pi-globe p-inputgroup-addon"
              onClick={(e) => overlayOpen.current.toggle(e)}
            />
            <OverlayPanel data-pr-position="right" ref={overlayOpen}>
              <Dropdown
                value={selectLang?.lang}
                onChange={handelDropchange}
                options={langData.data}
                placeholder="Select Language"
                optionValue="code"
                optionLabel="lang"
                // filter
              />
            </OverlayPanel>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default LanguageDescription;
