const template = {
    "title": "<div class='popup_header_text'>{CameraTitle}</div>",
    "content": [
        {
            type: "media",
            mediaInfos: [{
                type: "image",
                value: {
                    sourceURL: "{ImageURL}"
                },
                altText: "Image not available"
            }]
        },
        // {
        //     type: "text",
        //     text: "<div class='popup_content_text'><h1 class=>{CameraTitle}</h1>"

        // },
        {
            type: "fields",
            fieldInfos: [
                {
                    fieldName: "CameraID",
                    label: "ID"
                },
                {
                    fieldName: "WSDOTSRID",
                    label: "SR"
                },
                {
                    fieldName: "StateRouteMilepost",
                    label: "Milepost"
                },
                {
                    fieldName: "CompassDirection",
                    label: "Compass Direction"
                },
                {
                    fieldName: "Location",
                    label: "Location"
                },
                {
                    fieldName: "CameraOwnerName",
                    label: "Owner"
                },
                
            ]
        },
    ]
}

export default template