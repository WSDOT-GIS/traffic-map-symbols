const restrictionsPopup = {
    "title": "<div class='popup_header_text'>Restriction</div>",
    "content": [
        {
            type: "text",
            text: "<div class='popup_content_text'><h1 class=>{CameraTitle}</h1>"

        },
        {
            type: "fields",
            fieldInfos: [
                    {
                        fieldName: "UniqueId",
                        label: "ID",
                        type: "oid"
                    },
                    {
                        fieldName: "state",
                        label: "State",
                        type: "string"
                    },
                    {
                        fieldName: "route_nr",
                        label: "Route Number",
                        type: "string"
                    },
                    {
                        fieldName: "seq_nr",
                        label: "Sequence Number",
                        type: "string"
                    },
                    {
                        fieldName: "direction",
                        label: "Direction",
                        type: "single"
                    },
                    {
                        fieldName: "cardinal_direction",
                        label: "Compass Direction",
                        type: "string"
                    },
                    {
                        fieldName: "restriction_start_mp",
                        label: "Start Milepost",
                        type: "string"
                    },
                    {
                        fieldName: "restriction_end_mp",
                        label: "End Milepost",
                        type: "string"
                    },
                    {
                        fieldName: "restriction_comment",
                        label: "Restriction Comment",
                        type: "string"
                    },
                    {
                        fieldName: "location_name",
                        label: "Location Name",
                        type: "integer"
                    },
                    {
                        fieldName: "location_description",
                        label: "Location Description",
                        type: "integer"
                    },
                    {
                        fieldName: "date_posted",
                        label: "date posted",
                        type: "date"
                    },
                    {
                        fieldName: "date_effective",
                        label: "Date Effective",
                        type:"date"
                    },
                    {
                        fieldName: "date_expires",
                        label: "Date Expires",
                        type: "date"
                    },
                    {
                        fieldName: "restriction_width",
                        label: "Restriction Width",
                        type: "integer"
                    },
                    {
                        fieldName: "restriction_height",
                        label: "Restriction Height",
                        type: "integer"
                    },
                    {
                        fieldName: "restriction_length",
                        label: "Restriction Length",
                        type: "integer"
                    },
                    {
                        fieldName: "restriction_weight",
                        label: "Restriction Weight",
                        type: "integer"
                    },
                    {
                        fieldName: "road_veh_type",
                        label: "Vehicle Type",
                        type: "string"
                    },
                    {
                        fieldName: "commercial_veh_yn",
                        label: "Vehicle Vehicle",
                        type: "string"
                    },
                    {
                        fieldName: "detour_available_yn",
                        label: "Detour Available",
                        type: "string"
                    }, 
                    {
                        fieldName: "permanent_restriction_yn",
                        label: "Permanent Restriction",
                        type: "string"
                    }, 
                    {
                        fieldName: "exceptions_allowed_yn",
                        label: "Exception Allowed",
                        type: "string"
                    }, 
                    {
                        fieldName: "warning_yn",
                        label: "Warning",
                        type: "string"
                    }, 
                    {
                        fieldName: "bridge_nr",
                        label: "Bridge NR",
                        type: "string"
                    }, 
                    {
                        fieldName: "max_gvw",
                        label: "Max Gross Vehicle Weight",
                        type: "integer"
                    },
                    {
                        fieldName: "bridge_type",
                        label: "Bridge Type",
                        type: "string"
                    },
                    {
                        fieldName: "bridge_name",
                        label: "Bridge Name",
                        type: "string"
                    },
                    {
                        fieldName: "bl_max_axle",
                        label: "BL Max Axle",
                        type: "integer"
                    },
                    {
                        fieldName: "cl8_max_axle",
                        label: "C18 Max Axle",
                        type: "integer"
                    },
                    {
                        fieldName: "sa_max_axle",
                        label: "SA Max Axle",
                        type: "integer"
                    },
                    {
                        fieldName: "td_max_axle",
                        label: "TD Max Axle",
                        type: "integer"
                    },
                    {
                        fieldName: "TType",
                        label: "Restriction Type",
                        type: "string"
                    },
                    {
                        fieldName: "PostedRestrictionFlag",
                        label: "Restriction Flag",
                        type: "integer"
                    },
                    {
                        fieldName: "RecordUpdateDate",
                        label: "Update Date",
                        type: "date"
                    },
                    {
                        fieldName: "RelatedRouteType",
                        label: "Related Route Type",
                        type: "string"
                    },
                    {
                        fieldName: "RelatedRouteQualifier",
                        label: "Related Route Qualifier",
                        type: "string"
                    },
                    {
                        fieldName: "AheadBackIndicator",
                        label: "A/B indicator",
                        type: "string"
                    },
                    {
                        fieldName: "ESRI_OID",
                        label: "ESRI OID",
                        type: "integer"
                    },
                ]
        },
    ]
}

export default restrictionsPopup