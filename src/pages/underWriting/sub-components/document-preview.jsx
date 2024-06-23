const DocumentPreview = () => {
  return (
    <>
      <div className="mt-5 pt-3">
        <div className="flex align-center flex-wrap">
          <div className="w-1/3 p-2 flex items-center">
            <label className="pr-3" style={{ color: "#414141" }}>
              Quotes Number :
            </label>
            <p className="font-medium">Q/10/1001/2024/0545</p>
          </div>
          <div className="w-1/3 p-2 flex items-center">
            <label className="pr-3" style={{ color: "#414141" }}>
              Ploicy Number :
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
        </div>
      </div>
    </>
  );
};

export default DocumentPreview;
