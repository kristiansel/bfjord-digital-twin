
import { Matrix4, Vector3, Euler } from "https://cdnjs.cloudflare.com/ajax/libs/three.js/95/three.module.js";

let terrainLoaded = false;
let nvdbLoaded = false;

customElements.whenDefined("webgl-viewer").then(async () => {
    const viewer = document.querySelector('webgl-viewer');
    const trimbim = document.querySelector('trimbim-plugin');
    viewer.settings.backgroundColor = 0xffffff;
    await viewer.load('./models/bru2.trb');
    await viewer.load('./models/pongtonger2.trb', { resetCamera: false });
    // await viewer.load('./models/ortho2.trb', { resetCamera: false });
    // terrainLoaded = true;

    viewer.addEventListener("selection", function (e) {
        console.log(e);

        trimbim.getSelectedEntities().then(items => {
            console.info(items);
            if (items[0].modelId.includes('crack1')) {
                console.info('Crack selected!');
            }
            for (const item of items) {
                if (item.entities.length) {
                    trimbim.getEntityInfo(item.modelId, item.entities[0].id).then(info => {
                        console.info(info);
                        if (info.product.name.includes('LYSARMATUR') || info.product.name.includes('LYSMAST')) {
                            console.info('LYSARMATUR detected!');
                            window.open('./models/lysmast.pdf', '_blank');
                        }
                    });
                }
            }
        });
    });

    const fullscreen = document.getElementById("fullscreen");
    if (fullscreen) {
        fullscreen.addEventListener('click', function (e) {
            console.info('fullscreen selected!');
            const wrapperviewer = document.getElementById("viewerwrapper");
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
                wrapperviewer.webkitRequestFullscreen();
            }
            if (viewer.mozRequestFullScreen) {
                wrapperviewer.mozRequestFullScreen();
            }
            if (viewer.msRequestFullscreen) {
                wrapperviewer.msRequestFullscreen();
            }
        });
    }

    const flightpath = document.getElementById("flightpath");
    if (flightpath) {
        flightpath.addEventListener('click', async function (e) {
            console.info('flightpath selected!');
            await viewer.load('./models/flightpath2.trb', { resetCamera: false });
            viewer.setCamera({ modelIds: ['./models/flightpath2.trb'] });
        });
    }

    const startdrone = document.getElementById("startdrone");
    const droneVideo = document.getElementById("drone_video");
    if (startdrone) {
        startdrone.addEventListener('click', async function (e) {
            const delay = time => new Promise(res => setTimeout(() => res(), time));
            droneVideo.play();
            await delay(19160);

            console.info('startdrone selected!');
            // await viewer.load('./models/crack1.trb', { resetCamera: false });
            // viewer.setCamera({ modelIds: ['./models/crack1.trb'] });
            // await delay(2000);
            await viewer.load('./models/crack2.trb', { resetCamera: false });
            viewer.setCamera({ modelIds: ['./models/crack2.trb'] });
            createCrack(1);
            await delay(2000);

            await viewer.load('./models/crack3.trb', { resetCamera: false });
            viewer.setCamera({ modelIds: ['./models/crack3.trb'] });
            createCrack(2);
            await delay(2000);

            await viewer.load('./models/crack4.trb', { resetCamera: false });
            viewer.setCamera({ modelIds: ['./models/crack4.trb'] });
            createCrack(3);
            await delay(2000);

            await viewer.load('./models/crack5.trb', { resetCamera: false });
            viewer.setCamera({ modelIds: ['./models/crack5.trb'] });
            createCrack(4);
            await delay(2000);

            await viewer.load('./models/crack6.trb', { resetCamera: false });
            viewer.setCamera({ modelIds: ['./models/crack6.trb'] });
            createCrack(5);
            // await delay(1000);
            // await viewer.load('./models/crack7.trb', { resetCamera: false });
            // viewer.setCamera({ modelIds: ['./models/crack7.trb'] });
        });
    }

    const ortho = document.getElementById("ortho");
    if (ortho) {
        ortho.addEventListener('click', async function (e) {
            console.info('ortho selected');
            if (!terrainLoaded) {
                await viewer.load('./models/ortho2.trb', { resetCamera: false });
                terrainLoaded = true;
            } else {
                await viewer.unload('./models/ortho2.trb', { resetCamera: false });
                terrainLoaded = false;
            }
        });
    }

    const nvdb = document.getElementById("nvdb");
    if (nvdb) {
        nvdb.addEventListener('click', async function (e) {
            console.info('nvdb selected');

            const mat = new Matrix4();
            mat.setPosition(new Vector3(-298000.0, -6666000.0, 8.0));


            if (!nvdbLoaded) {
                await viewer.load('./models/nvdb.trb', { transform: mat, resetCamera: false });
                // viewer.setCamera({ modelIds: ['./models/nvdb.trb'] });
                nvdbLoaded = true;
            } else {
                await viewer.unload('./models/nvdb.trb', { resetCamera: false });
                nvdbLoaded = false;
            }
        });
    }
});

let focusImg = null;

function createCrack(n) {
    const container = document.getElementById("cracks-container");
    const nStr = n.toString();

    // <img class="crack-img" src="assets/crack2.jpg">
    const img = document.createElement('img');
    img.classList.add('crack-img');
    img.src = "assets/crack" + nStr + ".jpg";
    img.id = "crack-img-" + nStr;
    img.onclick = () => {
        if (focusImg) {
            focusImg.classList.remove('crack-img-selected');
        }
        img.classList.add('crack-img-selected');
        focusImg = img;
        updateCrackInfo(n);
    };

    container.appendChild(img);
}

function updateCrackInfo(n) {
    const info = document.getElementById("crack-info");
    // clear it
    info.innerHTML = '';

    const i = n-1;
    const crackInfo = crackInfos[i];

    const crackNo = document.createElement('div');
    crackNo.innerText = "Crack number: "+n.toString();
    crackNo.style = "padding: 0px 0px 10px 0px;";
    info.appendChild(crackNo);

    Object.keys(crackInfo).forEach( key => {
        const el = document.createElement('div');
        el.innerText = key + ": "+crackInfo[key];
        info.appendChild(el);
    })

    console.log("updated crack info with: ", crackInfo);
}

const crackInfos = [
    {
        Rissbredde: "0.7 mm",
        Skadetype: "Belastning",
        Beskrivelse: "Sprekk i utvikling, anbefales utbedret."
    },
    {
        Rissbredde: "0.4 mm",
        Skadetype: "Kalkavsetning", 
        Beskrivelse: "Stabil, overvåk utvikling."
    },
    {
        Rissbredde: "0.8 mm",
        Skadetype: "Deformasjon",
        Beskrivelse: "Sprekk i utvikling, anbefales utbedret."
    },
    {
        Rissbredde: "0.8 mm",
        Skadetype: "Belastning",
        Beskrivelse: "Sprekk i utvikling, anbefales utbedret."
    },
    {
        Rissbredde: "0.1 mm",
        Skadetype: "Overflate",
        Beskrivelse: "Stabil, ingen tiltak nødvendig."
    }
]