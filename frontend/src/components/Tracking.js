import React, { useState } from "react";
import { getTrackingData } from "../helpers/requests";

function Tracking() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingData, setTrackingData] = useState(null);
  const [fetchError, setFetchError] = useState(null);

  const handleTrackingData = async () => {
    if (trackingNumber) {
      const resp = await getTrackingData(trackingNumber);
      if (resp.ok) {
        const data = await resp.json();
        setTrackingData(data);
        setFetchError(null);
      } else {
        setFetchError("Tracking number is not valid!");
      }
    }
  };

  return (
    <div className="container">
        <div className="row my-2">
          <div className="col-md-9 col-xl-12">
            <h6 className="text-start text-light">Parcel Tracking</h6>
            <div className="input-group input-group-sm">
              <input
                type="text"
                className="form-control"
                placeholder="Enter tracking number"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
              />
              <button
                className="btn btn-primary"
                type="button"
                onClick={handleTrackingData}
              >
                Search Parcel
              </button>
            </div>
          </div>
        </div>
                
      {(fetchError) ? (
        <p className="text-danger">{fetchError}</p>
      ) : 
      
      (trackingData) ? (
        <div className="container">
            <div className="row my-3">
              <div className="col-12 col-sm-6 text-center text-md-start text-info">
                <p>Tracking Number: {trackingData.label.tracking_number}</p>
              </div>
              <div className="col-12 col-sm-6 text-center text-md-end text-info">
                <p>External Tracking Number: {trackingData.label.external_tracking_number}</p>
              </div>
            </div>

            <ul className="list-group my-4">
              {trackingData.parcel_tracking_items.map((item, index) => (
                <li className="list-group-item" key={index}>
                  <div className="container mx-auto">
                    <div className="row justify-content-center align-items-center">
                      <div className="col-12 col-sm-5 text-center text-md-left py-sm-3 py-lg-1">
                        <span className="fw-bold">
                          {item.timestamp.split("T")[0]}
                        </span>
                        <br />
                      </div>
                      <div className="col-12 col-sm-2 text-center">
                        {item.tracking_code_vendor &&
                        item.tracking_code_vendor.data.description ===
                          "Delivered" ? (
                          <i className="fas fa-check-circle text-success fs-1" />
                        ) : (index === trackingData.parcel_tracking_items.length - 1) ?
                        (<i className="fa-solid fa-truck-fast fs-2 text-primary"/>) :
                          (<>
                            <i className="fa-solid fa-circle text-secondary fs-3"/>
                            <br/>
                            <b>|</b>
                          </>
                        )}
                      </div>
                      <div className="col-12 col-sm-5 text-center text-md-right py-sm-3 py-lg-1">
                        {item.tracking_code_vendor &&
                        item.tracking_code_vendor.tracking_code
                          .tracking_code_locales[0].description ? (
                          <span className="fw-bold">
                            {
                              item.tracking_code_vendor.tracking_code
                                .tracking_code_locales[0].description
                            }
                          </span>
                        ) : item.tracking_code &&
                          item.tracking_code.tracking_code_locales[0]
                            .description ? (
                          <span className="fw-bold">
                            {
                              item.tracking_code.tracking_code_locales[0]
                                .description
                            }
                          </span>
                        ) : null}
                        <br />
                        {item.state ||
                        item.city ||
                        item.location ||
                        item.country.isoCode ? (
                          <span className="fw-light">
                            {item.state && item.state + ", "}
                            {item.city && item.city + ", "}
                            {item.location && item.location + ", "}
                            {item.country.isoCode && item.country.isoCode}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
        </div>
      ) : (
        <div className="row">
          <div className="col-md-9 col-xl-12">
            <h4 className="text-start text-light">
              Search for a parcel with your tracking number
            </h4>
          </div>
        </div>
      )}
    </div>
  );
}

export default Tracking;
