
//import { Matrix4, Vector3, Euler } from "https://cdnjs.cloudflare.com/ajax/libs/three.js/95/three.module.js";
customElements.whenDefined("webgl-viewer").then(async () => {
    const viewer = document.querySelector('webgl-viewer');
    const trimbim = document.querySelector('trimbim-plugin');
    viewer.settings.backgroundColor = 0xffffff;
    await viewer.load('./models/Bru.trb');
    await viewer.load('./models/Pongtonger.trb', { resetCamera: false });
    //await viewer.load('./models/ortho.trb', { resetCamera: false });

    await viewer.load('./models/flightpath2.trb', { resetCamera: false });
    await viewer.load('./models/crack1.trb', { resetCamera: true });

    viewer.addEventListener("selection", function (e) {
        console.log(e);

        trimbim.getSelectedEntities().then(items => {
            console.info(items);
            if(items[0].modelId.includes('crack1')){
                console.info('Crack selected!');
            }
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