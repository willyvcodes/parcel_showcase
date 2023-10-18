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
        <div className="w-50 mx-auto">
          <h3 className="fs-5 text-light">Parcel Tracking</h3>
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
                
      {(fetchError) ? (
        <p className="text-danger">{fetchError}</p>
      ) : 
      
      (trackingData) ? (
        <div className="container my-4 w-50">
            <div className="row justify-content-center">
              <div className="col-md-6 text-start text-info">
                <p>{trackingData.label.tracking_number}</p>
              </div>
              <div className="col-md-6 text-end text-info">
                <p>{trackingData.label.external_tracking_number}</p>
              </div>
            </div>

          <ul className="list-group">
            {trackingData.parcel_tracking_items.map((item, index) => (
              <li className="list-group-item" key={index}>
                <div className="container">
                  <div className="row justify-content-center">
                    <div className="col-md-5 text-start">
                      <span className="fs-6">
                        <b>{item.timestamp.split("T")[0]}</b>
                      </span>
                      <br />
                    </div>
                    <div className="col-md-2 text-center">
                      {item.tracking_code_vendor &&
                      item.tracking_code_vendor.data.description ===
                        "Delivered" ? (
                        <i className="fas fa-check-circle text-success fs-3" />
                      ) : (
                        <b>|</b>
                      )}
                    </div>
                    <div className="col-md-5 text-end">
                      {item.tracking_code_vendor &&
                      item.tracking_code_vendor.tracking_code
                        .tracking_code_locales[0].description ? (
                        <span>
                          {
                            item.tracking_code_vendor.tracking_code
                              .tracking_code_locales[0].description
                          }
                        </span>
                      ) : item.tracking_code &&
                        item.tracking_code.tracking_code_locales[0]
                          .description ? (
                        <span>
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
        <p className="text-light text-center">
          Search for a parcel with your tracking number
        </p>
      )}
    </div>
  );
}

export default Tracking;
