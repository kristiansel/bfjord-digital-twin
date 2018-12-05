
//import { Matrix4, Vector3, Euler } from "https://cdnjs.cloudflare.com/ajax/libs/three.js/95/three.module.js";
customElements.whenDefined("webgl-viewer").then(() => {
    const viewer = document.querySelector('webgl-viewer');
    const trimbim = document.querySelector('trimbim-plugin');

    viewer.load('./models/flightpath2.trb');
    viewer.load('./models/Pongtonger.trb');
    //viewer.load('./models/terrain.trb');
    viewer.load('./models/crack1.trb');
    viewer.addEventListener("selection", function (e) {
        console.log(e);

        trimbim.getSelectedEntities().then(items => {
            console.info(items);
        });

        // for (const model of Object.keys(e.detail)) {
        //     //console.log(model);
        //     for (const entity of e.detail[model]) {
        //         //console.log(entity);
        //         trimbim.getEntityInfo(model, entity).then(info => {
        //             console.info(info.properties[0].properties);
        //         });
        //     }
        // }
    });
});