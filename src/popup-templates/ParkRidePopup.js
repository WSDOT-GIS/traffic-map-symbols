define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var template = {
        "title": "<div class='popup_header_text'>Park & Ride</div>",
        "content": [
            {
                type: "text",
                text: "<div class='popup_content_text'><h1 class=>{Lot_Name}</h1>"
                    + "<p>There are approximately <b>{Approx_Numb_Spaces}</b> spaces available at this site.</p></div>"
            },
            {
                type: "fields",
                fieldInfos: [
                    {
                        fieldName: "Street_Location",
                        label: "Location"
                    },
                    {
                        fieldName: "Address",
                        label: "Address"
                    },
                    {
                        fieldName: "CityName",
                        label: "City"
                    },
                    {
                        fieldName: "ZipCode",
                        label: "ZIP"
                    },
                    {
                        fieldName: "CountyName",
                        label: "County"
                    },
                ]
            },
        ]
    };
    exports.default = template;
});
//# sourceMappingURL=ParkRidePopup.js.map