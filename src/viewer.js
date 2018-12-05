
//import { Matrix4, Vector3, Euler } from "https://cdnjs.cloudflare.com/ajax/libs/three.js/95/three.module.js";
customElements.whenDefined("webgl-viewer").then(async () => {
    const viewer = document.querySelector('webgl-viewer');
    const trimbim = document.querySelector('trimbim-plugin');
    viewer.settings.backgroundColor = 0xffffff;
    await viewer.load('./models/bru2.trb');
    await viewer.load('./models/pongtonger2.trb', { resetCamera: false });
    //await viewer.load('./models/ortho.trb', { resetCamera: false });

    viewer.addEventListener("selection", function (e) {
        console.log(e);

        trimbim.getSelectedEntities().then(items => {
            console.info(items);
            if (items[0].modelId.includes('crack1')) {
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

    document.getElementById("fullscreen").addEventListener('click', function (e) {
        console.info('fullscreen selected!');
        if (document.webkitFullscreenEnabled) {
            document.webkitExitFullscreen();
          }
          if (document.mozFullScreenEnabled) {
            document.mozCancelFullScreen();
          }
          if (document.msFullscreenEnabled) {
            document.msExitFullscreen();
          }
          if (viewer.webkitRequestFullscreen) {
            viewer.webkitRequestFullscreen();
          }
          if (viewer.mozRequestFullScreen) {
            viewer.mozRequestFullScreen();
          }
          if (viewer.msRequestFullscreen) {
            viewer.msRequestFullscreen();
          }
    });

    document.getElementById("flightpath").addEventListener('click', async function (e) {
        console.info('flightpath selected!');
        await viewer.load('./models/flightpath2.trb', { resetCamera: false });
        viewer.setCamera({ modelIds: ['./models/flightpath2.trb'] });
    });

    document.getElementById("startdrone").addEventListener('click', async function (e) {
        const delay = time => new Promise(res=>setTimeout(()=>res(),time));

        console.info('startdrone selected!');
        await viewer.load('./models/crack1.trb', { resetCamera: false });
        viewer.setCamera({ modelIds: ['./models/crack1.trb'] });
        await delay(2000);
        await viewer.load('./models/crack2.trb', { resetCamera: false });
        viewer.setCamera({ modelIds: ['./models/crack2.trb'] });
        await delay(2000);
        await viewer.load('./models/crack3.trb', { resetCamera: false });
        viewer.setCamera({ modelIds: ['./models/crack3.trb'] });
        await delay(2000);
        await viewer.load('./models/crack4.trb', { resetCamera: false });
        viewer.setCamera({ modelIds: ['./models/crack4.trb'] });
        await delay(2000);
        await viewer.load('./models/crack5.trb', { resetCamera: false });
        viewer.setCamera({ modelIds: ['./models/crack5.trb'] });
        await delay(2000);
        await viewer.load('./models/crack6.trb', { resetCamera: false });
        viewer.setCamera({ modelIds: ['./models/crack6.trb'] });
        await delay(2000);
        await viewer.load('./models/crack7.trb', { resetCamera: false });
        viewer.setCamera({ modelIds: ['./models/crack7.trb'] });


    });
});